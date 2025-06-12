// Content script for tracking user interactions
class DecisionTracker {
    constructor() {
        this.hoverStartTime = null;
        this.trackingEnabled = true;
        this.init();
    }

    init() {
        // Check if tracking is enabled
        chrome.storage.local.get(['trackingEnabled'], (result) => {
            this.trackingEnabled = result.trackingEnabled !== false;
            if (this.trackingEnabled) {
                this.attachListeners();
            }
        });
    }

    attachListeners() {
        // Track all clickable elements (links, buttons)
        const clickableSelector = 'a, button, [role="button"], [onclick], input[type="submit"], input[type="button"]';

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(clickableSelector)) {
                this.handleHover(e);
            }
        }, true);

        document.addEventListener('click', (e) => {
            if (e.target.matches(clickableSelector)) {
                this.handleClick(e);
            }
        }, true);

        // Reset hover time when mouse leaves
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(clickableSelector)) {
                this.hoverStartTime = null;
            }
        }, true);
    }

    handleHover(event) {
        this.hoverStartTime = Date.now();
    }

    handleClick(event) {
        if (!this.hoverStartTime) return;

        const decisionTime = Date.now() - this.hoverStartTime;
        const element = event.target;

        // Extract link information
        const linkText = this.extractText(element);
        const url = this.extractUrl(element);
        const domain = window.location.hostname;

        const decisionRecord = {
            url: url,
            linkText: linkText,
            decisionTime: decisionTime,
            timestamp: new Date().toISOString(),
            domain: domain,
            pageUrl: window.location.href
        };

        // Send to background script for storage
        chrome.runtime.sendMessage({
            action: 'recordDecision',
            data: decisionRecord
        });

        this.hoverStartTime = null;
    }

    extractText(element) {
        // Get visible text content, limited to 100 characters
        let text = element.textContent || element.innerText || element.alt || element.title || '';
        return text.trim().substring(0, 100);
    }

    extractUrl(element) {
        // Extract URL from various element types
        if (element.href) return element.href;
        if (element.action) return element.action;
        if (element.onclick) return 'javascript:onclick';
        return window.location.href;
    }
}

// Initialize tracker when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DecisionTracker();
    });
} else {
    new DecisionTracker();
}