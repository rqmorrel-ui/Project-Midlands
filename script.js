// HOPE Toolkit 2.0 - script.js
// Modular, ADHD-friendly JavaScript for Rob Pralow (Project Midlands)

// ==== STEP 1: GLOBALS & HELPERS ====
function logStep(message) {
    console.log(`[HOPE Toolkit]: ${message}`);
}

// Alert if a key function is triggered
function alertTrigger(fnName) {
    alert(`✅ Triggered: ${fnName} — Now running simulation.`);
    logStep(`${fnName} executed.`);
}

// Safe DOM element getter with error handling
function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`[HOPE Toolkit]: Element with id '${id}' not found`);
        return null;
    }
    return element;
}

// Safe DOM element setter
function safeSetElement(id, property, value) {
    const element = safeGetElement(id);
    if (element) {
        try {
            element[property] = value;
            return true;
        } catch (error) {
            console.error(`[HOPE Toolkit]: Error setting ${property} on element ${id}:`, error);
            return false;
        }
    }
    return false;
}

// ==== STEP 2: CAMPAIGN SETUP & NAVIGATION ====
function showUploadTab(tabType, event) {
    try {
        // Hide all upload content
        const uploadContents = document.querySelectorAll('.upload-content');
        uploadContents.forEach(content => content.classList.remove('active'));
        
        // Show selected tab
        const targetTab = safeGetElement(`${tabType}Upload`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        logStep(`Switched to ${tabType} upload tab`);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in showUploadTab:', error);
    }
}

function selectOfficeLevel(level, event) {
    try {
        // Update button states
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        
        if (event && event.target) {
            event.target.classList.add('selected');
        }
        
        // Show next step based on selection
        if (level === 'federal' || level === 'state') {
            const stateStep = safeGetElement('stateStep');
            if (stateStep) {
                stateStep.style.display = 'block';
            }
        } else {
            const officeTypeStep = safeGetElement('officeTypeStep');
            if (officeTypeStep) {
                officeTypeStep.style.display = 'block';
            }
        }
        
        logStep(`Selected office level: ${level}`);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in selectOfficeLevel:', error);
    }
}

function proceedToOfficeType() {
    try {
        safeSetElement('stateStep', 'style.display', 'none');
        safeSetElement('officeTypeStep', 'style.display', 'block');
        logStep('Proceeded to office type selection');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in proceedToOfficeType:', error);
    }
}

function proceedToInsightsSection() {
    try {
        safeSetElement('districtStep', 'style.display', 'none');
        safeSetElement('insightsStep', 'style.display', 'block');
        logStep('Proceeded to insights section');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in proceedToInsightsSection:', error);
    }
}

function proceedToDataGeneration() {
    try {
        const step1 = safeGetElement('step1');
        const step2 = safeGetElement('step2');
        
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');
        
        logStep('Proceeded to data generation step');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in proceedToDataGeneration:', error);
    }
}

// ==== STEP 3: DATA PROCESSING ====
function processLocationQuery() {
    try {
        alertTrigger('processLocationQuery');
        const locationElement = safeGetElement('queryLocation');
        const queryTypeElement = safeGetElement('queryType');
        
        if (!locationElement || !queryTypeElement) {
            console.error('[HOPE Toolkit]: Required elements for location query not found');
            return;
        }
        
        const location = locationElement.value;
        const queryType = queryTypeElement.value;
        
        console.log(`📍 Processing location query: ${location} (${queryType})`);
        
        // Simulate processing
        setTimeout(() => {
            safeSetElement('dataSummary', 'innerText', 
                `Processed ${queryType} data for ${location}. Ready for voice analysis.`);
            logStep('Location query processed');
        }, 1000);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in processLocationQuery:', error);
    }
}

function saveManualData() {
    try {
        alertTrigger('saveManualData');
        const campaignNameElement = safeGetElement('campaignName');
        const targetDistrictElement = safeGetElement('targetDistrict');
        const primaryIssuesElement = safeGetElement('primaryIssues');
        
        if (!campaignNameElement || !targetDistrictElement || !primaryIssuesElement) {
            console.error('[HOPE Toolkit]: Required elements for manual data not found');
            return;
        }
        
        const campaignName = campaignNameElement.value;
        const targetDistrict = targetDistrictElement.value;
        const primaryIssues = primaryIssuesElement.value;
        
        console.log(`💾 Saving manual data for: ${campaignName}`);
        console.log(`🎯 District: ${targetDistrict}, Issues: ${primaryIssues}`);
        
        safeSetElement('dataSummary', 'innerText', 
            `Saved campaign data for ${campaignName}. Ready for voice analysis.`);
        logStep('Manual data saved');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in saveManualData:', error);
    }
}

// ==== STEP 4: VOICE ANALYSIS ====
function selectVoiceType(type, event) {
    try {
        const voiceOptions = document.querySelectorAll('.voice-option');
        voiceOptions.forEach(option => option.classList.remove('active'));
        
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        const customVoiceInputs = safeGetElement('customVoiceInputs');
        const standardVoiceInputs = safeGetElement('standardVoiceInputs');
        
        if (type === 'custom') {
            if (customVoiceInputs) customVoiceInputs.style.display = 'block';
            if (standardVoiceInputs) standardVoiceInputs.style.display = 'none';
        } else {
            if (customVoiceInputs) customVoiceInputs.style.display = 'none';
            if (standardVoiceInputs) standardVoiceInputs.style.display = 'block';
        }
        
        logStep(`Selected voice type: ${type}`);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in selectVoiceType:', error);
    }
}

function analyzeVoiceProfile() {
    try {
        alertTrigger('analyzeVoiceProfile');
        const zipCodeElement = safeGetElement('zipCodeForTone');
        
        if (!zipCodeElement) {
            console.error('[HOPE Toolkit]: ZIP code element not found');
            return;
        }
        
        const zipCode = zipCodeElement.value;
        console.log(`🎙️ Analyzing voice profile for ZIP: ${zipCode}`);
        
        // Simulate voice analysis
        setTimeout(() => {
            const detectedTone = 'Inspirational / Community-Focused';
            const voiceStyle = 'Calm authority';
            
            const detectedToneDisplay = safeGetElement('detectedToneDisplay');
            if (detectedToneDisplay) {
                detectedToneDisplay.innerHTML = `
                    <div class="tone-result">
                        <h4>AI-Detected Voice Profile</h4>
                        <p><strong>Tone:</strong> ${detectedTone}</p>
                        <p><strong>Style:</strong> ${voiceStyle}</p>
                        <p><strong>Confidence:</strong> 94%</p>
                    </div>
                `;
            }
            
            safeSetElement('step2_5', 'style.display', 'block');
            logStep('Voice profile analyzed');
        }, 1500);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in analyzeVoiceProfile:', error);
    }
}

function saveStandardVoice() {
    try {
        alertTrigger('saveStandardVoice');
        const activeVoiceOption = document.querySelector('.voice-option.active');
        
        if (!activeVoiceOption) {
            console.error('[HOPE Toolkit]: No active voice option found');
            return;
        }
        
        const selectedVoice = activeVoiceOption.textContent.trim();
        console.log(`💾 Saving standard voice: ${selectedVoice}`);
        
        safeSetElement('voiceSummary', 'innerText', 
            `Voice profile saved: ${selectedVoice}`);
        logStep('Standard voice saved');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in saveStandardVoice:', error);
    }
}

// ==== STEP 5: INTELLIGENCE ACTIVATION ====
function activateIntelligence() {
    try {
        alertTrigger('activateIntelligence');
        console.log('🚀 Activating Campaign Intelligence Platform');
        
        // Simulate activation
        setTimeout(() => {
            safeSetElement('campaignSetup', 'style.display', 'none');
            safeSetElement('intelligenceDashboard', 'style.display', 'block');
            
            // Update dashboard metrics
            safeSetElement('voterCount', 'textContent', '47,892');
            safeSetElement('messageCount', 'textContent', '156');
            safeSetElement('efficiencyScore', 'textContent', '94%');
            
            logStep('Intelligence platform activated');
        }, 2000);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in activateIntelligence:', error);
    }
}

// ==== STEP 6: TOOL NAVIGATION ====
function openIntelligenceTool(toolType) {
    try {
        const toolInterfaces = document.querySelectorAll('.tool-interface');
        toolInterfaces.forEach(interface => interface.style.display = 'none');
        
        safeSetElement('intelligenceTools', 'style.display', 'block');
        safeSetElement('intelligenceDashboard', 'style.display', 'none');
        
        const toolTitles = {
            'strategy': 'Strategic Intelligence',
            'communications': 'Communications Generator',
            'voter': 'Voter Analysis',
            'fundraising': 'Fundraising Intelligence',
            'outreach': 'Outreach Strategy',
            'response': 'Response Management',
            'rapid': 'Rapid Response Analysis',
            'incumbent': 'Incumbent Analysis',
            'organization': 'Organization Strategy'
        };
        
        const toolTitle = safeGetElement('toolTitle');
        if (toolTitle && toolTitles[toolType]) {
            toolTitle.textContent = toolTitles[toolType];
        }
        
        const targetTool = safeGetElement(`${toolType}Tool`);
        if (targetTool) {
            targetTool.style.display = 'block';
        }
        
        logStep(`Opened ${toolType} tool`);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in openIntelligenceTool:', error);
    }
}

function showDashboard() {
    try {
        safeSetElement('intelligenceTools', 'style.display', 'none');
        safeSetElement('intelligenceDashboard', 'style.display', 'block');
        logStep('Returned to dashboard');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in showDashboard:', error);
    }
}

// ==== STEP 7: COMMUNICATIONS GENERATION ====
function generateAllCommunications() {
    try {
        alertTrigger('generateAllCommunications');
        const goalElement = safeGetElement('commGoal');
        const audienceElement = safeGetElement('commAudience');
        const locationElement = safeGetElement('commLocation');
        const toneElement = safeGetElement('commTone');
        const hookElement = safeGetElement('commHook');
        const ctaElement = safeGetElement('commCTA');
        
        if (!goalElement || !audienceElement || !locationElement || !toneElement || !hookElement || !ctaElement) {
            console.error('[HOPE Toolkit]: Required communication elements not found');
            return;
        }
        
        const goal = goalElement.value;
        const audience = audienceElement.value;
        const location = locationElement.value;
        const tone = toneElement.value;
        const hook = hookElement.value;
        const cta = ctaElement.value;
        
        console.log(`📬 Generating communications for: ${audience}`);
        console.log(`🎯 Goal: ${goal}, 📍 Location: ${location}, 🗣️ Tone: ${tone}`);
        
        // Simulate generation
        setTimeout(() => {
            const result = `
                <div class="communication-result">
                    <h4>Generated Communication</h4>
                    <p><strong>Subject:</strong> ${hook} - Action Needed</p>
                    <p><strong>Message:</strong></p>
                    <div class="message-content">
                        <p>Dear ${audience},</p>
                        <p>${hook} is critical for our community's future. As your neighbor in ${location}, I'm reaching out because ${goal.toLowerCase()} matters to all of us.</p>
                        <p>Your voice can make the difference. ${cta}.</p>
                        <p>Together, we can build a stronger ${location}.</p>
                        <p>Best regards,<br>Your Campaign Team</p>
                    </div>
                    <p><strong>Tone:</strong> ${tone} | <strong>Optimized for:</strong> ${audience}</p>
                </div>
            `;
            
            const communicationsResults = safeGetElement('communicationsResults');
            if (communicationsResults) {
                communicationsResults.innerHTML = result;
            }
            
            logStep('Communications generated');
        }, 2000);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in generateAllCommunications:', error);
    }
}

// ==== STEP 8: RAPID RESPONSE ANALYSIS ====
function analyzeComment() {
    try {
        alertTrigger('analyzeComment');
        const commentElement = safeGetElement('commentToAnalyze');
        const contextElement = safeGetElement('candidateContext');
        
        if (!commentElement || !contextElement) {
            console.error('[HOPE Toolkit]: Required comment analysis elements not found');
            return;
        }
        
        const comment = commentElement.value;
        const context = contextElement.value;
        
        console.log(`⚔️ Analyzing comment: ${comment}`);
        console.log(`👤 Context: ${context}`);
        
        // Simulate analysis
        setTimeout(() => {
            const response = `
                <div class="response-analysis">
                    <h4>EchoShield™ Analysis</h4>
                    <p><strong>Comment Type:</strong> Opposition Attack</p>
                    <p><strong>Recommended Response:</strong></p>
                    <div class="recommended-response">
                        <p>"Facts don't care about disinformation. Let's focus on the real issues affecting our community. ${context} is committed to transparency and truth."</p>
                    </div>
                    <p><strong>Response Strategy:</strong> Fact-based, calm, redirect to issues</p>
                    <p><strong>Confidence:</strong> 89%</p>
                </div>
            `;
            
            const rapidResponseResults = safeGetElement('rapidResponseResults');
            if (rapidResponseResults) {
                rapidResponseResults.innerHTML = response;
            }
            
            logStep('Comment analyzed');
        }, 1500);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in analyzeComment:', error);
    }
}

// ==== STEP 9: QUICK GENERATION ====
function quickGenerate(type) {
    try {
        alertTrigger(`quickGenerate_${type}`);
        const types = {
            'email': 'Email Campaign',
            'sms': 'SMS Outreach',
            'social': 'Social Media Post',
            'fundraising': 'Fundraising Appeal',
            'flyer': 'Campaign Flyer',
            'all': 'Complete Campaign Suite'
        };
        
        console.log(`⚡ Quick generating: ${types[type]}`);
        
        // Simulate quick generation
        setTimeout(() => {
            alert(`✅ Generated ${types[type]} content! Check your dashboard for results.`);
            logStep(`Quick generated ${type}`);
        }, 1000);
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in quickGenerate:', error);
    }
}

// ==== STEP 10: UTILITY FUNCTIONS ====
function toggleStatusDetails() {
    try {
        const statusElement = safeGetElement('currentStatus');
        const orgDetailsElement = safeGetElement('organizationDetails');
        
        if (!statusElement || !orgDetailsElement) {
            console.error('[HOPE Toolkit]: Status elements not found');
            return;
        }
        
        const status = statusElement.value;
        
        if (status === 'organization') {
            orgDetailsElement.style.display = 'block';
        } else {
            orgDetailsElement.style.display = 'none';
        }
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in toggleStatusDetails:', error);
    }
}

function configureAI() {
    try {
        alertTrigger('configureAI');
        const aiStatusElement = safeGetElement('aiStatus');
        const aiToneDisplayElement = safeGetElement('aiToneDisplay');
        
        if (!aiStatusElement) {
            console.error('[HOPE Toolkit]: AI status element not found');
            return;
        }
        
        if (aiStatusElement.textContent.includes('Disabled')) {
            aiStatusElement.textContent = 'AI: Enabled (learning from your data)';
            if (aiToneDisplayElement) {
                aiToneDisplayElement.style.display = 'block';
            }
            logStep('AI enabled');
        } else {
            aiStatusElement.textContent = 'AI: Disabled (using templates)';
            if (aiToneDisplayElement) {
                aiToneDisplayElement.style.display = 'none';
            }
            logStep('AI disabled');
        }
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in configureAI:', error);
    }
}

function displayAnalyticsDashboard() {
    try {
        alertTrigger('displayAnalyticsDashboard');
        console.log('📊 Displaying analytics dashboard');
        // Implementation for analytics dashboard
        logStep('Analytics dashboard displayed');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in displayAnalyticsDashboard:', error);
    }
}

// ==== STEP 11: FEEDBACK & MODALS ====
function submitFeedback() {
    try {
        alertTrigger('submitFeedback');
        const ratingStars = document.querySelector('.stars .fas');
        const rating = ratingStars ? ratingStars.dataset.rating : '0';
        const commentElement = safeGetElement('feedbackComment');
        const wantResponseElement = safeGetElement('wantResponse');
        const emailElement = safeGetElement('feedbackEmail');
        
        const comment = commentElement ? commentElement.value : '';
        const wantResponse = wantResponseElement ? wantResponseElement.checked : false;
        const email = emailElement ? emailElement.value : '';
        
        console.log(`📝 Feedback submitted: ${rating} stars`);
        console.log(`💬 Comment: ${comment}`);
        console.log(`📧 Want response: ${wantResponse}, Email: ${email}`);
        
        alert('Thank you for your feedback! We\'ll use it to improve the platform.');
        logStep('Feedback submitted');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in submitFeedback:', error);
    }
}

function showIPNotice() {
    try {
        safeSetElement('ipModal', 'style.display', 'block');
        logStep('IP notice displayed');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in showIPNotice:', error);
    }
}

function closeIPModal() {
    try {
        safeSetElement('ipModal', 'style.display', 'none');
        logStep('IP modal closed');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error in closeIPModal:', error);
    }
}

// ==== STEP 12: INITIALIZATION ====
document.addEventListener('DOMContentLoaded', () => {
    try {
        logStep('HOPE Toolkit 2.0 loaded successfully');
        
        // Initialize any default states
        const aiToneDisplay = safeGetElement('aiToneDisplay');
        if (aiToneDisplay) {
            aiToneDisplay.style.display = 'none';
        }
        
        // Set up star rating functionality
        const stars = document.querySelectorAll('.stars i');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                try {
                    const rating = this.dataset.rating;
                    stars.forEach(s => s.classList.remove('fas'));
                    stars.forEach(s => s.classList.add('far'));
                    
                    for (let i = 0; i < rating; i++) {
                        stars[i].classList.remove('far');
                        stars[i].classList.add('fas');
                    }
                    
                    const ratingText = document.querySelector('.rating-text');
                    if (ratingText) {
                        ratingText.textContent = `Rated ${rating} stars`;
                    }
                } catch (error) {
                    console.error('[HOPE Toolkit]: Error in star rating:', error);
                }
            });
        });
        
        // Email checkbox functionality
        const wantResponseCheckbox = safeGetElement('wantResponse');
        const feedbackEmail = safeGetElement('feedbackEmail');
        
        if (wantResponseCheckbox && feedbackEmail) {
            wantResponseCheckbox.addEventListener('change', function() {
                try {
                    feedbackEmail.style.display = this.checked ? 'block' : 'none';
                } catch (error) {
                    console.error('[HOPE Toolkit]: Error in email checkbox:', error);
                }
            });
        }
        
        logStep('All event listeners attached and initialization complete');
    } catch (error) {
        console.error('[HOPE Toolkit]: Error during initialization:', error);
    }
});