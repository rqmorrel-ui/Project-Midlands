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

// ==== STEP 2: CAMPAIGN SETUP & NAVIGATION ====
function showUploadTab(tabType) {
    // Hide all upload content
    const uploadContents = document.querySelectorAll('.upload-content');
    uploadContents.forEach(content => content.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`${tabType}Upload`).classList.add('active');
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    logStep(`Switched to ${tabType} upload tab`);
}

function selectOfficeLevel(level) {
    // Update button states
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Show next step based on selection
    if (level === 'federal') {
        document.getElementById('stateStep').style.display = 'block';
    } else if (level === 'state') {
        document.getElementById('stateStep').style.display = 'block';
    } else {
        document.getElementById('officeTypeStep').style.display = 'block';
    }
    
    logStep(`Selected office level: ${level}`);
}

function proceedToOfficeType() {
    document.getElementById('stateStep').style.display = 'none';
    document.getElementById('officeTypeStep').style.display = 'block';
    logStep('Proceeded to office type selection');
}

function proceedToInsightsSection() {
    document.getElementById('districtStep').style.display = 'none';
    document.getElementById('insightsStep').style.display = 'block';
    logStep('Proceeded to insights section');
}

function proceedToDataGeneration() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    logStep('Proceeded to data generation step');
}

// ==== STEP 3: DATA PROCESSING ====
function processLocationQuery() {
    alertTrigger('processLocationQuery');
    const location = document.getElementById('queryLocation').value;
    const queryType = document.getElementById('queryType').value;
    
    console.log(`📍 Processing location query: ${location} (${queryType})`);
    
    // Simulate processing
    setTimeout(() => {
        document.getElementById('dataSummary').innerText = 
            `Processed ${queryType} data for ${location}. Ready for voice analysis.`;
        logStep('Location query processed');
    }, 1000);
}

function saveManualData() {
    alertTrigger('saveManualData');
    const campaignName = document.getElementById('campaignName').value;
    const targetDistrict = document.getElementById('targetDistrict').value;
    const primaryIssues = document.getElementById('primaryIssues').value;
    
    console.log(`💾 Saving manual data for: ${campaignName}`);
    console.log(`🎯 District: ${targetDistrict}, Issues: ${primaryIssues}`);
    
    document.getElementById('dataSummary').innerText = 
        `Saved campaign data for ${campaignName}. Ready for voice analysis.`;
    logStep('Manual data saved');
}

// ==== STEP 4: VOICE ANALYSIS ====
function selectVoiceType(type) {
    const voiceOptions = document.querySelectorAll('.voice-option');
    voiceOptions.forEach(option => option.classList.remove('active'));
    event.target.classList.add('active');
    
    if (type === 'custom') {
        document.getElementById('customVoiceInputs').style.display = 'block';
        document.getElementById('standardVoiceInputs').style.display = 'none';
    } else {
        document.getElementById('customVoiceInputs').style.display = 'none';
        document.getElementById('standardVoiceInputs').style.display = 'block';
    }
    
    logStep(`Selected voice type: ${type}`);
}

function analyzeVoiceProfile() {
    alertTrigger('analyzeVoiceProfile');
    const zipCode = document.getElementById('zipCodeForTone').value;
    console.log(`🎙️ Analyzing voice profile for ZIP: ${zipCode}`);
    
    // Simulate voice analysis
    setTimeout(() => {
        const detectedTone = 'Inspirational / Community-Focused';
        const voiceStyle = 'Calm authority';
        
        document.getElementById('detectedToneDisplay').innerHTML = `
            <div class="tone-result">
                <h4>AI-Detected Voice Profile</h4>
                <p><strong>Tone:</strong> ${detectedTone}</p>
                <p><strong>Style:</strong> ${voiceStyle}</p>
                <p><strong>Confidence:</strong> 94%</p>
            </div>
        `;
        
        document.getElementById('step2_5').style.display = 'block';
        logStep('Voice profile analyzed');
    }, 1500);
}

function saveStandardVoice() {
    alertTrigger('saveStandardVoice');
    const selectedVoice = document.querySelector('.voice-option.active').textContent.trim();
    console.log(`💾 Saving standard voice: ${selectedVoice}`);
    
    document.getElementById('voiceSummary').innerText = 
        `Voice profile saved: ${selectedVoice}`;
    logStep('Standard voice saved');
}

// ==== STEP 5: INTELLIGENCE ACTIVATION ====
function activateIntelligence() {
    alertTrigger('activateIntelligence');
    console.log('🚀 Activating Campaign Intelligence Platform');
    
    // Simulate activation
    setTimeout(() => {
        document.getElementById('campaignSetup').style.display = 'none';
        document.getElementById('intelligenceDashboard').style.display = 'block';
        
        // Update dashboard metrics
        document.getElementById('voterCount').textContent = '47,892';
        document.getElementById('messageCount').textContent = '156';
        document.getElementById('efficiencyScore').textContent = '94%';
        
        logStep('Intelligence platform activated');
    }, 2000);
}

// ==== STEP 6: TOOL NAVIGATION ====
function openIntelligenceTool(toolType) {
    const toolInterfaces = document.querySelectorAll('.tool-interface');
    toolInterfaces.forEach(interface => interface.style.display = 'none');
    
    document.getElementById('intelligenceTools').style.display = 'block';
    document.getElementById('intelligenceDashboard').style.display = 'none';
    
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
    
    document.getElementById('toolTitle').textContent = toolTitles[toolType];
    document.getElementById(`${toolType}Tool`).style.display = 'block';
    
    logStep(`Opened ${toolType} tool`);
}

function showDashboard() {
    document.getElementById('intelligenceTools').style.display = 'none';
    document.getElementById('intelligenceDashboard').style.display = 'block';
    logStep('Returned to dashboard');
}

// ==== STEP 7: COMMUNICATIONS GENERATION ====
function generateAllCommunications() {
    alertTrigger('generateAllCommunications');
    const goal = document.getElementById('commGoal').value;
    const audience = document.getElementById('commAudience').value;
    const location = document.getElementById('commLocation').value;
    const tone = document.getElementById('commTone').value;
    const hook = document.getElementById('commHook').value;
    const cta = document.getElementById('commCTA').value;
    
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
        
        document.getElementById('communicationsResults').innerHTML = result;
        logStep('Communications generated');
    }, 2000);
}

// ==== STEP 8: RAPID RESPONSE ANALYSIS ====
function analyzeComment() {
    alertTrigger('analyzeComment');
    const comment = document.getElementById('commentToAnalyze').value;
    const context = document.getElementById('candidateContext').value;
    
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
        
        document.getElementById('rapidResponseResults').innerHTML = response;
        logStep('Comment analyzed');
    }, 1500);
}

// ==== STEP 9: QUICK GENERATION ====
function quickGenerate(type) {
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
}

// ==== STEP 10: UTILITY FUNCTIONS ====
function toggleStatusDetails() {
    const status = document.getElementById('currentStatus').value;
    const orgDetails = document.getElementById('organizationDetails');
    
    if (status === 'organization') {
        orgDetails.style.display = 'block';
    } else {
        orgDetails.style.display = 'none';
    }
}

function configureAI() {
    alertTrigger('configureAI');
    const aiStatus = document.getElementById('aiStatus');
    const aiToneDisplay = document.getElementById('aiToneDisplay');
    
    if (aiStatus.textContent.includes('Disabled')) {
        aiStatus.textContent = 'AI: Enabled (learning from your data)';
        aiToneDisplay.style.display = 'block';
        logStep('AI enabled');
    } else {
        aiStatus.textContent = 'AI: Disabled (using templates)';
        aiToneDisplay.style.display = 'none';
        logStep('AI disabled');
    }
}

function displayAnalyticsDashboard() {
    alertTrigger('displayAnalyticsDashboard');
    console.log('📊 Displaying analytics dashboard');
    // Implementation for analytics dashboard
    logStep('Analytics dashboard displayed');
}

// ==== STEP 11: FEEDBACK & MODALS ====
function submitFeedback() {
    alertTrigger('submitFeedback');
    const rating = document.querySelector('.stars .fas')?.dataset.rating || '0';
    const comment = document.getElementById('feedbackComment').value;
    const wantResponse = document.getElementById('wantResponse').checked;
    const email = document.getElementById('feedbackEmail').value;
    
    console.log(`📝 Feedback submitted: ${rating} stars`);
    console.log(`💬 Comment: ${comment}`);
    console.log(`📧 Want response: ${wantResponse}, Email: ${email}`);
    
    alert('Thank you for your feedback! We\'ll use it to improve the platform.');
    logStep('Feedback submitted');
}

function showIPNotice() {
    document.getElementById('ipModal').style.display = 'block';
    logStep('IP notice displayed');
}

function closeIPModal() {
    document.getElementById('ipModal').style.display = 'none';
    logStep('IP modal closed');
}

// ==== STEP 12: INITIALIZATION ====
document.addEventListener('DOMContentLoaded', () => {
    logStep('HOPE Toolkit 2.0 loaded successfully');
    
    // Initialize any default states
    const aiToneDisplay = document.getElementById('aiToneDisplay');
    if (aiToneDisplay) {
        aiToneDisplay.style.display = 'none';
    }
    
    // Set up any additional event listeners
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            stars.forEach(s => s.classList.remove('fas'));
            stars.forEach(s => s.classList.add('far'));
            
            for (let i = 0; i < rating; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
            
            document.querySelector('.rating-text').textContent = `Rated ${rating} stars`;
        });
    });
    
    // Email checkbox functionality
    const wantResponseCheckbox = document.getElementById('wantResponse');
    const feedbackEmail = document.getElementById('feedbackEmail');
    
    if (wantResponseCheckbox && feedbackEmail) {
        wantResponseCheckbox.addEventListener('change', function() {
            feedbackEmail.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    logStep('All event listeners attached and initialization complete');
});