// Enhanced Scenario Database - Comprehensive Cognitive Combat System
const SCENARIO_DATABASE = {
    timeManagement: [{
            id: 'tm_001',
            character: 'L',
            scenario: 'You have 10 minutes before an important meeting. You notice 2 critical emails and 1 urgent document to review. What\'s your approach?',
            choices: [
                { id: 'a', text: 'Read all emails first, then document', logic: 'sequential' },
                { id: 'b', text: 'Skim document first, then emails', logic: 'priority' },
                { id: 'c', text: 'Multi-task: read while walking to meeting', logic: 'parallel' },
                { id: 'd', text: 'Delegate email reading to assistant', logic: 'delegation' }
            ],
            responses: {
                a: {
                    counter: 'Interesting choice. But emails can spiral into rabbit holes. L would say: "The document likely contains the core information needed for your meeting. Sequential processing ignores priority hierarchy."',
                    stats: { consistency: +2, logicalDepth: -1, riskTolerance: -1 }
                },
                b: {
                    counter: 'Logical prioritization. L approves: "Document relevance to the meeting outweighs email urgency. You\'re thinking systematically about information hierarchy."',
                    stats: { consistency: +3, logicalDepth: +2, riskTolerance: +1 }
                },
                c: {
                    counter: 'Risky but efficient. L notes: "Parallel processing increases error probability by 23%. However, time constraints sometimes necessitate calculated risks."',
                    stats: { riskTolerance: +3, reactionSpeed: +2, consistency: -2 }
                },
                d: {
                    counter: 'Delegation shows strategic thinking. L observes: "You recognize your cognitive limits and optimize resource allocation. But dependency on others introduces variables."',
                    stats: { logicalDepth: +2, riskTolerance: +1, consistency: +1 }
                }
            }
        },
        {
            id: 'tm_002',
            character: 'Near',
            scenario: 'Your productivity app shows you\'ve been procrastinating on Task A for 3 days, but Task B just became urgent. Task A takes 2 hours, Task B takes 30 minutes.',
            choices: [
                { id: 'a', text: 'Finish Task B first (momentum approach)', logic: 'quick_win' },
                { id: 'b', text: 'Force yourself to do Task A (discipline)', logic: 'discipline' },
                { id: 'c', text: 'Break Task A into smaller chunks, alternate', logic: 'chunking' },
                { id: 'd', text: 'Analyze why you\'re procrastinating on A first', logic: 'root_cause' }
            ],
            responses: {
                a: {
                    counter: 'Near calculates: "Quick wins generate dopamine, improving subsequent task performance by 12%. But you\'re avoiding the core procrastination pattern."',
                    stats: { reactionSpeed: +2, consistency: -1, logicalDepth: -1 }
                },
                b: {
                    counter: 'Near notes: "Brute force rarely addresses underlying resistance. Your brain will likely sabotage this approach within 47 minutes. Discipline without strategy fails."',
                    stats: { consistency: +1, riskTolerance: -2, logicalDepth: -2 }
                },
                c: {
                    counter: 'Near approves: "Chunking reduces cognitive load and provides regular feedback loops. This approach addresses both urgency and the procrastination cycle systematically."',
                    stats: { logicalDepth: +3, consistency: +2, reactionSpeed: +1 }
                },
                d: {
                    counter: 'Near is impressed: "Root cause analysis prevents recurring patterns. Most people treat symptoms. You\'re thinking like a detective - addressing the system, not just the instance."',
                    stats: { logicalDepth: +4, consistency: +1, riskTolerance: +1 }
                }
            }
        },
        {
            id: 'tm_003',
            character: 'Mello',
            scenario: 'You\'ve been working for 6 hours straight and productivity is declining. You have 4 hours left before a deadline. Your energy is at 30%.',
            choices: [
                { id: 'a', text: 'Power through with coffee and determination', logic: 'brute_force' },
                { id: 'b', text: 'Take a 20-minute power nap', logic: 'recovery' },
                { id: 'c', text: 'Switch to easier tasks to maintain momentum', logic: 'adaptation' },
                { id: 'd', text: 'Take a 5-minute break every 25 minutes (Pomodoro)', logic: 'structured' }
            ],
            responses: {
                a: {
                    counter: 'Mello scoffs: "Typical brute force approach. Your cognitive function is already compromised. Caffeine will create a crash in 2 hours, right when you need peak performance."',
                    stats: { riskTolerance: +2, consistency: -3, reactionSpeed: -1 }
                },
                b: {
                    counter: 'Mello nods: "Smart. 20 minutes of REM sleep can restore 40% of cognitive function. Risk: you might oversleep. But calculated risks separate winners from losers."',
                    stats: { riskTolerance: +1, logicalDepth: +2, reactionSpeed: +3 }
                },
                c: {
                    counter: 'Mello is conflicted: "Adaptive strategy, but you\'re avoiding the hard problems when tired. This could backfire if the easy tasks don\'t actually matter."',
                    stats: { consistency: +1, riskTolerance: -1, logicalDepth: -1 }
                },
                d: {
                    counter: 'Mello approves: "Structured recovery prevents burnout. You\'re optimizing for sustainable performance, not just immediate output. This is how professionals operate."',
                    stats: { consistency: +3, logicalDepth: +2, reactionSpeed: +1 }
                }
            }
        }
    ],

    decisionMaking: [{
            id: 'dm_001',
            character: 'L',
            scenario: 'You\'re offered two job opportunities: Job A pays 20% more but requires 60-hour weeks. Job B offers flexible hours but in a declining industry. You have 24 hours to decide.',
            choices: [
                { id: 'a', text: 'Take Job A - money talks', logic: 'financial' },
                { id: 'b', text: 'Take Job B - work-life balance matters', logic: 'lifestyle' },
                { id: 'c', text: 'Negotiate with both for better terms', logic: 'optimization' },
                { id: 'd', text: 'Create a decision matrix with weighted criteria', logic: 'systematic' }
            ],
            responses: {
                a: {
                    counter: 'L questions: "Money is a single variable in a multi-dimensional equation. 60-hour weeks reduce your time for skill development, relationships, and strategic thinking. Short-sighted optimization."',
                    stats: { riskTolerance: +1, logicalDepth: -2, consistency: -1 }
                },
                b: {
                    counter: 'L counters: "Work-life balance in a declining industry may lead to unemployment balance. You\'re optimizing for current comfort over future security. Myopic choice."',
                    stats: { riskTolerance: -2, consistency: +1, logicalDepth: -1 }
                },
                c: {
                    counter: 'L is intrigued: "Information gathering and leverage creation. You reject false dichotomies. However, negotiation success depends on your alternatives and their desperation."',
                    stats: { riskTolerance: +2, logicalDepth: +1, consistency: +1 }
                },
                d: {
                    counter: 'L approves: "Systematic analysis reduces emotional bias. Weight factors like industry growth, skill development, stress impact, and opportunity cost. This is how rational actors decide."',
                    stats: { logicalDepth: +4, consistency: +2, riskTolerance: +1 }
                }
            }
        },
        {
            id: 'dm_002',
            character: 'Near',
            scenario: 'Your startup has 3 months of runway left. You can either pivot to a safer market with lower growth potential or double down on your risky but potentially lucrative original idea.',
            choices: [
                { id: 'a', text: 'Pivot to safety - survival first', logic: 'conservative' },
                { id: 'b', text: 'Double down - go big or go home', logic: 'aggressive' },
                { id: 'c', text: 'Hybrid approach - test both simultaneously', logic: 'hedging' },
                { id: 'd', text: 'Seek more funding to extend runway', logic: 'resource_extension' }
            ],
            responses: {
                a: {
                    counter: 'Near calculates: "Survival extends your game, but pivoting with 3 months runway means entering a competitive market with limited resources. You\'re choosing slow death over quick death."',
                    stats: { riskTolerance: -2, consistency: +1, logicalDepth: +1 }
                },
                b: {
                    counter: 'Near is impressed: "High conviction play. If you\'re right, 3 months could be enough to prove traction. If wrong, you fail fast and learn. This eliminates the middle ground of mediocrity."',
                    stats: { riskTolerance: +4, consistency: +2, logicalDepth: +1 }
                },
                c: {
                    counter: 'Near frowns: "Resource dilution. With 3 months left, you lack the bandwidth to execute two strategies well. You\'re increasing complexity when you need focus."',
                    stats: { riskTolerance: +1, consistency: -2, logicalDepth: -1 }
                },
                d: {
                    counter: 'Near nods: "Meta-strategy. Fundraising is another skill test, but it buys time for better decision-making. However, desperation shows in pitch decks. Can you hide your weakness?"',
                    stats: { logicalDepth: +3, riskTolerance: +1, consistency: +1 }
                }
            }
        },
        {
            id: 'dm_003',
            character: 'Mello',
            scenario: 'You discover your close friend has been spreading rumors about you. You have evidence but confronting them might end the friendship. What\'s your move?',
            choices: [
                { id: 'a', text: 'Confront them directly with evidence', logic: 'direct' },
                { id: 'b', text: 'Spread counter-rumors to level the field', logic: 'retaliation' },
                { id: 'c', text: 'Quietly distance yourself without confrontation', logic: 'avoidance' },
                { id: 'd', text: 'Use a mutual friend as intermediary', logic: 'mediation' }
            ],
            responses: {
                a: {
                    counter: 'Mello respects this: "Direct confrontation forces truth. Either they confess and you can rebuild trust, or they deny and you know where you stand. No ambiguity."',
                    stats: { consistency: +3, riskTolerance: +2, logicalDepth: +1 }
                },
                b: {
                    counter: 'Mello laughs: "Fight fire with fire. But now you\'re both playing a dirty game. This escalates until someone gets burned. Are you ready for total war?"',
                    stats: { riskTolerance: +3, consistency: -2, logicalDepth: -1 }
                },
                c: {
                    counter: 'Mello is disappointed: "Passive approach. You avoid conflict but learn nothing about their motivations. Problems fester when ignored. This is cowardice disguised as wisdom."',
                    stats: { riskTolerance: -3, consistency: -1, logicalDepth: -1 }
                },
                d: {
                    counter: 'Mello considers: "Diplomatic but risky. The intermediary becomes a single point of failure. Their bias and communication skills determine the outcome. You\'re outsourcing your agency."',
                    stats: { logicalDepth: +2, riskTolerance: -1, consistency: +1 }
                }
            }
        }
    ],

    problemSolving: [{
            id: 'ps_001',
            character: 'L',
            scenario: 'Your team is stuck on a complex problem for 2 weeks. Morale is low and the deadline is in 3 days. You notice a pattern that others have missed.',
            choices: [
                { id: 'a', text: 'Present your insight immediately to the team', logic: 'sharing' },
                { id: 'b', text: 'Develop the idea further before sharing', logic: 'preparation' },
                { id: 'c', text: 'Test your theory privately first', logic: 'validation' },
                { id: 'd', text: 'Suggest a complete problem reframe', logic: 'paradigm_shift' }
            ],
            responses: {
                a: {
                    counter: 'L cautions: "Premature sharing invites premature criticism. Teams in frustration mode often reject new ideas reflexively. Your insight could be dismissed before proper evaluation."',
                    stats: { reactionSpeed: +2, consistency: +1, logicalDepth: -1 }
                },
                b: {
                    counter: 'L approves: "Preparation increases credibility. But with 3 days remaining, perfectionism could delay action past the point of utility. Balance thoroughness with urgency."',
                    stats: { consistency: +2, logicalDepth: +2, reactionSpeed: -1 }
                },
                c: {
                    counter: 'L nods: "Private validation reduces public failure risk. You can iterate without team scrutiny. This is scientifically sound but time-intensive."',
                    stats: { logicalDepth: +3, riskTolerance: -1, consistency: +1 }
                },
                d: {
                    counter: 'L is intrigued: "Paradigm shifts often solve intractable problems. But cognitive inertia makes teams resist fundamental reframes. You need exceptional persuasion skills."',
                    stats: { logicalDepth: +4, riskTolerance: +2, consistency: +1 }
                }
            }
        },
        {
            id: 'ps_002',
            character: 'Near',
            scenario: 'You\'re debugging a critical system issue. You have 3 potential root causes, each requiring 2 hours to investigate. The system is losing $1000/hour.',
            choices: [
                { id: 'a', text: 'Investigate the most likely cause first', logic: 'probability' },
                { id: 'b', text: 'Check the quickest-to-fix cause first', logic: 'optimization' },
                { id: 'c', text: 'Investigate all three in parallel with team', logic: 'parallelization' },
                { id: 'd', text: 'Implement temporary workaround first', logic: 'damage_control' }
            ],
            responses: {
                a: {
                    counter: 'Near calculates: "Probability-based approach. 60% chance of solving in 2 hours vs guaranteed 6-hour investigation. Expected value favors this approach."',
                    stats: { logicalDepth: +2, consistency: +2, riskTolerance: +1 }
                },
                b: {
                    counter: 'Near notes: "Optimization thinking. Quick wins reduce bleeding, but if you\'re wrong, you\'ve wasted time on unlikely causes. This inverts probability logic."',
                    stats: { reactionSpeed: +2, riskTolerance: +1, logicalDepth: -1 }
                },
                c: {
                    counter: 'Near approves: "Resource multiplication. Three 2-hour investigations become one 2-hour investigation. Efficient if you have qualified team members available."',
                    stats: { logicalDepth: +3, reactionSpeed: +3, consistency: +1 }
                },
                d: {
                    counter: 'Near is impressed: "Systems thinking. Stop the bleeding first, then find the source. Workarounds buy time for proper investigation. This is damage control strategy."',
                    stats: { riskTolerance: +1, logicalDepth: +2, reactionSpeed: +2 }
                }
            }
        },
        {
            id: 'ps_003',
            character: 'Mello',
            scenario: 'Your competitor just released a feature that makes your product look obsolete. You can either rush a similar feature or pivot to a completely different approach.',
            choices: [
                { id: 'a', text: 'Rush to copy their feature', logic: 'reactive' },
                { id: 'b', text: 'Build something better that makes their feature irrelevant', logic: 'leapfrog' },
                { id: 'c', text: 'Focus on your existing strengths', logic: 'differentiation' },
                { id: 'd', text: 'Form a partnership instead of competing', logic: 'collaboration' }
            ],
            responses: {
                a: {
                    counter: 'Mello scoffs: "Reactive strategy. You\'re always one step behind, playing their game. By the time you copy, they\'ve moved to the next innovation. This is loser mentality."',
                    stats: { riskTolerance: -2, consistency: -1, reactionSpeed: +1 }
                },
                b: {
                    counter: 'Mello grins: "Now you\'re thinking like a winner. Leapfrog strategy. Risky but high reward. If you succeed, you reverse the power dynamic. If you fail, you fail spectacularly."',
                    stats: { riskTolerance: +4, logicalDepth: +2, consistency: +1 }
                },
                c: {
                    counter: 'Mello considers: "Differentiation play. You\'re betting your strengths matter more than their new feature. This works if you truly understand your value proposition."',
                    stats: { consistency: +2, riskTolerance: +1, logicalDepth: +1 }
                },
                d: {
                    counter: 'Mello is surprised: "Collaboration over competition. Unexpected move. This could create a bigger pie for both, but requires trust and aligned incentives. High-level strategic thinking."',
                    stats: { logicalDepth: +3, riskTolerance: +2, consistency: +2 }
                }
            }
        }
    ],

    riskAssessment: [{
            id: 'ra_001',
            character: 'L',
            scenario: 'You\'re considering investing $10,000. Option A: 90% chance of 5% return. Option B: 30% chance of 40% return. Option C: Guaranteed 3% return.',
            choices: [
                { id: 'a', text: 'Choose Option A - high probability wins', logic: 'probability' },
                { id: 'b', text: 'Choose Option B - maximum upside potential', logic: 'upside' },
                { id: 'c', text: 'Choose Option C - guarantee is worth the trade-off', logic: 'safety' },
                { id: 'd', text: 'Split investment across all three options', logic: 'diversification' }
            ],
            responses: {
                a: {
                    counter: 'L calculates: "Expected value: $450. Probability-weighted thinking. But are you optimizing for expected value or for probability of positive outcome? Context matters."',
                    stats: { consistency: +2, logicalDepth: +1, riskTolerance: +1 }
                },
                b: {
                    counter: 'L questions: "Expected value: $1200. Highest mathematical expectation, but 70% chance of loss. Are you prepared for the likely negative outcome?"',
                    stats: { riskTolerance: +3, logicalDepth: +1, consistency: -1 }
                },
                c: {
                    counter: 'L notes: "Certainty has value, but you\'re leaving expected value on the table. This choice reveals risk aversion. Is this emotional or rational decision-making?"',
                    stats: { riskTolerance: -2, consistency: +1, logicalDepth: -1 }
                },
                d: {
                    counter: 'L approves: "Diversification reduces variance while maintaining reasonable expected value. You\'re optimizing for risk-adjusted returns. Sophisticated approach."',
                    stats: { logicalDepth: +3, consistency: +2, riskTolerance: +1 }
                }
            }
        },
        {
            id: 'ra_002',
            character: 'Near',
            scenario: 'Your data shows a security vulnerability in your system. Fixing it requires 2 weeks of downtime. The breach probability is 15% per month.',
            choices: [
                { id: 'a', text: 'Fix immediately - security first', logic: 'precautionary' },
                { id: 'b', text: 'Implement temporary patches while planning fix', logic: 'staged' },
                { id: 'c', text: 'Calculate expected cost of breach vs downtime', logic: 'quantitative' },
                { id: 'd', text: 'Crowdsource a faster solution', logic: 'creative' }
            ],
            responses: {
                a: {
                    counter: 'Near notes: "Precautionary principle. But 2 weeks downtime has definite cost while breach is probabilistic. Are you sure this optimizes total risk?"',
                    stats: { riskTolerance: -1, consistency: +2, logicalDepth: +1 }
                },
                b: {
                    counter: 'Near approves: "Staged approach reduces immediate risk while maintaining operations. You\'re buying time for proper solution. This balances competing priorities."',
                    stats: { consistency: +3, logicalDepth: +2, riskTolerance: +1 }
                },
                c: {
                    counter: 'Near is impressed: "Quantitative risk assessment. Expected breach cost vs certain downtime cost. This is how rational actors make decisions under uncertainty."',
                    stats: { logicalDepth: +4, consistency: +1, riskTolerance: +1 }
                },
                d: {
                    counter: 'Near considers: "Creative problem-solving. Crowdsourcing might find innovative solutions you missed. But it introduces new risks: IP exposure, quality control, coordination overhead."',
                    stats: { logicalDepth: +2, riskTolerance: +2, consistency: -1 }
                }
            }
        }
    ],

    socialDynamics: [{
            id: 'sd_001',
            character: 'Mello',
            scenario: 'In a team meeting, someone takes credit for your idea. The room seems to accept this. You have 10 seconds before the conversation moves on.',
            choices: [
                { id: 'a', text: 'Immediately correct the record', logic: 'direct' },
                { id: 'b', text: 'Let it slide and address privately later', logic: 'diplomatic' },
                { id: 'c', text: 'Build on "their" idea to reclaim ownership', logic: 'strategic' },
                { id: 'd', text: 'Document everything and report to manager', logic: 'formal' }
            ],
            responses: {
                a: {
                    counter: 'Mello nods: "Direct confrontation. Risky but establishes boundaries. The room will respect your backbone or think you\'re petty. Depends on your delivery and their character."',
                    stats: { riskTolerance: +2, consistency: +2, reactionSpeed: +2 }
                },
                b: {
                    counter: 'Mello frowns: "Diplomatic but weak. Private conversations have no witnesses. They can deny, minimize, or gaslight. You\'ve lost the moment and the audience."',
                    stats: { riskTolerance: -2, consistency: -1, logicalDepth: +1 }
                },
                c: {
                    counter: 'Mello grins: "Strategic brilliance. You reclaim ownership while appearing collaborative. This requires quick thinking and social intelligence. High-level manipulation."',
                    stats: { logicalDepth: +3, riskTolerance: +1, reactionSpeed: +2 }
                },
                d: {
                    counter: 'Mello is disgusted: "Bureaucratic approach. You\'re outsourcing your agency to management. This makes you look weak and creates unnecessary drama. Handle your own battles."',
                    stats: { riskTolerance: -3, consistency: +1, logicalDepth: -1 }
                }
            }
        },
        {
            id: 'sd_002',
            character: 'L',
            scenario: 'You notice a pattern: your manager consistently interrupts women in meetings but not men. You\'re not directly affected but you see it happening.',
            choices: [
                { id: 'a', text: 'Speak up in the moment when it happens', logic: 'intervention' },
                { id: 'b', text: 'Collect data first, then present evidence', logic: 'systematic' },
                { id: 'c', text: 'Talk to affected colleagues privately first', logic: 'coalition' },
                { id: 'd', text: 'Stay neutral - not your problem to solve', logic: 'avoidance' }
            ],
            responses: {
                a: {
                    counter: 'L observes: "Immediate intervention. Morally clear but tactically risky. You could be dismissed as overly sensitive or agenda-driven. Real-time correction requires skill."',
                    stats: { riskTolerance: +3, consistency: +2, reactionSpeed: +2 }
                },
                b: {
                    counter: 'L approves: "Data-driven approach. Bias is hard to deny when quantified. But data collection takes time during which the behavior continues. You\'re optimizing for persuasion over immediate action."',
                    stats: { logicalDepth: +4, consistency: +1, riskTolerance: +1 }
                },
                c: {
                    counter: 'L nods: "Coalition building. You\'re checking whether others perceive the pattern and want your help. This prevents presumptuous advocacy and builds support."',
                    stats: { logicalDepth: +2, consistency: +2, riskTolerance: +1 }
                },
                d: {
                    counter: 'L questions: "Neutrality is complicity when you have the power to act. You\'re prioritizing your comfort over others\' dignity. Is this the person you want to be?"',
                    stats: { riskTolerance: -3, consistency: -2, logicalDepth: -1 }
                }
            }
        }
    ],

    creativity: [{
        id: 'cr_001',
        character: 'Near',
        scenario: 'You need to present a boring quarterly report in a way that engages your audience. Standard presentations always put people to sleep.',
        choices: [
            { id: 'a', text: 'Gamify it - turn data into a competition story', logic: 'gamification' },
            { id: 'b', text: 'Use storytelling - data as narrative arc', logic: 'narrative' },
            { id: 'c', text: 'Interactive demo - let audience explore data', logic: 'participation' },
            { id: 'd', text: 'Visual metaphors - data as journey/battle/growth', logic: 'metaphor' }
        ],
        responses: {
            a: {
                counter: 'Near calculates: "Gamification increases engagement by 40% but risks trivializing serious data. Depends on company culture and audience sophistication."',
                stats: { logicalDepth: +1, riskTolerance: +2, reactionSpeed: +2 }
            },
            b: {
                counter: 'Near nods: "Narrative structure makes information memorable. Humans are wired for stories. You\'re working with cognitive architecture, not against it."',
                stats: { logicalDepth: +2, consistency: +2, riskTolerance: +1 }
            },
            c: {
                counter: 'Near is impressed: "Interactive engagement prevents passive consumption. Audience discovers insights themselves, creating ownership. Requires technical setup but high impact."',
                stats: { logicalDepth: +3, riskTolerance: +1, consistency: +1 }
            },
            d: {
                counter: 'Near approves: "Metaphorical thinking bridges abstract data and concrete understanding. You\'re creating cognitive scaffolding. This shows sophisticated communication design."',
                stats: { logicalDepth: +4, consistency: +1, riskTolerance: +1 }
            }
        }
    }]
};

// Scenario Manager - Handles scenario selection and logic
class ScenarioManager {

    static getAllScenarios() {
        const scenarios = [];
        Object.values(SCENARIO_DATABASE).forEach(category => {
            scenarios.push(...category);
        });
        return scenarios;
    }

    static getRandomScenario(completedIds = []) {
        const allScenarios = this.getAllScenarios();
        const availableScenarios = allScenarios.filter(scenario =>
            !completedIds.includes(scenario.id)
        );

        if (availableScenarios.length === 0) {
            return null; // All scenarios completed
        }

        const randomIndex = Math.floor(Math.random() * availableScenarios.length);
        return availableScenarios[randomIndex];
    }

    static getScenarioById(id) {
        const allScenarios = this.getAllScenarios();
        return allScenarios.find(scenario => scenario.id === id);
    }

    static getScenariosByCategory(category) {
        return SCENARIO_DATABASE[category] || [];
    }

    static getCategories() {
        return Object.keys(SCENARIO_DATABASE);
    }

    static getTotalScenarioCount() {
        return this.getAllScenarios().length;
    }

    static getCompletionPercentage(completedIds = []) {
        const total = this.getTotalScenarioCount();
        const completed = completedIds.length;
        return Math.round((completed / total) * 100);
    }

}