/**
 * CampusPulse - Internal Dashboard Application Engine
 * Pure ES6 Object Array Pipeline Management Pattern
 */

// Initial System Hardcoded Memory Profiles
const fallbackSeedDatabase = [
    { id: "e_1", title: "Smart India Internal Hackathon", date: "2026-11-20T09:00", venue: "Sir CV Raman Tech Center", category: "technical" },
    { id: "e_2", title: "Inter-College Cricket Super Cup", date: "2026-11-28T08:30", venue: "University Athletics Pavilion", category: "sports" },
    { id: "e_3", title: "Vibrants Fusion Symphony Night", date: "2026-11-15T18:00", venue: "Main Open Amphitheatre", category: "cultural" }
];

// Memory Stores Sync Channels
let campusEvents = JSON.parse(localStorage.getItem('cp_events')) || fallbackSeedDatabase;
let studentRegistrations = JSON.parse(localStorage.getItem('cp_registrations')) || [];

// Dynamic Application View Layout Context Flags
let currentActiveViewLayout = "grid"; 
let activeFilteredCategory = "all";

// DOM Anchors Reference Maps
const searchBar = document.getElementById('searchBar');
const sortOrder = document.getElementById('sortOrder');
const categoryTabs = document.getElementById('categoryTabs');

const gridLayoutViewport = document.getElementById('gridLayoutViewport');
const tableLayoutViewport = document.getElementById('tableLayoutViewport');

const viewGridBtn = document.getElementById('viewGridBtn');
const viewTableBtn = document.getElementById('viewTableBtn');

/**
 * Pipeline Execution Engine: Transform, Sort & Print Viewports
 */
function compileAndRenderDashboardEcosystem() {
    const rawSearchQuery = searchBar.value.toLowerCase().trim();
    const activeSortSetting = sortOrder.value;

    // Filter Step 1 & 2: Categorical Matches & Query String Hits
    let calculatedPipelineList = campusEvents.filter(item => {
        const matchesCategory = activeFilteredCategory === 'all' || item.category === activeFilteredCategory;
        const matchesSearch = item.title.toLowerCase().includes(rawSearchQuery) || item.venue.toLowerCase().includes(rawSearchQuery);
        return matchesCategory && matchesSearch;
    });

    // Sort Step 3: Date Chronological Ordering Evaluations
    calculatedPipelineList.sort((nodeA, nodeB) => {
        const epochA = new Date(nodeA.date).getTime();
        const epochB = new Date(nodeB.date).getTime();
        return activeSortSetting === 'soonest' ? epochA - epochB : epochB - epochA;
    });

    // Update Counter Widgets Metrics Box Data Objects
    updateApplicationMetricsCounters();

    // Render Fork: Grid Template vs Data Table Layout Map
    if (currentActiveViewLayout === "grid") {
        renderCardGridViewport(calculatedPipelineList);
    } else {
        renderDenseTableViewport(calculatedPipelineList);
    }
}

/**
 * Grid Presentation Element Renderer
 */
function renderCardGridViewport(dataset) {
    tableLayoutViewport.classList.remove('active');
    gridLayoutViewport.classList.add('active');
    gridLayoutViewport.innerHTML = '';

    if (dataset.length === 0) {
        gridLayoutViewport.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted); font-size: 0.95rem;">No campus events match your active filtering variables.</p>`;
        return;
    }

    dataset.forEach(evt => {
        const timeLabel = formatTimestampSystem(evt.date);
        const cardNode = document.createElement('div');
        cardNode.className = 'event-board-card';
        cardNode.innerHTML = `
            <div>
                <span class="badge badge-${evt.category}">${evt.category}</span>
                <h4 class="card-heading">${evt.title}</h4>
                <div class="info-item"><span>📅</span> ${timeLabel}</div>
                <div class="info-item"><span>📍</span> ${evt.venue}</div>
            </div>
            <div class="card-action-bar">
                <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="launchRegistrationWorkflow('${evt.id}', '${evt.title.replace(/'/g, "\\'")}')">Get Entry Pass</button>
            </div>
        `;
        gridLayoutViewport.appendChild(cardNode);
    });
}

/**
 * List/Table Presentation Element Renderer
 */
function renderDenseTableViewport(dataset) {
    gridLayoutViewport.classList.remove('active');
    tableLayoutViewport.classList.add('active');
    tableLayoutViewport.innerHTML = '';

    if (dataset.length === 0) {
        tableLayoutViewport.innerHTML = `<p style="text-align:center; padding:3rem; color:var(--text-muted); font-size: 0.95rem;">No campus events match your active filtering variables.</p>`;
        return;
    }

    const tableWrapper = document.createElement('table');
    tableWrapper.className = 'data-table';
    tableWrapper.innerHTML = `
        <thead>
            <tr>
                <th>Classification</th>
                <th>Event Gathering Name</th>
                <th>Scheduled Date & Time</th>
                <th>Location Venue</th>
                <th style="text-align:right;">Actions Terminal</th>
            </tr>
        </thead>
        <tbody id="tableBodyAnchor"></tbody>
    `;
    tableLayoutViewport.appendChild(tableWrapper);

    const tbody = document.getElementById('tableBodyAnchor');
    dataset.forEach(evt => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="badge badge-${evt.category}" style="margin:0;">${evt.category}</span></td>
            <td style="font-weight:600;">${evt.title}</td>
            <td>${formatTimestampSystem(evt.date)}</td>
            <td>${evt.venue}</td>
            <td style="text-align:right;">
                <button class="btn btn-secondary" onclick="launchRegistrationWorkflow('${evt.id}', '${evt.title.replace(/'/g, "\\'")}')">Register</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * UI State Analytics Dashboard Counters Engine
 */
function updateApplicationMetricsCounters() {
    document.getElementById('countTotal').innerText = campusEvents.length;
    document.getElementById('countTech').innerText = campusEvents.filter(x => x.category === 'technical').length;
    document.getElementById('countMixed').innerText = campusEvents.filter(x => x.category !== 'technical').length;
    document.getElementById('countRegs').innerText = studentRegistrations.length;
}

/**
 * Date Handler Utility Format Function
 */
function formatTimestampSystem(isoString) {
    return new Date(isoString).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
    });
}

/**
 * Interface Controls Observer Mappings Setup
 */
categoryTabs.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tab-item')) return;
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    activeFilteredCategory = e.target.getAttribute('data-category');
    compileAndRenderDashboardEcosystem();
});

[searchBar, sortOrder].forEach(element => {
    element.addEventListener('input', compileAndRenderDashboardEcosystem);
});

// View Toggle Trigger Event Configurations
viewGridBtn.addEventListener('click', () => {
    viewTableBtn.classList.remove('active');
    viewGridBtn.classList.add('active');
    currentActiveViewLayout = "grid";
    compileAndRenderDashboardEcosystem();
});

viewTableBtn.addEventListener('click', () => {
    viewGridBtn.classList.remove('active');
    viewTableBtn.classList.add('active');
    currentActiveViewLayout = "table";
    compileAndRenderDashboardEcosystem();
});

/**
 * Modal Visibility System Workflow Controls
 */
document.getElementById('openCreateModalBtn').addEventListener('click', () => {
    document.getElementById('createEventModal').classList.add('active');
});

document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const targetModalId = this.getAttribute('data-modal');
        document.getElementById(targetModalId).classList.remove('active');
        if (targetModalId === 'createEventModal') document.getElementById('eventCreationForm').reset();
    });
});

// New Event Entry Publishing Core Workflow Action
document.getElementById('eventCreationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newEventObj = {
        id: 'evt_id_' + Date.now().toString(36),
        title: document.getElementById('eventTitle').value.trim(),
        date: document.getElementById('eventDate').value,
        category: document.getElementById('eventCategory').value,
        venue: document.getElementById('eventVenue').value.trim()
    };
    campusEvents.push(newEventObj);
    localStorage.setItem('cp_events', JSON.stringify(campusEvents));
    document.getElementById('createEventModal').classList.remove('active');
    this.reset();
    compileAndRenderDashboardEcosystem();
});

/**
 * Validation Subsystem: Student Signups Form Submits Guard Check
 */
function launchRegistrationWorkflow(id, title) {
    document.getElementById('targetEventId').value = id;
    document.getElementById('modalEventTitle').innerText = `Secure Ticket: ${title}`;
    document.getElementById('registrationModal').classList.add('active');
}

document.getElementById('studentRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear validation error highlights flags
    ['nameFieldGroup', 'emailFieldGroup', 'rollFieldGroup'].forEach(id => {
        document.getElementById(id).classList.remove('invalid');
    });

    const nameNode = document.getElementById('studentName');
    const emailNode = document.getElementById('studentEmail');
    const rollNode = document.getElementById('studentRoll');

    let isPayloadValid = true;
    const regexEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexAlphanumericRoll = /^[a-zA-Z0-9]{5,12}$/;
if (nameNode.value.trim().length < 3) {
document.getElementById('nameFieldGroup').classList.add('invalid');
isPayloadValid = false;
}
if (!regexEmailFormat.test(emailNode.value.trim())) {
document.getElementById('emailFieldGroup').classList.add('invalid');
isPayloadValid = false;
}
if (!regexAlphanumericRoll.test(rollNode.value.trim())) {
document.getElementById('rollFieldGroup').classList.add('invalid');
isPayloadValid = false;
}
if (isPayloadValid) {
const formalSignupReceipt = {
receiptId: 'rec_' + Date.now().toString(36),
eventId: document.getElementById('targetEventId').value,
studentName: nameNode.value.trim(),
studentEmail: emailNode.value.trim(),
studentRoll: rollNode.value.trim().toUpperCase()
};
studentRegistrations.push(formalSignupReceipt);
localStorage.setItem('cp_registrations', JSON.stringify(studentRegistrations));
alert("Success! Entry registration receipt saved securely for " + formalSignupReceipt.studentName + ".");
document.getElementById('registrationModal').classList.remove('active');
this.reset();
updateApplicationMetricsCounters();
}
});
// App Bootstrap Init Execution Lifecycle Call
window.addEventListener('DOMContentLoaded', compileAndRenderDashboardEcosystem);