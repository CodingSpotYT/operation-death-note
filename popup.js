// Main popup script for Mind Note extension
class MindNoteApp {
    constructor() {
        this.currentScenario = null;
        this.startTime = null;
        this.advancedTabInitialized = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.showTab('decisions'); // Default tab
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.showTab(tabName);
            });
        });

        // Combat controls
        document.getElementById('newChallengeBtn').addEventListener('click', () => {
            this.startNewChallenge();
        });

        document.getElementById('resetCombatBtn').addEventListener('click', () => {
            this.resetCombatProgress();
        });

        // Settings
        document.getElementById('trackingToggle').addEventListener('change', (e) => {
            this.toggleTracking(e.target.checked);
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportDecisionLog();
        });

        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.clearAllData();
        });
    }

    showTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Load tab-specific data
        switch (tabName) {
            case 'decisions':
                this.loadDecisionLog();
                break;
            case 'combat':
                this.loadCombatData();
                break;
            case 'stats':
                this.loadStatsData();
                break;
            case 'settings':
                this.loadSettings();
                break;
            case 'advanced':
                this.loadAdvancedTraining();
                break;
        }
    }

    loadInitialData() {
        chrome.storage.local.get(['trackingEnabled', 'combatStats'], (result) => {
            if (result.trackingEnabled !== undefined) {
                document.getElementById('trackingToggle').checked = result.trackingEnabled;
            }
        });
    }

    // Decision Journal Functions
    loadDecisionLog() {
        chrome.storage.local.get(['decisionRecords'], (result) => {
            const records = result.decisionRecords || [];
            this.displayDecisionRecords(records);
        });
    }

    displayDecisionRecords(records) {
        const container = document.getElementById('decisionList');
        const countElement = document.querySelector('.record-count');

        countElement.textContent = `${records.length} decisions tracked`;

        if (records.length === 0) {
            container.innerHTML = '<div class="no-data">Start browsing to track your decisions...</div>';
            return;
        }

        // Sort by timestamp (newest first)
        const sorted = records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        container.innerHTML = sorted.slice(0, 50).map(record => {
            const date = new Date(record.timestamp);
            const timeStr = date.toLocaleTimeString();
            const dateStr = date.toLocaleDateString();

            return `
        <div class="decision-item">
          <div class="decision-header">
            <span class="decision-time">${record.decisionTime}ms</span>
            <span class="decision-timestamp">${timeStr} - ${dateStr}</span>
          </div>
          <div class="decision-details">
            <div class="decision-link">${this.truncateText(record.linkText, 60)}</div>
            <div class="decision-domain">${record.domain}</div>
          </div>
        </div>
      `;
        }).join('');
    }

    // Combat System Functions
    loadCombatData() {
        chrome.storage.local.get(['combatStats', 'completedDilemmas'], (result) => {
            const stats = result.combatStats || {};
            const completed = result.completedDilemmas || [];

            document.getElementById('totalDilemmas').textContent = stats.totalDilemmas || 0;
            const successRate = stats.totalDilemmas > 0 ?
                Math.round((stats.correctChoices / stats.totalDilemmas) * 100) : 0;
            document.getElementById('successRate').textContent = `${successRate}%`;
        });
    }

    startNewChallenge() {
	    chrome.storage.local.get(['completedDilemmas'], (result) => {
	        const completed = result.completedDilemmas || [];
	        const scenario = ScenarioManager.getRandomScenario(completed);
	
	        if (!scenario) {
	            this.displayScenario({
	                scenario: "Congratulations! You've completed all available scenarios. More challenges coming soon...",
	                choices: [],
	                character: 'System'
	            });
	            return;
	        }
	
	        this.currentScenario = scenario;
	        this.displayScenario(scenario);
	        
	        // Show the ready button and hide choices initially
	        document.getElementById('readyBtn').style.display = 'block';
	        document.getElementById('scenarioChoices').style.display = 'none';
	        document.getElementById('readyBtn').onclick = () => {
	            this.startCountdown();
	        };
	    });
	}
	
	startCountdown() {
	    const countdownElement = document.getElementById('countdown');
	    const readyBtn = document.getElementById('readyBtn');
	    const choicesContainer = document.getElementById('scenarioChoices');
	    
	    readyBtn.style.display = 'none';
	    countdownElement.style.display = 'block';
	    
	    let count = 3;
	    countdownElement.textContent = count;
	    
	    const countdownInterval = setInterval(() => {
	        count--;
	        countdownElement.textContent = count;
	        
	        if (count <= 0) {
	            clearInterval(countdownInterval);
	            countdownElement.style.display = 'none';
	            choicesContainer.style.display = 'block';
	            this.startTime = Date.now(); // Start timing only when choices are shown
	        }
	    }, 1000);
	}
	
	displayScenario(scenario) {
	    const scenarioText = document.getElementById('scenarioText');
	    const choicesContainer = document.getElementById('scenarioChoices');
	    const resultContainer = document.getElementById('scenarioResult');
	    const readyBtn = document.getElementById('readyBtn');
	
	    scenarioText.innerHTML = `
	      <strong>${scenario.character}:</strong><br>
	      ${scenario.scenario}
	    `;
	
	    if (scenario.choices.length === 0) {
	        choicesContainer.innerHTML = '';
	        resultContainer.classList.remove('show');
	        readyBtn.style.display = 'none';
	        return;
	    }
	
	    choicesContainer.innerHTML = scenario.choices.map(choice =>
	        `<button class="choice-btn" data-choice="${choice.id}">${choice.text}</button>`
	    ).join('');
	
	    // Add choice event listeners
	    choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
	        btn.addEventListener('click', (e) => {
	            this.handleChoice(e.target.dataset.choice);
	        });
	    });
	
	    resultContainer.classList.remove('show');
	    choicesContainer.style.display = 'none'; // Hide choices initially
	}

    handleChoice(choiceId) {
        if (!this.currentScenario) return;

        const responseTime = Date.now() - this.startTime;
        const choice = this.currentScenario.choices.find(c => c.id === choiceId);
        const response = this.currentScenario.responses[choiceId];

        // Highlight selected choice
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.choice === choiceId) {
                btn.classList.add('selected');
            }
        });

        // Show response
        const resultContainer = document.getElementById('scenarioResult');
        resultContainer.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>Your choice:</strong> ${choice.text}<br>
        <strong>Response time:</strong> ${responseTime}ms
      </div>
      <div><strong>${this.currentScenario.character}:</strong><br>${response.counter}</div>
    `;
        resultContainer.classList.add('show');

        // Update stats
        this.updateCombatStats(response.stats, responseTime);

        // Mark scenario as completed
        this.markScenarioCompleted(this.currentScenario.id);
    }

    updateCombatStats(statChanges, responseTime) {
        chrome.storage.local.get(['combatStats'], (result) => {
            const stats = result.combatStats || {
                totalDilemmas: 0,
                correctChoices: 0,
                averageResponseTime: 0,
                riskTolerance: 50,
                logicalDepth: 50,
                consistency: 50,
                reactionSpeed: 50
            };

            // Update stats based on scenario response
            Object.keys(statChanges).forEach(stat => {
                if (stats[stat] !== undefined) {
                    stats[stat] = Math.max(0, Math.min(100, stats[stat] + statChanges[stat]));
                }
            });

            // Update reaction speed based on response time
            const speedScore = Math.max(0, 100 - (responseTime / 100));
            stats.reactionSpeed = Math.round((stats.reactionSpeed + speedScore) / 2);

            // Update general stats
            stats.totalDilemmas++;
            stats.averageResponseTime = Math.round(
                (stats.averageResponseTime * (stats.totalDilemmas - 1) + responseTime) / stats.totalDilemmas
            );

            // Determine if choice was "correct" based on stat improvements
            const totalImprovement = Object.values(statChanges).reduce((sum, val) => sum + Math.max(0, val), 0);
            if (totalImprovement > 0) {
                stats.correctChoices++;
            }

            chrome.storage.local.set({ combatStats: stats });
        });
    }

    markScenarioCompleted(scenarioId) {
        chrome.storage.local.get(['completedDilemmas'], (result) => {
            const completed = result.completedDilemmas || [];
            if (!completed.includes(scenarioId)) {
                completed.push(scenarioId);
                chrome.storage.local.set({ completedDilemmas: completed });
            }
        });
    }

    resetCombatProgress() {
        if (confirm('Are you sure you want to reset all combat progress? This cannot be undone.')) {
            chrome.storage.local.set({
                combatStats: {
                    totalDilemmas: 0,
                    correctChoices: 0,
                    averageResponseTime: 0,
                    riskTolerance: 50,
                    logicalDepth: 50,
                    consistency: 50,
                    reactionSpeed: 50
                },
                completedDilemmas: []
            });
            this.loadCombatData();
        }
    }

    // Stats Functions
    loadStatsData() {
        chrome.storage.local.get(['combatStats', 'decisionRecords', 'cognitiveProfile'], (result) => {
            const stats = result.combatStats || {};
            const records = result.decisionRecords || [];
            const profile = result.cognitiveProfile || {};

            this.updateStatBars(stats);
            this.updateInsights(records);

            // Update cognitive profile displays if advanced tab is present
            if (document.getElementById('deductiveBar') && profile.deductiveReasoning) {
                document.getElementById('deductiveBar').style.width = `${profile.deductiveReasoning}%`;
                document.getElementById('deductiveValue').textContent = profile.deductiveReasoning;
            }
        });
    }

    updateStatBars(stats) {
        const statNames = ['reactionSpeed', 'consistency', 'riskTolerance', 'logicalDepth'];

        statNames.forEach(statName => {
            const value = stats[statName] || 50;
            const bar = document.getElementById(`${statName}Bar`);
            const valueDisplay = document.getElementById(`${statName}Value`);

            if (bar && valueDisplay) {
                bar.style.width = `${value}%`;
                valueDisplay.textContent = value;
            }
        });
    }

    updateInsights(records) {
        // Calculate average decision time
        const avgTime = records.length > 0 ?
            Math.round(records.reduce((sum, r) => sum + r.decisionTime, 0) / records.length) : 0;
        document.getElementById('avgDecisionTime').textContent = avgTime;

        // Find most active domain
        const domainCounts = {};
        records.forEach(r => {
            domainCounts[r.domain] = (domainCounts[r.domain] || 0) + 1;
        });
        const topDomain = Object.keys(domainCounts).reduce((a, b) =>
            domainCounts[a] > domainCounts[b] ? a : b, '--');
        document.getElementById('topDomain').textContent = topDomain;

        // Count today's decisions
        const today = new Date().toDateString();
        const todayCount = records.filter(r =>
            new Date(r.timestamp).toDateString() === today
        ).length;
        document.getElementById('todayCount').textContent = todayCount;
    }

    // Settings Functions
    loadSettings() {
        chrome.storage.local.get(['trackingEnabled'], (result) => {
            document.getElementById('trackingToggle').checked = result.trackingEnabled !== false;
        });
    }

    toggleTracking(enabled) {
        chrome.storage.local.set({ trackingEnabled: enabled });
    }

    exportDecisionLog() {
        chrome.storage.local.get(['decisionRecords'], (result) => {
            const records = result.decisionRecords || [];
            const csv = this.convertToCSV(records);
            this.downloadCSV(csv, 'mind-note-decisions.csv');
        });
    }

    convertToCSV(records) {
        if (records.length === 0) return 'No data to export';

        const headers = ['Timestamp', 'Domain', 'Link Text', 'Decision Time (ms)', 'Page URL'];
        const rows = records.map(r => [
            r.timestamp,
            r.domain,
            `"${r.linkText.replace(/"/g, '""')}"`,
            r.decisionTime,
            r.pageUrl || r.url
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear ALL data? This includes decision records, combat progress, and settings. This cannot be undone.')) {
            chrome.storage.local.clear(() => {
                // Reinitialize with defaults
                chrome.storage.local.set({
                    trackingEnabled: true,
                    decisionRecords: [],
                    combatStats: {
                        totalDilemmas: 0,
                        correctChoices: 0,
                        averageResponseTime: 0,
                        riskTolerance: 50,
                        logicalDepth: 50,
                        consistency: 50,
                        reactionSpeed: 50
                    },
                    completedDilemmas: []
                });

                // Refresh current tab
                this.loadInitialData();
                this.showTab('decisions');
                alert('All data cleared successfully.');
            });
        }
    }

    // --- Advanced Cognitive Training ---
    loadAdvancedTraining() {
        if (this.advancedTabInitialized) return;
        this.advancedTabInitialized = true;
        chrome.storage.local.get(['cognitiveProfile'], (result) => {
            const profile = result.cognitiveProfile || {};
            // Show advanced training tab if unlocked
            if (profile.deductiveReasoning >= 70) {
                this.unlockAdvancedFeatures();
            } else {
                // Show locked message
                const container = document.querySelector('.container');
                if (!document.getElementById('advanced')) {
                    container.innerHTML += `
                        <div class="tab-content" id="advanced">
                            <div class="section-header">
                                <h2>Advanced Cognitive Training</h2>
                            </div>
                            <div style="padding:20px;color:#888;">Unlock by raising Deductive Reasoning to 70.</div>
                        </div>
                    `;
                }
            }
        });
    }

    unlockAdvancedFeatures() {
        // Add tab button if not present
        const tabs = document.querySelector('.tabs');
        if (!tabs.querySelector('[data-tab="advanced"]')) {
            tabs.innerHTML += '<button class="tab" data-tab="advanced">🔍 Advanced</button>';
            // Add event listener for new tab
            tabs.querySelector('[data-tab="advanced"]').addEventListener('click', (e) => {
                this.showTab('advanced');
            });
        }
        // Add advanced content section if not present
        const container = document.querySelector('.container');
        if (!document.getElementById('advanced')) {
            container.innerHTML += `
                <div class="tab-content" id="advanced">
                    <div class="section-header">
                        <h2>Advanced Cognitive Training</h2>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-label">Deductive Reasoning</div>
                            <div class="stat-bar">
                                <div class="stat-fill" id="deductiveBar"></div>
                            </div>
                            <div class="stat-value" id="deductiveValue">50</div>
                        </div>
                        <!-- Add other cognitive stats if desired -->
                    </div>
                    <button class="btn primary" id="startDeduction">Start Deduction Training</button>
                    <div id="deductionExercise"></div>
                </div>
            `;
        }
        // Add event listener for deduction exercise
        setTimeout(() => {
            const btn = document.getElementById('startDeduction');
            if (btn) {
                btn.addEventListener('click', () => {
                    this.startDeductionExercise();
                });
            }
        }, 100);
        // Update cognitive stat bar
        chrome.storage.local.get(['cognitiveProfile'], (result) => {
            const profile = result.cognitiveProfile || {};
            if (profile.deductiveReasoning) {
                const bar = document.getElementById('deductiveBar');
                const val = document.getElementById('deductiveValue');
                if (bar) bar.style.width = `${profile.deductiveReasoning}%`;
                if (val) val.textContent = profile.deductiveReasoning;
            }
        });
    }

    startDeductionExercise() {
        const exercise = `
            <div class="deduction-scenario">
                <h3>Crime Scene Analysis</h3>
                <p>Given these clues, determine the killer:</p>
                <ul>
                    <li>Victim was poisoned</li>
                    <li>Only three people had access</li>
                    <li>Person A benefits financially</li>
                    <li>Person B had chemistry knowledge</li>
                    <li>Person C found the body</li>
                </ul>
                <div class="deduction-choices">
                    <button class="choice-btn" data-choice="a">Person A (Motive)</button>
                    <button class="choice-btn" data-choice="b">Person B (Means)</button>
                    <button class="choice-btn" data-choice="c">Person C (Opportunity)</button>
                    <button class="choice-btn" data-choice="d">Insufficient data</button>
                </div>
            </div>
        `;
        document.getElementById('deductionExercise').innerHTML = exercise;
        // Add event listeners for choices
        document.querySelectorAll('.deduction-choices .choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Simple feedback for now
                const choice = e.target.dataset.choice;
                let feedback = '';
                if (choice === 'b') {
                    feedback = '<span style="color:#0f0;">Correct! Person B had the means and access.</span>';
                } else {
                    feedback = '<span style="color:#f00;">Not quite. Consider who had the means.</span>';
                }
                document.getElementById('deductionExercise').innerHTML += `<div style="margin-top:10px;">${feedback}</div>`;
            });
        });
    }

    // Utility Functions
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MindNoteApp();
    // Try to add advanced tab if unlocked
    chrome.storage.local.get(['cognitiveProfile'], (result) => {
        const profile = result.cognitiveProfile || {};
        if (profile.deductiveReasoning >= 70) {
            app.unlockAdvancedFeatures();
        }
    });
});