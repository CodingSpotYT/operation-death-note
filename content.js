// Content script for tracking user interactions
class DecisionTracker {
    constructor() {
        this.hoverStartTime = null;
        this.trackingEnabled = true;
        this.decisionComplexity = 1;
        this.lastClickTime = null;
        this.lastClickElement = null;
        this.lastBodyHTML = document.body.innerHTML;
        this.lastLocation = window.location.href;
        this.init();
    }

    init() {
        chrome.storage.local.get(['trackingEnabled'], (result) => {
            this.trackingEnabled = result.trackingEnabled !== false;
            if (this.trackingEnabled) {
                this.attachListeners();
                this.setupPageChangeDetection();
            }
        });
    }

    attachListeners() {
        // Track all mouseovers (for hover time calculation)
        document.addEventListener('mouseover', (e) => {
            this.handleHover(e);
        }, true);

        // Track all clicks (but only process if page changes)
        document.addEventListener('click', (e) => {
            this.handleClick(e);
        }, true);

        // Reset hover time when mouse leaves any element
        document.addEventListener('mouseout', (e) => {
            this.hoverStartTime = null;
        }, true);
    }

    setupPageChangeDetection() {
        // Track both MutationObserver and beforeunload for maximum reliability
        this.setupMutationObserver();
        window.addEventListener('beforeunload', () => {
            if (this.lastClickTime) {
                this.processValidClick(this.lastClickElement);
            }
        });
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            if (this.lastClickTime && Date.now() - this.lastClickTime < 1000) {
                const currentHTML = document.body.innerHTML;
                if (currentHTML !== this.lastBodyHTML || window.location.href !== this.lastLocation) {
                    this.processValidClick(this.lastClickElement);
                    this.lastClickTime = null;
                    this.lastClickElement = null;
                    this.lastBodyHTML = currentHTML;
                    this.lastLocation = window.location.href;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }

    handleHover(event) {
        this.hoverStartTime = Date.now();
    }

    handleClick(event) {
        // Only track left mouse button clicks
        if (event.button !== 0) return;

        this.lastClickTime = Date.now();
        this.lastClickElement = event.target;
        
        // Fallback check for page changes
        setTimeout(() => {
            if (this.lastClickTime && Date.now() - this.lastClickTime < 1000) {
                const currentHTML = document.body.innerHTML;
                if (currentHTML !== this.lastBodyHTML || window.location.href !== this.lastLocation) {
                    this.processValidClick(this.lastClickElement);
                    this.lastClickTime = null;
                    this.lastClickElement = null;
                    this.lastBodyHTML = currentHTML;
                    this.lastLocation = window.location.href;
                }
            }
        }, 300);
    }

    processValidClick(element) {
        if (!this.hoverStartTime || !element) return;

        const decisionTime = Date.now() - this.hoverStartTime;
        const isNavigation = window.location.href !== this.lastLocation;

        // Skip processing if this is just a minor DOM change (not a real interaction)
        if (!isNavigation && !this.isSignificantElement(element)) {
            return;
        }

        const decisionRecord = {
            url: this.extractUrl(element),
            linkText: this.extractText(element),
            decisionTime: decisionTime,
            timestamp: new Date().toISOString(),
            domain: window.location.hostname,
            pageUrl: window.location.href,
            complexity: this.calculateComplexity(element),
            elementType: element.tagName.toLowerCase(),
            isNavigation: isNavigation
        };

        chrome.runtime.sendMessage({
            action: 'recordDecision',
            data: decisionRecord
        });

        this.hoverStartTime = null;
    }

    isSignificantElement(element) {
        // Check if element is likely interactive
        const tag = element.tagName.toLowerCase();
        const role = element.getAttribute('role');
        
        return (
            tag === 'a' || 
            tag === 'button' || 
            role === 'button' || 
            element.onclick || 
            element.href || 
            element.getAttribute('onclick') ||
            element.getAttribute('data-href') ||
            element.getAttribute('ng-click') ||
            element.hasAttribute('tabindex')
        );
    }

    calculateComplexity(element) {
        let complexity = 1;
        const parent = element.parentElement;
        
        if (parent) {
            const interactiveSiblings = Array.from(parent.children)
                .filter(child => this.isSignificantElement(child)).length;
            if (interactiveSiblings > 5) complexity += 1;
        }
        
        if (element.classList && (
            element.classList.contains('btn') || 
            element.classList.contains('button') ||
            element.classList.contains('primary') ||
            element.classList.contains('important')
        )) complexity += 1;
        
        return Math.min(5, complexity);
    }

    extractText(element) {
        const text = element.textContent || element.innerText || element.alt || element.title || '';
        return text.trim().substring(0, 100);
    }

    extractUrl(element) {
        if (element.href) return element.href;
        if (element.action) return element.action;
        if (element.onclick) return 'javascript:onclick';
        if (element.getAttribute('data-href')) return element.getAttribute('data-href');
        return window.location.href;
    }
}

// Initialize tracker
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new DecisionTracker());
} else {
    new DecisionTracker();
}