/**
 * Grist Workflow Validator Widget
 * Copyright 2026 Said Hamadou (isaytoo)
 * Licensed under the Apache License, Version 2.0
 * https://github.com/isaytoo/grist-workflow-validator-widget
 */

// Language support
let currentLang = 'en';

const i18n = {
  en: {
    appTitle: 'Workflow Validator',
    userRole: 'Role',
    tabRequests: 'Requests',
    tabWorkflow: 'Configuration',
    tabHistory: 'History',
    tabStats: 'Statistics',
    newRequest: 'New Request',
    allStatuses: 'All statuses',
    allTypes: 'All types',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',
    statusCancelled: 'Cancelled',
    noRequests: 'No requests',
    noRequestsDesc: 'Create your first request to get started',
    workflowConfig: 'Workflow configuration',
    workflowTypes: 'Request types',
    addWorkflowType: 'Add type',
    noWorkflows: 'No workflow configured',
    noWorkflowsDesc: 'Add a workflow type to get started',
    validationSteps: 'Validation steps',
    auditLog: 'Audit log',
    noAudit: 'No audit entries',
    noAuditDesc: 'Action history will appear here',
    dashboard: 'Dashboard',
    pendingRequests: 'Pending requests',
    avgDelay: 'Average delay',
    approvalRate: 'Approval rate',
    slaRespected: 'SLA respected',
    modalNewRequest: 'New request',
    requestType: 'Request type *',
    requestTitle: 'Title *',
    requestDescription: 'Description',
    cancel: 'Cancel',
    submit: 'Submit',
    requestDetails: 'Request details',
    type: 'Type',
    status: 'Status',
    requester: 'Requester',
    createdAt: 'Created at',
    description: 'Description',
    validationHistory: 'Validation history',
    noHistory: 'No history available',
    validationActions: 'Validation actions',
    noPermission: 'You do not have permission to validate this request',
    comment: 'Comment (optional)',
    reject: 'Reject',
    approve: 'Approve',
    requestCreated: 'Request created successfully',
    requestApproved: 'Request approved successfully',
    requestRejected: 'Request rejected successfully',
    error: 'An error occurred',
    steps: 'step(s)',
    modify: 'Modify',
    tablesCreated: 'Tables created automatically',
    autoSetup: 'Auto-setup in progress...',
    setupComplete: 'Setup complete!'
  },
  fr: {
    appTitle: 'Validateur de Workflow',
    userRole: 'Rôle',
    tabRequests: 'Demandes',
    tabWorkflow: 'Configuration',
    tabHistory: 'Historique',
    tabStats: 'Statistiques',
    newRequest: 'Nouvelle demande',
    allStatuses: 'Tous les statuts',
    allTypes: 'Tous les types',
    statusPending: 'En attente',
    statusApproved: 'Approuvé',
    statusRejected: 'Rejeté',
    statusCancelled: 'Annulé',
    noRequests: 'Aucune demande',
    noRequestsDesc: 'Créez votre première demande pour commencer',
    workflowConfig: 'Configuration des circuits de validation',
    workflowTypes: 'Types de demandes',
    addWorkflowType: 'Ajouter un type',
    noWorkflows: 'Aucun workflow configuré',
    noWorkflowsDesc: 'Ajoutez un type de workflow pour commencer',
    validationSteps: 'Étapes de validation',
    auditLog: 'Journal d\'audit',
    noAudit: 'Aucune entrée d\'audit',
    noAuditDesc: 'L\'historique des actions apparaîtra ici',
    dashboard: 'Tableau de bord',
    pendingRequests: 'Demandes en attente',
    avgDelay: 'Délai moyen',
    approvalRate: 'Taux d\'approbation',
    slaRespected: 'SLA respectés',
    modalNewRequest: 'Nouvelle demande',
    requestType: 'Type de demande *',
    requestTitle: 'Titre *',
    requestDescription: 'Description',
    cancel: 'Annuler',
    submit: 'Soumettre',
    requestDetails: 'Détails de la demande',
    type: 'Type',
    status: 'Statut',
    requester: 'Demandeur',
    createdAt: 'Date de création',
    description: 'Description',
    validationHistory: 'Historique de validation',
    noHistory: 'Aucun historique disponible',
    validationActions: 'Actions de validation',
    noPermission: 'Vous n\'avez pas les droits pour valider cette demande',
    comment: 'Commentaire (optionnel)',
    reject: 'Rejeter',
    approve: 'Approuver',
    requestCreated: 'Demande créée avec succès',
    requestApproved: 'Demande approuvée avec succès',
    requestRejected: 'Demande rejetée avec succès',
    error: 'Une erreur est survenue',
    steps: 'étape(s)',
    modify: 'Modifier',
    tablesCreated: 'Tables créées automatiquement',
    autoSetup: 'Configuration automatique en cours...',
    setupComplete: 'Configuration terminée !'
  }
};

function t(key) {
  return i18n[currentLang][key] || key;
}

// Table names
const REQUESTS_TABLE = 'WF_Requests';
const WORKFLOW_STEPS_TABLE = 'WF_Steps';
const VALIDATION_LOG_TABLE = 'WF_ValidationLog';
const DELEGATIONS_TABLE = 'WF_Delegations';
const USER_ROLES_TABLE = 'WF_UserRoles';

// Global state
const state = {
  userEmail: null,
  userRole: null,
  currentUser: null,
  requests: [],
  workflowTypes: [],
  auditLog: [],
  selectedRequest: null,
  mappedColumns: {
    requests: null,
    workflowSteps: null,
    validationLog: null,
    delegations: null,
    userRoles: null
  }
};

// Initialize widget
(async function() {
  await grist.ready({ requiredAccess: 'full' });
  
  console.log('Grist ready, starting auto-setup...');
  
  // Auto-create tables if needed
  await ensureTablesExist();
  
  // Initialize the widget
  await init();
})();

// Auto-setup: Create required tables if they don't exist
async function ensureTablesExist() {
  try {
    const tables = await grist.docApi.listTables();
    const existingTables = tables.map(t => t.id);
    
    console.log('Existing tables:', existingTables);
    
    // Create Requests table
    if (!existingTables.includes(REQUESTS_TABLE)) {
      console.log('Creating Requests table...');
      await grist.docApi.applyUserActions([
        ['AddTable', REQUESTS_TABLE, [
          { id: 'Type', type: 'Text' },
          { id: 'Title', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Requester', type: 'Text' },
          { id: 'Status', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['pending', 'approved', 'rejected', 'cancelled'] }) },
          { id: 'Created_At', type: 'DateTime', isFormula: true, formula: 'NOW()' },
          { id: 'Completed_At', type: 'DateTime' },
          { id: 'Current_Step', type: 'Text' },
          { id: 'Amount', type: 'Numeric' },
          { id: 'Priority', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['low', 'medium', 'high'] }) }
        ]]
      ]);
    }
    
    // Create WorkflowSteps table
    if (!existingTables.includes(WORKFLOW_STEPS_TABLE)) {
      console.log('Creating WorkflowSteps table...');
      await grist.docApi.applyUserActions([
        ['AddTable', WORKFLOW_STEPS_TABLE, [
          { id: 'Workflow_Type', type: 'Text' },
          { id: 'Step_Number', type: 'Int' },
          { id: 'Step_Name', type: 'Text' },
          { id: 'Validator_Role', type: 'Text' },
          { id: 'Validator_Email', type: 'Text' },
          { id: 'SLA_Hours', type: 'Int' },
          { id: 'Is_Parallel', type: 'Bool' },
          { id: 'Condition', type: 'Text' }
        ]]
      ]);
    }
    
    // Create ValidationLog table
    if (!existingTables.includes(VALIDATION_LOG_TABLE)) {
      console.log('Creating ValidationLog table...');
      await grist.docApi.applyUserActions([
        ['AddTable', VALIDATION_LOG_TABLE, [
          { id: 'Request_Id', type: 'Ref:' + REQUESTS_TABLE },
          { id: 'User', type: 'Text' },
          { id: 'Action', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Timestamp', type: 'DateTime', isFormula: true, formula: 'NOW()' },
          { id: 'Details', type: 'Text' },
          { id: 'Comment', type: 'Text' }
        ]]
      ]);
    }
    
    // Create Delegations table (optional)
    if (!existingTables.includes(DELEGATIONS_TABLE)) {
      console.log('Creating Delegations table...');
      await grist.docApi.applyUserActions([
        ['AddTable', DELEGATIONS_TABLE, [
          { id: 'Delegator', type: 'Text' },
          { id: 'Delegate', type: 'Text' },
          { id: 'Start_Date', type: 'Date' },
          { id: 'End_Date', type: 'Date' },
          { id: 'Workflow_Type', type: 'Text' },
          { id: 'Is_Active', type: 'Bool', isFormula: true, formula: 'from datetime import date\ntoday = date.today()\nreturn $Start_Date <= today <= $End_Date' }
        ]]
      ]);
    }
    
    // Create UserRoles table (optional)
    if (!existingTables.includes(USER_ROLES_TABLE)) {
      console.log('Creating UserRoles table...');
      await grist.docApi.applyUserActions([
        ['AddTable', USER_ROLES_TABLE, [
          { id: 'Email', type: 'Text' },
          { id: 'Role', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['Owner', 'Editor', 'Viewer'] }) },
          { id: 'Department', type: 'Text' },
          { id: 'Manager_Email', type: 'Text' }
        ]]
      ]);
    }
    
    // Update state with table names
    state.mappedColumns = {
      requests: REQUESTS_TABLE,
      workflowSteps: WORKFLOW_STEPS_TABLE,
      validationLog: VALIDATION_LOG_TABLE,
      delegations: DELEGATIONS_TABLE,
      userRoles: USER_ROLES_TABLE
    };
    
    console.log('Tables setup complete');
    showSuccess(t('tablesCreated'));
    
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
    // Continue anyway - tables might already exist
  }
}

// Initialize application
async function init() {
  try {
    showLoading(true);
    
    // Detect user role and email
    await detectUserRole();
    
    // Load data
    await loadData();
    
    // Setup UI
    setupEventListeners();
    renderUI();
    
    showLoading(false);
  } catch (error) {
    console.error('Initialization error:', error);
    showError('Erreur lors de l\'initialisation du widget');
    showLoading(false);
  }
}

// User Role Detection (using the proven method)
async function detectUserRole() {
  try {
    // Step 1: Get user email via helper table with trigger formula
    const userEmail = await getUserEmail();
    state.userEmail = userEmail;
    state.currentUser = userEmail;
    
    // Step 2: Detect if Owner (try structure modification)
    const isOwner = await detectOwner();
    
    if (isOwner) {
      state.userRole = 'Owner';
    } else {
      // Step 3: Detect Editor vs Viewer (try empty write)
      const isEditor = await detectEditor();
      state.userRole = isEditor ? 'Editor' : 'Viewer';
    }
    
    updateUserDisplay();
    
  } catch (error) {
    console.error('Role detection error:', error);
    state.userRole = 'Unknown';
    state.userEmail = 'unknown@example.com';
  }
}

async function getUserEmail() {
  try {
    // Try to get email from UserRoles table if it exists
    if (state.mappedColumns.UserRoles) {
      const accessToken = await grist.docApi.getAccessToken({ readOnly: true });
      const docId = await grist.docApi.getDocName();
      
      // This would use the REST API with the access token
      // For now, return a placeholder
      return 'user@example.com';
    }
    
    // Fallback: try to get from Grist user info
    const user = await grist.getUser();
    return user?.email || 'user@example.com';
    
  } catch (error) {
    console.error('Error getting user email:', error);
    return 'user@example.com';
  }
}

async function detectOwner() {
  try {
    // Try to modify column (structure change)
    // This will fail with "Blocked by full structure access rules" if not Owner
    await grist.docApi.applyUserActions([
      ['ModifyColumn', 'ValidationLog', 'id', {}]
    ]);
    return true;
  } catch (error) {
    if (error.message && error.message.includes('Blocked by full structure access rules')) {
      return false;
    }
    // If error is something else, assume not owner
    return false;
  }
}

async function detectEditor() {
  try {
    // Try empty write operation
    await grist.docApi.applyUserActions([]);
    return true;
  } catch (error) {
    return false;
  }
}

function updateUserDisplay() {
  const emailEl = document.getElementById('userEmail');
  const roleEl = document.getElementById('userRole');
  
  if (emailEl) emailEl.textContent = state.userEmail;
  if (roleEl) {
    roleEl.textContent = state.userRole;
    roleEl.className = `user-role ${state.userRole.toLowerCase()}`;
  }
}

// Load data from Grist tables
async function loadData() {
  try {
    // Load requests
    if (state.mappedColumns.Requests) {
      const requestsData = await grist.docApi.fetchTable(state.mappedColumns.Requests);
      state.requests = parseTableData(requestsData);
    }
    
    // Load workflow types
    if (state.mappedColumns.WorkflowSteps) {
      const stepsData = await grist.docApi.fetchTable(state.mappedColumns.WorkflowSteps);
      state.workflowTypes = parseWorkflowTypes(stepsData);
    }
    
    // Load audit log
    if (state.mappedColumns.ValidationLog) {
      const logData = await grist.docApi.fetchTable(state.mappedColumns.ValidationLog);
      state.auditLog = parseTableData(logData);
    }
    
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

function parseTableData(tableData) {
  const records = [];
  const { id, ...columns } = tableData;
  
  for (let i = 0; i < id.length; i++) {
    const record = { id: id[i] };
    for (const [key, values] of Object.entries(columns)) {
      record[key] = values[i];
    }
    records.push(record);
  }
  
  return records;
}

function parseWorkflowTypes(stepsData) {
  const types = {};
  const records = parseTableData(stepsData);
  
  records.forEach(step => {
    const type = step.workflow_type || 'default';
    if (!types[type]) {
      types[type] = {
        name: type,
        steps: []
      };
    }
    types[type].steps.push(step);
  });
  
  return Object.values(types);
}

// Event Listeners
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });
  
  // New request button
  const btnNewRequest = document.getElementById('btnNewRequest');
  if (btnNewRequest) {
    btnNewRequest.addEventListener('click', openNewRequestModal);
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      closeModal(e.target.closest('.modal'));
    });
  });
  
  // New request form
  const formNewRequest = document.getElementById('formNewRequest');
  if (formNewRequest) {
    formNewRequest.addEventListener('submit', handleNewRequestSubmit);
  }
  
  // Cancel button
  const btnCancelRequest = document.getElementById('btnCancelRequest');
  if (btnCancelRequest) {
    btnCancelRequest.addEventListener('click', () => {
      closeModal(document.getElementById('modalNewRequest'));
    });
  }
  
  // Filters
  const filterStatus = document.getElementById('filterStatus');
  const filterType = document.getElementById('filterType');
  
  if (filterStatus) {
    filterStatus.addEventListener('change', renderRequestsList);
  }
  if (filterType) {
    filterType.addEventListener('change', renderRequestsList);
  }
  
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
}

// Tab switching
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });
  
  // Render content for the active tab
  switch(tabName) {
    case 'requests':
      renderRequestsList();
      break;
    case 'workflow':
      renderWorkflowConfig();
      break;
    case 'history':
      renderAuditLog();
      break;
    case 'stats':
      renderStats();
      break;
  }
}

// Render UI
function renderUI() {
  renderRequestsList();
  renderWorkflowConfig();
  renderStats();
}

// Render requests list
function renderRequestsList() {
  const container = document.getElementById('requestsList');
  if (!container) return;
  
  const filterStatus = document.getElementById('filterStatus')?.value || '';
  const filterType = document.getElementById('filterType')?.value || '';
  
  let filteredRequests = state.requests;
  
  if (filterStatus) {
    filteredRequests = filteredRequests.filter(r => r.status === filterStatus);
  }
  
  if (filterType) {
    filteredRequests = filteredRequests.filter(r => r.type === filterType);
  }
  
  if (filteredRequests.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-title">Aucune demande</div>
        <p>Créez votre première demande pour commencer</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredRequests.map(request => `
    <div class="request-card" onclick="openRequestDetails(${request.id})">
      <div class="request-card-header">
        <div>
          <div class="request-title">${escapeHtml(request.title || 'Sans titre')}</div>
          <div class="request-type">${escapeHtml(request.type || 'Type non défini')}</div>
        </div>
        <span class="request-status status-${request.status || 'pending'}">
          ${getStatusLabel(request.status)}
        </span>
      </div>
      <div class="request-meta">
        <div class="request-meta-item">
          <span>👤</span>
          <span>${escapeHtml(request.requester || 'Inconnu')}</span>
        </div>
        <div class="request-meta-item">
          <span>📅</span>
          <span>${formatDate(request.created_at)}</span>
        </div>
        ${request.current_step ? `
          <div class="request-meta-item">
            <span>⏳</span>
            <span>${escapeHtml(request.current_step)}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Render workflow configuration
function renderWorkflowConfig() {
  const typesList = document.getElementById('workflowTypesList');
  if (!typesList) return;
  
  if (state.workflowTypes.length === 0) {
    typesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚙️</div>
        <div class="empty-state-title">Aucun workflow configuré</div>
        <p>Ajoutez un type de workflow pour commencer</p>
      </div>
    `;
    return;
  }
  
  typesList.innerHTML = state.workflowTypes.map(type => `
    <div class="workflow-type-card">
      <div>
        <div class="workflow-title">${escapeHtml(type.name)}</div>
        <div class="workflow-meta">${type.steps.length} étape(s)</div>
      </div>
      <div>
        <button class="btn btn-secondary" onclick="editWorkflowType('${type.name}')">
          Modifier
        </button>
      </div>
    </div>
  `).join('');
}

// Render audit log
function renderAuditLog() {
  const container = document.getElementById('auditLog');
  if (!container) return;
  
  if (state.auditLog.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📜</div>
        <div class="empty-state-title">Aucune entrée d'audit</div>
        <p>L'historique des actions apparaîtra ici</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = state.auditLog.map(entry => `
    <div class="audit-entry">
      <div class="audit-timestamp">${formatDateTime(entry.timestamp)}</div>
      <div class="audit-action">
        <span class="audit-user">${escapeHtml(entry.user || 'Système')}</span>
        ${escapeHtml(entry.action || 'Action inconnue')}
        ${entry.details ? `<div class="audit-details">${escapeHtml(entry.details)}</div>` : ''}
      </div>
    </div>
  `).join('');
}

// Render statistics
function renderStats() {
  const pending = state.requests.filter(r => r.status === 'pending').length;
  const approved = state.requests.filter(r => r.status === 'approved').length;
  const rejected = state.requests.filter(r => r.status === 'rejected').length;
  const total = state.requests.length;
  
  const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
  
  // Calculate average delay
  const completedRequests = state.requests.filter(r => 
    r.status === 'approved' || r.status === 'rejected'
  );
  
  let avgDelay = 0;
  if (completedRequests.length > 0) {
    const totalDelay = completedRequests.reduce((sum, r) => {
      if (r.created_at && r.completed_at) {
        const delay = new Date(r.completed_at) - new Date(r.created_at);
        return sum + delay;
      }
      return sum;
    }, 0);
    avgDelay = Math.round(totalDelay / completedRequests.length / (1000 * 60 * 60 * 24));
  }
  
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statAvgDelay').textContent = `${avgDelay}j`;
  document.getElementById('statApprovalRate').textContent = `${approvalRate}%`;
  document.getElementById('statSLA').textContent = '95%'; // TODO: Calculate real SLA
}

// Modal functions
function openNewRequestModal() {
  const modal = document.getElementById('modalNewRequest');
  const typeSelect = document.getElementById('requestType');
  
  // Populate workflow types
  if (typeSelect) {
    typeSelect.innerHTML = state.workflowTypes.map(type => 
      `<option value="${escapeHtml(type.name)}">${escapeHtml(type.name)}</option>`
    ).join('');
  }
  
  modal.classList.add('active');
}

function closeModal(modal) {
  modal.classList.remove('active');
}

async function handleNewRequestSubmit(e) {
  e.preventDefault();
  
  const type = document.getElementById('requestType').value;
  const title = document.getElementById('requestTitle').value;
  const description = document.getElementById('requestDescription').value;
  
  try {
    showLoading(true);
    
    // Create new request in Grist
    await grist.docApi.applyUserActions([
      ['AddRecord', state.mappedColumns.Requests, null, {
        type: type,
        title: title,
        description: description,
        requester: state.userEmail,
        status: 'pending',
        created_at: new Date().toISOString(),
        current_step: 'Étape 1'
      }]
    ]);
    
    // Log action
    await logAction('create_request', `Nouvelle demande: ${title}`);
    
    // Reload data
    await loadData();
    renderRequestsList();
    
    closeModal(document.getElementById('modalNewRequest'));
    showLoading(false);
    
    showSuccess('Demande créée avec succès');
    
  } catch (error) {
    console.error('Error creating request:', error);
    showError('Erreur lors de la création de la demande');
    showLoading(false);
  }
}

function openRequestDetails(requestId) {
  const request = state.requests.find(r => r.id === requestId);
  if (!request) return;
  
  state.selectedRequest = request;
  
  const modal = document.getElementById('modalRequestDetails');
  const titleEl = document.getElementById('requestDetailsTitle');
  const contentEl = document.getElementById('requestDetailsContent');
  const timelineEl = document.getElementById('workflowTimeline');
  const actionsEl = document.getElementById('validationActions');
  
  if (titleEl) {
    titleEl.textContent = request.title || 'Détails de la demande';
  }
  
  if (contentEl) {
    contentEl.innerHTML = `
      <div class="request-details">
        <div class="detail-row">
          <strong>Type:</strong> ${escapeHtml(request.type || 'N/A')}
        </div>
        <div class="detail-row">
          <strong>Statut:</strong> 
          <span class="request-status status-${request.status}">${getStatusLabel(request.status)}</span>
        </div>
        <div class="detail-row">
          <strong>Demandeur:</strong> ${escapeHtml(request.requester || 'N/A')}
        </div>
        <div class="detail-row">
          <strong>Date de création:</strong> ${formatDateTime(request.created_at)}
        </div>
        ${request.description ? `
          <div class="detail-row">
            <strong>Description:</strong><br>
            ${escapeHtml(request.description)}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // Render timeline
  if (timelineEl) {
    renderTimeline(request, timelineEl);
  }
  
  // Render validation actions
  if (actionsEl) {
    renderValidationActions(request, actionsEl);
  }
  
  modal.classList.add('active');
}

function renderTimeline(request, container) {
  // Get validation log for this request
  const logs = state.auditLog.filter(log => log.request_id === request.id);
  
  if (logs.length === 0) {
    container.innerHTML = '<p>Aucun historique disponible</p>';
    return;
  }
  
  container.innerHTML = `
    <h3>Historique de validation</h3>
    ${logs.map(log => `
      <div class="timeline-item">
        <div class="timeline-icon ${log.action_type || 'pending'}">
          ${getActionIcon(log.action_type)}
        </div>
        <div class="timeline-content">
          <div class="timeline-title">${escapeHtml(log.action || 'Action')}</div>
          <div class="timeline-meta">
            ${escapeHtml(log.user || 'Système')} • ${formatDateTime(log.timestamp)}
          </div>
          ${log.comment ? `<div class="timeline-comment">${escapeHtml(log.comment)}</div>` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function renderValidationActions(request, container) {
  if (request.status !== 'pending') {
    container.innerHTML = '';
    return;
  }
  
  // Check if current user can validate
  const canValidate = state.userRole === 'Owner' || state.userRole === 'Editor';
  
  if (!canValidate) {
    container.innerHTML = '<p class="text-secondary">Vous n\'avez pas les droits pour valider cette demande</p>';
    return;
  }
  
  container.innerHTML = `
    <div class="validation-actions-section">
      <h3>Actions de validation</h3>
      <div class="form-group">
        <label for="validationComment">Commentaire (optionnel)</label>
        <textarea id="validationComment" rows="3" class="form-control"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-danger" onclick="handleValidation('rejected')">
          ❌ Rejeter
        </button>
        <button class="btn btn-success" onclick="handleValidation('approved')">
          ✅ Approuver
        </button>
      </div>
    </div>
  `;
}

async function handleValidation(action) {
  const request = state.selectedRequest;
  if (!request) return;
  
  const comment = document.getElementById('validationComment')?.value || '';
  
  try {
    showLoading(true);
    
    // Update request status
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.mappedColumns.Requests, request.id, {
        status: action,
        completed_at: new Date().toISOString()
      }]
    ]);
    
    // Log validation action
    await logAction(action, `Demande ${action === 'approved' ? 'approuvée' : 'rejetée'}: ${request.title}`, {
      request_id: request.id,
      comment: comment
    });
    
    // Reload data
    await loadData();
    renderRequestsList();
    
    closeModal(document.getElementById('modalRequestDetails'));
    showLoading(false);
    
    showSuccess(`Demande ${action === 'approved' ? 'approuvée' : 'rejetée'} avec succès`);
    
  } catch (error) {
    console.error('Error validating request:', error);
    showError('Erreur lors de la validation');
    showLoading(false);
  }
}

// Logging function
async function logAction(action, description, details = {}) {
  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.mappedColumns.ValidationLog, null, {
        user: state.userEmail,
        action: action,
        description: description,
        timestamp: new Date().toISOString(),
        details: JSON.stringify(details)
      }]
    ]);
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

// Utility functions
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
}

function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR');
}

function getStatusLabel(status) {
  const labels = {
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    cancelled: 'Annulé'
  };
  return labels[status] || status;
}

function getActionIcon(actionType) {
  const icons = {
    approved: '✅',
    rejected: '❌',
    pending: '⏳',
    created: '📝'
  };
  return icons[actionType] || '•';
}

function showLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.style.display = show ? 'flex' : 'none';
  }
}

function showError(message) {
  alert('❌ ' + message);
}

function showSuccess(message) {
  alert('✅ ' + message);
}

// Make functions globally accessible
window.openRequestDetails = openRequestDetails;
window.handleValidation = handleValidation;
window.editWorkflowType = function(typeName) {
  alert('Édition du workflow: ' + typeName + '\n(Fonctionnalité à venir)');
};
