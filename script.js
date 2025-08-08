// HOPE Toolkit 2.0 - script.js
// Modular, ADHD-friendly JavaScript for Rob Pralow (Project Midlands)

// ==== STEP 1: GLOBALS & HELPERS ====
function logStep(message) {
  console.log(`[HOPE Toolkit]: ${message}`);
}

function getElement(id) {
  return document.getElementById(id);
}

function showElement(el) {
  if (el) {
    el.style.display = '';
  }
}

function hideElement(el) {
  if (el) {
    el.style.display = 'none';
  }
}

function setHTML(id, html) {
  const el = getElement(id);
  if (el) {
    el.innerHTML = html;
  }
}

function setText(id, text) {
  const el = getElement(id);
  if (el) {
    el.textContent = text;
  }
}

function alertTrigger(fnName) {
  try {
    alert(`✅ Triggered: ${fnName} — Now running simulation.`);
  } catch (e) {
    // Ignore if alerts are blocked
  }
  logStep(`${fnName} executed.`);
}

function incrementCounter(id, amount = 1) {
  const el = getElement(id);
  if (!el) return;
  const current = parseInt(el.textContent || '0', 10) || 0;
  el.textContent = String(current + amount);
}

// ==== STEP 2: CAMPAIGN GENERATION (Connected to Communication Factory) ====
function generateAllCommunications() {
  alertTrigger('generateAllCommunications');

  const goal = getElement('commGoal')?.value || '';
  const audience = getElement('commAudience')?.value || '';
  const location = getElement('commLocation')?.value || '';
  const tone = getElement('commTone')?.value || getElement('detectedToneText')?.textContent || 'authentic';
  const hook = getElement('commHook')?.value || '';
  const cta = getElement('commCTA')?.value || '';

  const selectedTypes = Array.from(
    document.querySelectorAll('.communication-form .checkbox-grid input[type="checkbox"]:checked')
  ).map((cb) => cb.value);

  const resultsContainerId = 'communicationsResults';

  const summary = `
    <div class="result-summary">
      <h4>Generated Communications</h4>
      <p><strong>Goal</strong>: ${goal || 'N/A'}</p>
      <p><strong>Audience</strong>: ${audience || 'N/A'}</p>
      <p><strong>Location</strong>: ${location || 'N/A'}</p>
      <p><strong>Tone</strong>: ${tone}</p>
      ${hook ? `<p><strong>Hook</strong>: ${hook}</p>` : ''}
      <p><strong>CTA</strong>: ${cta || 'N/A'}</p>
      <p><strong>Types</strong>: ${selectedTypes.join(', ') || 'None selected'}</p>
    </div>
  `;

  const blocks = selectedTypes.map((type) => {
    const titleMap = {
      email: 'Email Draft',
      sms: 'SMS Draft',
      social: 'Social Post',
      flyer: 'Flyer Copy',
      script: 'Phone Script',
      press: 'Press Release'
    };
    const title = titleMap[type] || 'Message';

    const sample = `
      <div class="comm-block">
        <h5>${title}</h5>
        <p><em>Tone</em>: ${tone}</p>
        ${hook ? `<p><em>Hook</em>: ${hook}</p>` : ''}
        <p>
          Dear ${audience || 'neighbor'},<br>
          We’re building a future together in ${location || 'our community'}. ${goal ? `This ${goal} effort needs you.` : 'Your voice matters.'}
          ${cta ? ` ${cta}` : ' Join us today.'}
        </p>
      </div>
    `;
    return sample;
  });

  setHTML(resultsContainerId, `${summary}${blocks.join('')}`);
  incrementCounter('messageCount', Math.max(1, selectedTypes.length));
}

// ==== STEP 3: VOICE MATCHING ====
function selectVoiceType(type) {
  const custom = getElement('customVoiceInputs');
  const standard = getElement('standardVoiceInputs');
  if (type === 'custom') {
    showElement(custom);
    hideElement(standard);
  } else {
    hideElement(custom);
    showElement(standard);
  }
  logStep(`Voice type selected: ${type}`);
}

function analyzeVoiceProfile() {
  alertTrigger('analyzeVoiceProfile');

  const videoUrls = Array.from(document.querySelectorAll('.video-url')).map((i) => i.value).filter(Boolean);
  const zip = getElement('zipCodeForTone')?.value || '';

  let detectedTone = 'authentic';
  if (zip) detectedTone = 'community-focused';
  if (videoUrls.some((u) => /speech|townhall|rally/i.test(u))) detectedTone = 'inspiring';
  if (videoUrls.some((u) => /interview|policy|news/i.test(u))) detectedTone = 'professional';

  setText('detectedToneText', detectedTone);
  setHTML('detectedToneDisplay', `<div class="ai-tone-info"><i class="fas fa-brain"></i> AI-Detected Tone: <strong>${detectedTone}</strong></div>`);

  const voiceSummary = getElement('voiceSummary');
  if (voiceSummary) voiceSummary.textContent = 'Voice profile trained';

  // Reveal Communication Options (Step 2.5)
  showElement(getElement('step2_5'));

  // Also display AI tone area inside Communications tool if present
  const aiToneDisplay = getElement('aiToneDisplay');
  if (aiToneDisplay) showElement(aiToneDisplay);

  logStep(`Detected tone set to: ${detectedTone}`);
}

function saveStandardVoice() {
  alertTrigger('saveStandardVoice');

  const selected = document.querySelector('input[name="voiceStyle"]:checked');
  const style = selected?.value || 'grassroots';

  const toneMap = {
    grassroots: 'authentic',
    policy: 'professional',
    fighter: 'determined'
  };

  const detectedTone = toneMap[style] || 'authentic';
  setText('detectedToneText', detectedTone);
  setHTML('detectedToneDisplay', `<div class="ai-tone-info"><i class=\"fas fa-brain\"></i> AI-Detected Tone: <strong>${detectedTone}</strong></div>`);

  const voiceSummary = getElement('voiceSummary');
  if (voiceSummary) voiceSummary.textContent = 'VoiceShield AI™ active';

  showElement(getElement('step2_5'));
  const aiToneDisplay = getElement('aiToneDisplay');
  if (aiToneDisplay) showElement(aiToneDisplay);
}

// ==== STEP 4: RAPID RESPONSE ANALYSIS ====
function analyzeComment() {
  alertTrigger('analyzeComment');
  const comment = getElement('commentToAnalyze')?.value || '';
  const candidate = getElement('candidateContext')?.value || 'your campaign';

  const recommendations = `
    <div class="rapid-block">
      <h4>EchoShield™ Recommendation</h4>
      <p><em>Context</em>: ${candidate}</p>
      <p><em>Analyzed Comment</em>: ${comment || '[none provided]'}</p>
      <p><strong>Response</strong>: Facts don’t care about disinfo. Here’s the truth and what we’re focused on for our community.</p>
    </div>
  `;

  setHTML('rapidResponseResults', recommendations);
}

// ==== STEP 5: SECTION/STEP TRANSITIONS ====
function showDashboard() {
  hideElement(getElement('intelligenceTools'));
  showElement(getElement('intelligenceDashboard'));
}

function openIntelligenceTool(toolKey) {
  // Hide dashboard and show tools shell
  hideElement(getElement('intelligenceDashboard'));
  showElement(getElement('intelligenceTools'));

  // Hide all tool interfaces
  document.querySelectorAll('.tool-interface').forEach((el) => hideElement(el));

  const toolIdMap = {
    strategy: 'strategyTool',
    communications: 'communicationsTool',
    voter: 'voterTool',
    fundraising: 'fundraisingTool',
    outreach: 'outreachTool',
    response: 'responseTool',
    rapid: 'rapidTool',
    incumbent: 'incumbentTool',
    organization: 'organizationTool'
  };

  const toolId = toolIdMap[toolKey];
  if (toolId) showElement(getElement(toolId));

  const titleMap = {
    strategy: 'Strategic Intelligence',
    communications: 'Communication Factory',
    voter: 'Voter Intelligence',
    fundraising: 'Fundraising Engine',
    outreach: 'Community Outreach',
    response: 'Response System',
    rapid: 'EchoShield™ Response Engine',
    incumbent: 'Incumbent Engagement',
    organization: 'Organization Strategy'
  };

  setText('toolTitle', titleMap[toolKey] || 'Intelligence Tool');
  logStep(`Opened tool: ${toolKey}`);
}

function activateIntelligence() {
  alertTrigger('activateIntelligence');
  hideElement(getElement('campaignSetup'));
  showDashboard();

  // Seed some demo stats
  setText('voterCount', '125,000');
  setText('messageCount', '12');
  setText('efficiencyScore', '87%');
}

// ==== STEP 6: SETUP FLOW HELPERS (CSV/Manual/Location tabs) ====
function showUploadTab(key) {
  const map = {
    csv: 'csvUpload',
    locationQuery: 'locationQueryUpload',
    google: 'googleUpload',
    manual: 'manualUpload'
  };

  const idToShow = map[key];
  if (!idToShow) return;

  document.querySelectorAll('.upload-content').forEach((el) => {
    el.classList.remove('active');
    el.style.display = 'none';
  });

  const target = getElement(idToShow);
  if (target) {
    target.classList.add('active');
    target.style.display = '';
  }

  // Toggle tab button active state if present
  const allTabs = document.querySelectorAll('.upload-tabs .tab-button');
  allTabs.forEach((btn) => btn.classList.remove('active'));
  const idxMap = { csv: 0, locationQuery: 1, google: 2, manual: 3 };
  const idx = idxMap[key];
  if (typeof idx === 'number') {
    const btn = document.querySelectorAll('.upload-tabs .tab-button')[idx];
    if (btn) btn.classList.add('active');
  }

  logStep(`Switched upload tab to: ${key}`);
}

// Questionnaire flow (minimal, simulated)
const officeLevelToTypes = {
  federal: ['U.S. House', 'U.S. Senate'],
  state: ['State House', 'State Senate'],
  local: ['City Council', 'County Council', 'School Board']
};

function selectOfficeLevel(level) {
  const officeLevelStep = getElement('officeLevelStep');
  const stateStep = getElement('stateStep');
  if (officeLevelStep) officeLevelStep.dataset.selectedLevel = level;

  // Populate states minimally to keep it light
  const stateSelect = getElement('stateSelect');
  if (stateSelect && stateSelect.options.length <= 1) {
    const states = ['SC', 'TN', 'GA', 'NC', 'FL', 'AL'];
    states.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      stateSelect.appendChild(opt);
    });
  }

  hideElement(getElement('officeTypeStep'));
  hideElement(getElement('districtStep'));
  showElement(stateStep);
  logStep(`Office level selected: ${level}`);
}

function proceedToOfficeType() {
  const level = getElement('officeLevelStep')?.dataset?.selectedLevel;
  if (!level) return;

  const options = officeLevelToTypes[level] || [];
  const container = getElement('officeTypeOptions');
  if (container) {
    container.innerHTML = options
      .map((label) => `<button class="option-btn" data-office="${label}">${label}</button>`) // listeners attached below
      .join('');

    // Attach listeners
    container.querySelectorAll('button.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => selectOfficeType(btn.dataset.office));
    });
  }

  showElement(getElement('officeTypeStep'));
  hideElement(getElement('districtStep'));
}

function selectOfficeType(typeLabel) {
  const districtSelect = getElement('districtSelect');
  if (districtSelect) {
    districtSelect.innerHTML = '<option value="">Choose your district...</option>';
    const districts = typeLabel.includes('House') ? ['1', '2', '3'] : ['At-Large'];
    districts.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = typeLabel.includes('House') ? `District ${d}` : d;
      districtSelect.appendChild(opt);
    });
  }
  showElement(getElement('districtStep'));
  logStep(`Office type selected: ${typeLabel}`);
}

function proceedToInsightsSection() {
  hideElement(getElement('officeLevelStep'));
  hideElement(getElement('stateStep'));
  hideElement(getElement('officeTypeStep'));
  hideElement(getElement('districtStep'));
  showElement(getElement('insightsStep'));
}

function toggleStatusDetails() {
  const status = getElement('currentStatus')?.value;
  const orgDetails = getElement('organizationDetails');
  if (!orgDetails) return;
  if (status === 'organization') showElement(orgDetails);
  else hideElement(orgDetails);
}

function proceedToDataGeneration() {
  hideElement(getElement('step1'));
  showElement(getElement('step2'));
  logStep('Proceeding to VoiceCraft™ System');
}

function processLocationQuery() {
  alertTrigger('processLocationQuery');
  openIntelligenceTool('strategy');
  const location = getElement('queryLocation')?.value || 'your area';
  setHTML('strategyResults', `<p>Generating strategy for <strong>${location}</strong>... [Simulated]</p>`);
}

function saveManualData() {
  alertTrigger('saveManualData');
  const name = getElement('campaignName')?.value || 'Untitled Campaign';
  const district = getElement('targetDistrict')?.value || 'N/A';
  const issues = getElement('primaryIssues')?.value || 'N/A';
  setText('dataSummary', `${name} • ${district} • Issues: ${issues}`);
}

// ==== STEP 7: OTHER TOOLS (Strategy, Incumbent, Organization) ====
function generateStrategicIntelligence() {
  alertTrigger('generateStrategicIntelligence');
  const location = getElement('strategyLocation')?.value || 'selected location';
  const result = `
    <div class="strategy-block">
      <h4>Strategic Intelligence for ${location}</h4>
      <ul>
        <li>Top Issues: Economy, Education, Public Safety</li>
        <li>Voter Segments: Persuadables 34%, Base 41%, Opposed 25%</li>
        <li>Recommended Tactics: Door-to-door, SMS follow-ups, local radio</li>
      </ul>
    </div>
  `;
  setHTML('strategyResults', result);

  // Seed predictive insights panel
  const insights = getElement('predictiveInsights');
  if (insights) {
    insights.innerHTML = `
      <div class="insight-card"><h5>Turnout Lift</h5><p>+3.2% possible with weekend canvassing</p></div>
      <div class="insight-card"><h5>Donation Window</h5><p>Best conversion Tue–Thu 6–9pm</p></div>
      <div class="insight-card"><h5>Message Match</h5><p>"Jobs + Schools" outperforms by 18%</p></div>
    `;
  }
}

function updateIncumbentOfficeTypes() {
  const level = getElement('incumbentOfficeLevel')?.value || '';
  const typeSelect = getElement('incumbentOfficeType');
  const districtSelect = getElement('incumbentDistrict');
  if (!typeSelect || !districtSelect) return;

  const map = {
    federal: ['U.S. House', 'U.S. Senate'],
    state: ['State House', 'State Senate'],
    local: ['Mayor', 'City Council', 'County Council']
  };

  typeSelect.innerHTML = '<option value="">Choose position...</option>' +
    (map[level] || []).map((t) => `<option value="${t}">${t}</option>`).join('');

  districtSelect.innerHTML = '<option value="">Choose district...</option>' +
    (level === 'federal' ? ['1', '2', '3'].map((d) => `<option value="${d}">District ${d}</option>`).join('') : '<option value="At-Large">At-Large</option>');
}

function generateIncumbentStrategy() {
  alertTrigger('generateIncumbentStrategy');
  const goal = getElement('incumbentGoals')?.value || 're-election';
  setHTML('incumbentResults', `<p>Strategy generated for goal: <strong>${goal}</strong>. [Simulated]</p>`);
}

function generateOrganizationStrategy() {
  alertTrigger('generateOrganizationStrategy');
  const name = getElement('orgName')?.value || 'Your Organization';
  setHTML('organizationResults', `<p>Outreach strategy generated for <strong>${name}</strong>. [Simulated]</p>`);
}

function quickGenerate(type) {
  alertTrigger(`quickGenerate:${type}`);
  openIntelligenceTool('communications');
  setHTML('communicationsResults', `<p>Generated ${type} content using your voice profile. [Simulated]</p>`);
  incrementCounter('messageCount', 1);
}

function configureAI() {
  const statusEl = getElement('aiStatus');
  if (!statusEl) return;
  const isDisabled = /Disabled/i.test(statusEl.textContent || '');
  statusEl.textContent = isDisabled ? 'AI: Enabled (Voice + Tone active)' : 'AI: Disabled (using templates)';
  const toneDisplay = getElement('aiToneDisplay');
  if (toneDisplay) toneDisplay.style.display = isDisabled ? '' : 'none';
}

function displayAnalyticsDashboard() {
  alertTrigger('displayAnalyticsDashboard');
  showDashboard();
  const insights = getElement('predictiveInsights');
  if (insights && insights.scrollIntoView) {
    insights.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ==== STEP 8: FEEDBACK & IP MODAL ====
function showIPNotice() {
  showElement(getElement('ipModal'));
}

function closeIPModal() {
  hideElement(getElement('ipModal'));
}

function submitFeedback() {
  alertTrigger('submitFeedback');
  const wantResponse = getElement('wantResponse')?.checked;
  const email = getElement('feedbackEmail')?.value || '';
  const comment = getElement('feedbackComment')?.value || '';
  logStep(`Feedback submitted. Want response: ${!!wantResponse}. Email: ${email}. Comment length: ${comment.length}`);
}

// ==== STEP 9: DOM READY BINDINGS ====
document.addEventListener('DOMContentLoaded', () => {
  logStep('Script loaded. Attaching enhancements and safe-guards.');

  // Rating stars
  const stars = document.querySelectorAll('.stars i');
  if (stars.length) {
    stars.forEach((star) => {
      star.addEventListener('click', () => {
        const rating = Number(star.getAttribute('data-rating')) || 0;
        stars.forEach((s) => s.classList.toggle('fas', Number(s.getAttribute('data-rating')) <= rating));
        const text = document.querySelector('.rating-text');
        if (text) text.textContent = `You rated: ${rating}/5`;
      });
    });
  }

  // Feedback email visibility
  const wantResponse = getElement('wantResponse');
  if (wantResponse) {
    wantResponse.addEventListener('change', () => {
      const emailInput = getElement('feedbackEmail');
      if (emailInput) emailInput.style.display = wantResponse.checked ? '' : 'none';
    });
  }

  // Initialize defaults
  showUploadTab('csv');
});