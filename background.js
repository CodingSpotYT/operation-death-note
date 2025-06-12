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
        completedDilemmas: []
    });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'recordDecision') {
        recordDecision(request.data);
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