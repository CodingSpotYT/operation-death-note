// Background service worker for Mind Note extension
chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage with default settings
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
        completedDilemmas: [],
        cognitiveProfile: {
            deductiveReasoning: 50,
            strategicThinking: 50,
            moralFlexibility: 50,
            patternRecognition: 50,
            informationRetention: 50,
            deceptionDetection: 50
        },
        knowledgeBase: []
    });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'recordDecision') {
        recordDecision(request.data);
        updateCognitiveProfile(request.data);
    } else if (request.action === 'analyzePattern') {
        analyzeBehavioralPattern(request.data).then(sendResponse);
        return true; // async
    }
});

function recordDecision(decisionData) {
    chrome.storage.local.get(['decisionRecords'], (result) => {
        const records = result.decisionRecords || [];
        records.push(decisionData);

        // Keep only last 1000 records to prevent storage bloat
        if (records.length > 1000) {
            records.shift();
        }

        chrome.storage.local.set({ decisionRecords: records });
    });
}

// Update stats based on decision patterns
function updateStats(decisionTime, choice) {
    chrome.storage.local.get(['combatStats'], (result) => {
        const stats = result.combatStats || {};

        // Update reaction speed based on decision time
        const speedScore = Math.max(0, 100 - (decisionTime / 100));
        stats.reactionSpeed = (stats.reactionSpeed + speedScore) / 2;

        chrome.storage.local.set({ combatStats: stats });
    });
}

// --- Cognitive Profile Enhancements ---
function updateCognitiveProfile(decisionData) {
    chrome.storage.local.get(['cognitiveProfile'], (result) => {
        const profile = result.cognitiveProfile || {};
        // Update deductive reasoning based on decision complexity
        if (decisionData.complexity > 3) {
            profile.deductiveReasoning = Math.min(100, (profile.deductiveReasoning || 50) + 2);
        }
        // Update strategic thinking for long-term decisions
        if (decisionData.longTermImpact) {
            profile.strategicThinking = Math.min(100, (profile.strategicThinking || 50) + 3);
        }
        chrome.storage.local.set({ cognitiveProfile: profile });
        if (decisionData.ruthlessChoice) {
            profile.moralFlexibility = Math.min(100, profile.moralFlexibility + 5);
        }
    });
}

async function analyzeBehavioralPattern(data) {
    // Placeholder for pattern detection logic
    const patterns = await detectBehavioralPatterns(data);
    chrome.storage.local.get(['knowledgeBase'], (result) => {
        const kb = result.knowledgeBase || [];
        kb.push(...patterns);
        chrome.storage.local.set({ knowledgeBase: kb });
    });
    return { success: true, patternsFound: patterns.length };
}

async function detectBehavioralPatterns(data) {
    // Dummy pattern detection for now
    return [{ pattern: "example", data }];
}