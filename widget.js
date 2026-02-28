/**
 * Grist Workflow Validator Widget
 * Copyright 2026 Said Hamadou (isaytoo)
 * Licensed under the Apache License, Version 2.0
 * https://github.com/isaytoo/grist-workflow-validator-widget
 */

console.log('Workflow Validator Widget: Script loaded');

// Language support
let currentLang = 'fr';

const i18n = {
  en: {
    appTitle: 'Workflow Validator',
    userRole: 'Role',
    tabRequests: 'Requests',
    tabWorkflow: 'Configuration',
    tabHistory: 'History',
    tabStats: 'Statistics',
    tabGuide: '📖 Guide',
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
    setupComplete: 'Setup complete!',
    guideTitle: 'User Guide - Workflow Validator',
    guideIntro: 'Complete guide to use the Workflow Validator widget',
    guideQuickStart: 'Quick Start',
    guideQuickStartContent: `
      <h3>Installation (Already done! ✅)</h3>
      <p>The widget is already installed and the 5 required tables have been created automatically:</p>
      <ul>
        <li><strong>WF_Requests</strong> - Validation requests</li>
        <li><strong>WF_Steps</strong> - Workflow configuration</li>
        <li><strong>WF_ValidationLog</strong> - Audit trail</li>
        <li><strong>WF_Delegations</strong> - Delegation management</li>
        <li><strong>WF_UserRoles</strong> - User roles</li>
      </ul>
    `,
    guideWorkflow: 'Configure a Workflow',
    guideWorkflowContent: `
      <h3>Example: Expense Report (3 levels)</h3>
      <p>Go to the <strong>WF_Steps</strong> table and add these rows:</p>
      <table class="guide-table">
        <tr><th>Workflow_Type</th><th>Step_Number</th><th>Step_Name</th><th>Validator_Email</th><th>SLA_Hours</th><th>Condition</th></tr>
        <tr><td>Expense Report</td><td>1</td><td>Manager</td><td>manager@company.com</td><td>48</td><td></td></tr>
        <tr><td>Expense Report</td><td>2</td><td>Finance</td><td>finance@company.com</td><td>72</td><td>amount > 500</td></tr>
        <tr><td>Expense Report</td><td>3</td><td>CEO</td><td>ceo@company.com</td><td>120</td><td>amount > 5000</td></tr>
      </table>
      <p><strong>How it works:</strong></p>
      <ul>
        <li>Step 1 is always executed (no condition)</li>
        <li>Step 2 only if amount > 500€</li>
        <li>Step 3 only if amount > 5000€</li>
      </ul>
    `,
    guideRequest: 'Create a Request',
    guideRequestContent: `
      <h3>Step by step</h3>
      <ol>
        <li>Click <strong>"New Request"</strong> button</li>
        <li>Select the workflow type</li>
        <li>Enter title and description</li>
        <li>Fill in amount and priority</li>
        <li>Click <strong>"Submit"</strong></li>
      </ol>
      <p>The request is created with status "Pending" and the first validator is notified.</p>
    `,
    guideValidate: 'Validate a Request',
    guideValidateContent: `
      <h3>For validators</h3>
      <ol>
        <li>Go to <strong>Requests</strong> tab</li>
        <li>Click on a pending request</li>
        <li>Review details and history</li>
        <li>Add a comment (recommended)</li>
        <li>Click <strong>"Approve"</strong> or <strong>"Reject"</strong></li>
      </ol>
      <p><strong>Important:</strong> All actions are logged in the audit trail and cannot be modified.</p>
    `,
    guideFeatures: 'Advanced Features',
    guideFeaturesContent: `
      <h3>Delegations</h3>
      <p>In <strong>WF_Delegations</strong> table, add a delegation:</p>
      <ul>
        <li><strong>Delegator:</strong> manager@company.com</li>
        <li><strong>Delegate:</strong> deputy@company.com</li>
        <li><strong>Start_Date / End_Date:</strong> Vacation period</li>
      </ul>
      <p>During this period, the deputy receives validation requests.</p>
      
      <h3>Conditional Routing</h3>
      <p>Use the <strong>Condition</strong> field in WF_Steps:</p>
      <ul>
        <li><code>amount > 1000</code> - Only if amount exceeds 1000</li>
        <li><code>priority == 'high'</code> - Only for high priority</li>
        <li><code>department == 'IT'</code> - Only for IT department</li>
      </ul>
      
      <h3>Parallel Validation</h3>
      <p>Set <strong>Is_Parallel = true</strong> for steps that must be validated simultaneously.</p>
    `,
    guideSupport: 'Support & Documentation',
    guideSupportContent: `
      <h3>Resources</h3>
      <ul>
        <li>🌐 <a href="https://gristup.fr" target="_blank">gristup.fr</a></li>
        <li>📖 <a href="https://github.com/isaytoo/grist-workflow-validator-widget" target="_blank">GitHub Repository</a></li>
        <li>📚 <a href="https://github.com/isaytoo/grist-workflow-validator-widget/blob/main/USER_GUIDE.md" target="_blank">Complete User Guide</a></li>
      </ul>
      <p><strong>Copyright 2026 Said Hamadou (isaytoo)</strong><br>Licensed under Apache License 2.0</p>
    `
  },
  fr: {
    appTitle: 'Validateur de Workflow',
    userRole: 'Rôle',
    tabRequests: 'Demandes',
    tabWorkflow: 'Configuration',
    tabHistory: 'Historique',
    tabStats: 'Statistiques',
    tabGuide: '📖 Guide',
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
    setupComplete: 'Configuration terminée !',
    guideTitle: 'Guide Utilisateur - Validateur de Workflow',
    guideIntro: 'Guide complet pour utiliser le widget Validateur de Workflow',
    guideQuickStart: 'Démarrage Rapide',
    guideQuickStartContent: `
      <h3>Installation (Déjà fait ! ✅)</h3>
      <p>Le widget est déjà installé et les 5 tables nécessaires ont été créées automatiquement :</p>
      <ul>
        <li><strong>WF_Requests</strong> - Demandes de validation</li>
        <li><strong>WF_Steps</strong> - Configuration des workflows</li>
        <li><strong>WF_ValidationLog</strong> - Journal d'audit</li>
        <li><strong>WF_Delegations</strong> - Gestion des délégations</li>
        <li><strong>WF_UserRoles</strong> - Rôles utilisateurs</li>
      </ul>
    `,
    guideWorkflow: 'Configurer un Workflow',
    guideWorkflowContent: `
      <h3>Exemple : Note de frais (3 niveaux)</h3>
      <p>Allez dans la table <strong>WF_Steps</strong> et ajoutez ces lignes :</p>
      <table class="guide-table">
        <tr><th>Workflow_Type</th><th>Step_Number</th><th>Step_Name</th><th>Validator_Email</th><th>SLA_Hours</th><th>Condition</th></tr>
        <tr><td>Note de frais</td><td>1</td><td>Manager</td><td>manager@societe.fr</td><td>48</td><td></td></tr>
        <tr><td>Note de frais</td><td>2</td><td>Finance</td><td>finance@societe.fr</td><td>72</td><td>amount > 500</td></tr>
        <tr><td>Note de frais</td><td>3</td><td>Direction</td><td>direction@societe.fr</td><td>120</td><td>amount > 5000</td></tr>
      </table>
      <p><strong>Fonctionnement :</strong></p>
      <ul>
        <li>Étape 1 toujours exécutée (pas de condition)</li>
        <li>Étape 2 uniquement si montant > 500€</li>
        <li>Étape 3 uniquement si montant > 5000€</li>
      </ul>
    `,
    guideRequest: 'Créer une Demande',
    guideRequestContent: `
      <h3>Étape par étape</h3>
      <ol>
        <li>Cliquez sur <strong>"Nouvelle demande"</strong></li>
        <li>Sélectionnez le type de workflow</li>
        <li>Entrez le titre et la description</li>
        <li>Remplissez le montant et la priorité</li>
        <li>Cliquez sur <strong>"Soumettre"</strong></li>
      </ol>
      <p>La demande est créée avec le statut "En attente" et le premier valideur est notifié.</p>
    `,
    guideValidate: 'Valider une Demande',
    guideValidateContent: `
      <h3>Pour les valideurs</h3>
      <ol>
        <li>Allez dans l'onglet <strong>Demandes</strong></li>
        <li>Cliquez sur une demande en attente</li>
        <li>Consultez les détails et l'historique</li>
        <li>Ajoutez un commentaire (recommandé)</li>
        <li>Cliquez sur <strong>"Approuver"</strong> ou <strong>"Rejeter"</strong></li>
      </ol>
      <p><strong>Important :</strong> Toutes les actions sont enregistrées dans le journal d'audit et ne peuvent pas être modifiées.</p>
    `,
    guideFeatures: 'Fonctionnalités Avancées',
    guideFeaturesContent: `
      <h3>Délégations</h3>
      <p>Dans la table <strong>WF_Delegations</strong>, ajoutez une délégation :</p>
      <ul>
        <li><strong>Delegator :</strong> manager@societe.fr</li>
        <li><strong>Delegate :</strong> adjoint@societe.fr</li>
        <li><strong>Start_Date / End_Date :</strong> Période de congés</li>
      </ul>
      <p>Pendant cette période, l'adjoint reçoit les demandes de validation.</p>
      
      <h3>Routage Conditionnel</h3>
      <p>Utilisez le champ <strong>Condition</strong> dans WF_Steps :</p>
      <ul>
        <li><code>amount > 1000</code> - Uniquement si montant > 1000</li>
        <li><code>priority == 'high'</code> - Uniquement pour priorité haute</li>
        <li><code>department == 'IT'</code> - Uniquement pour le département IT</li>
      </ul>
      
      <h3>Validation Parallèle</h3>
      <p>Définissez <strong>Is_Parallel = true</strong> pour les étapes qui doivent être validées simultanément.</p>
    `,
    guideSupport: 'Support & Documentation',
    guideSupportContent: `
      <h3>Ressources</h3>
      <ul>
        <li>🌐 <a href="https://gristup.fr" target="_blank">gristup.fr</a></li>
        <li>📖 <a href="https://github.com/isaytoo/grist-workflow-validator-widget" target="_blank">Dépôt GitHub</a></li>
        <li>📚 <a href="https://github.com/isaytoo/grist-workflow-validator-widget/blob/main/USER_GUIDE.md" target="_blank">Guide Utilisateur Complet</a></li>
      </ul>
      <p><strong>Copyright 2026 Said Hamadou (isaytoo)</strong><br>Sous licence Apache 2.0</p>
    `
  }
};

function t(key) {
  return i18n[currentLang][key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('wf-lang', lang);
  updateUILanguage();
}

function updateUILanguage() {
  // Update title
  document.getElementById('appTitle').textContent = t('appTitle');
  
  // Update tabs
  const tabs = document.querySelectorAll('.tab-btn');
  if (tabs[0]) tabs[0].textContent = t('tabRequests');
  if (tabs[1]) tabs[1].textContent = t('tabWorkflow');
  if (tabs[2]) tabs[2].textContent = t('tabHistory');
  if (tabs[3]) tabs[3].textContent = t('tabStats');
  if (tabs[4]) tabs[4].textContent = t('tabGuide');
  
  // Update buttons
  const btnNewRequest = document.getElementById('btnNewRequest');
  if (btnNewRequest) {
    btnNewRequest.innerHTML = `<span class="icon">➕</span> ${t('newRequest')}`;
  }
  
  // Update filter labels
  const filterStatus = document.getElementById('filterStatus');
  if (filterStatus) {
    filterStatus.innerHTML = `
      <option value="">${t('allStatuses')}</option>
      <option value="pending">${t('statusPending')}</option>
      <option value="approved">${t('statusApproved')}</option>
      <option value="rejected">${t('statusRejected')}</option>
      <option value="cancelled">${t('statusCancelled')}</option>
    `;
  }
  
  const filterType = document.getElementById('filterType');
  if (filterType) {
    filterType.innerHTML = `<option value="">${t('allTypes')}</option>`;
  }
  
  // Update guide content
  renderGuide();
  
  // Re-render current view
  renderUI();
}

function renderGuide() {
  const guideContent = document.getElementById('guideContent');
  if (!guideContent) return;
  
  guideContent.innerHTML = `
    <div class="guide-header">
      <h1>${t('guideTitle')}</h1>
      <p class="guide-intro">${t('guideIntro')}</p>
    </div>
    
    <div class="guide-section-item">
      <h2>1. ${t('guideQuickStart')}</h2>
      ${t('guideQuickStartContent')}
    </div>
    
    <div class="guide-section-item">
      <h2>2. ${t('guideWorkflow')}</h2>
      ${t('guideWorkflowContent')}
    </div>
    
    <div class="guide-section-item">
      <h2>3. ${t('guideRequest')}</h2>
      ${t('guideRequestContent')}
    </div>
    
    <div class="guide-section-item">
      <h2>4. ${t('guideValidate')}</h2>
      ${t('guideValidateContent')}
    </div>
    
    <div class="guide-section-item">
      <h2>5. ${t('guideFeatures')}</h2>
      ${t('guideFeaturesContent')}
    </div>
    
    <div class="guide-section-item">
      <h2>6. ${t('guideSupport')}</h2>
      ${t('guideSupportContent')}
    </div>
  `;
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
  requests: [],
  workflowTypes: [],
  auditLog: [],
  delegations: [],
  selectedRequest: null,
  mappedColumns: {
    requests: REQUESTS_TABLE,
    workflowSteps: WORKFLOW_STEPS_TABLE,
    validationLog: VALIDATION_LOG_TABLE,
    delegations: DELEGATIONS_TABLE,
    userRoles: USER_ROLES_TABLE
  }
};

// Initialize widget
(async function() {
  try {
    console.log('Workflow Validator: Starting initialization...');
    
    // Load saved language preference (default to French)
    const savedLang = localStorage.getItem('wf-lang') || 'fr';
    currentLang = savedLang;
    document.getElementById('langSelector').value = savedLang;
    
    // Setup language selector
    document.getElementById('langSelector').addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
    
    await grist.ready({ requiredAccess: 'full' });
    
    console.log('Grist ready, starting auto-setup...');
    
    // Auto-create tables if needed
    await ensureTablesExist();
    
    console.log('Tables ensured, initializing widget...');
    
    // Initialize the widget
    await init();
    
    // Update UI with selected language
    updateUILanguage();
    
    console.log('Widget initialized successfully!');
  } catch (error) {
    console.error('FATAL ERROR during widget initialization:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h2 style="color: #ef4444;">Error Loading Widget</h2>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow: auto;">${error.stack}</pre>
      </div>
    `;
  }
})();

// Auto-setup: Create required tables if they don't exist
async function ensureTablesExist() {
  try {
    const existingTables = await grist.docApi.listTables();
    let tablesCreated = false;
    
    console.log('Existing tables:', existingTables);
    
    // Create Requests table
    if (existingTables.indexOf(REQUESTS_TABLE) === -1) {
      console.log('Creating Requests table...');
      tablesCreated = true;
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
    if (existingTables.indexOf(WORKFLOW_STEPS_TABLE) === -1) {
      console.log('Creating WorkflowSteps table...');
      tablesCreated = true;
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
    if (existingTables.indexOf(VALIDATION_LOG_TABLE) === -1) {
      console.log('Creating ValidationLog table...');
      tablesCreated = true;
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
    if (existingTables.indexOf(DELEGATIONS_TABLE) === -1) {
      console.log('Creating Delegations table...');
      tablesCreated = true;
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
    if (existingTables.indexOf(USER_ROLES_TABLE) === -1) {
      console.log('Creating UserRoles table...');
      tablesCreated = true;
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
    
    // Only show success message if tables were actually created
    if (tablesCreated) {
      showSuccess(t('tablesCreated'));
    }
    
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
    // Step 1: Get user email
    const userEmail = await getUserEmail();
    state.userEmail = userEmail;
    
    // Step 2: Check if role is configured in WF_UserRoles table
    try {
      const userRolesData = await grist.docApi.fetchTable(USER_ROLES_TABLE);
      const records = parseTableData(userRolesData);
      
      // Find role for current user
      const userRole = records.find(r => r.Email === userEmail);
      if (userRole && userRole.Role) {
        state.userRole = userRole.Role;
        console.log(`Role found in WF_UserRoles: ${userRole.Role}`);
        updateUserDisplay();
        return;
      }
    } catch (e) {
      console.log('Could not get role from WF_UserRoles, falling back to permission detection:', e);
    }
    
    // Step 3: Fallback - Detect role by testing permissions
    const isOwner = await detectOwner();
    if (isOwner) {
      state.userRole = 'Owner';
      updateUserDisplay();
      return;
    }
    
    const isEditor = await detectEditor();
    if (isEditor) {
      state.userRole = 'Editor';
      updateUserDisplay();
      return;
    }
    
    // If neither Owner nor Editor, must be Viewer
    state.userRole = 'Viewer';
    updateUserDisplay();
    
  } catch (error) {
    console.error('Role detection error:', error);
    state.userRole = 'Unknown';
    state.userEmail = 'unknown@example.com';
  }
}

async function getUserEmail() {
  try {
    // Method 1: Try to get from WF_UserRoles table if user has configured it
    try {
      const userRolesData = await grist.docApi.fetchTable(USER_ROLES_TABLE);
      const records = parseTableData(userRolesData);
      if (records.length > 0 && records[0].Email) {
        return records[0].Email;
      }
    } catch (e) {
      console.log('Could not get email from UserRoles:', e);
    }
    
    // Method 2: Use REST API with access token (respects View As mode)
    try {
      const token = await grist.docApi.getAccessToken({ readOnly: true });
      const docId = await grist.docApi.getDocName();
      
      // Fetch current session info via REST API
      const response = await fetch(`https://docs.getgrist.com/api/docs/${docId}/access`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.users && data.users.length > 0) {
          return data.users[0].email || 'user@example.com';
        }
      }
    } catch (e) {
      console.log('Could not get email from REST API:', e);
    }
    
    // Fallback: return placeholder
    return 'user@example.com';
    
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
    if (state.mappedColumns.requests) {
      const requestsData = await grist.docApi.fetchTable(state.mappedColumns.requests);
      state.requests = parseTableData(requestsData);
    }
    
    // Load workflow types
    if (state.mappedColumns.workflowSteps) {
      const stepsData = await grist.docApi.fetchTable(state.mappedColumns.workflowSteps);
      state.workflowTypes = parseWorkflowTypes(stepsData);
    }
    
    // Load audit log
    if (state.mappedColumns.validationLog) {
      const logData = await grist.docApi.fetchTable(state.mappedColumns.validationLog);
      state.auditLog = parseTableData(logData);
    }
    
    // Load delegations
    try {
      const delegationsData = await grist.docApi.fetchTable(DELEGATIONS_TABLE);
      state.delegations = parseTableData(delegationsData);
    } catch (e) {
      console.log('Could not load delegations:', e);
      state.delegations = [];
    }
    
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

function parseTableData(tableData) {
  const records = [];
  const { id, ...columns } = tableData;
  
  if (!id || id.length === 0) return records;
  
  for (let i = 0; i < id.length; i++) {
    const record = { id: id[i] };
    
    for (const [colName, colValues] of Object.entries(columns)) {
      let value = colValues[i];
      
      // Convert Grist timestamps (seconds since epoch) to JavaScript Date
      // Grist DateTime columns return Unix timestamps in seconds
      if (colName.includes('_At') || colName.includes('Timestamp')) {
        if (typeof value === 'number' && value > 0) {
          // Grist uses seconds, JavaScript uses milliseconds
          value = new Date(value * 1000).toISOString();
        }
      }
      
      record[colName] = value;
    }
    
    records.push(record);
  }
  
  return records;
}

function parseWorkflowTypes(stepsData) {
  const types = {};
  const records = parseTableData(stepsData);
  
  records.forEach(step => {
    const type = step.Workflow_Type || 'default';
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

// Check if current user is a delegate for a given email
function getActiveDelegation(validatorEmail, workflowType = null) {
  const now = new Date();
  
  return state.delegations.find(delegation => {
    // Check if delegation is for this validator
    if (delegation.Delegator !== validatorEmail) return false;
    
    // Check if delegation is for current user
    if (delegation.Delegate !== state.userEmail) return false;
    
    // Check if delegation is active
    if (delegation.Is_Active === false) return false;
    
    // Check workflow type if specified
    if (workflowType && delegation.Workflow_Type && delegation.Workflow_Type !== workflowType) {
      return false;
    }
    
    // Check date range
    const startDate = delegation.Start_Date ? new Date(delegation.Start_Date) : null;
    const endDate = delegation.End_Date ? new Date(delegation.End_Date) : null;
    
    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;
    
    return true;
  });
}

// Check if current user can validate (either directly or via delegation)
function canUserValidate(validatorEmail, workflowType = null) {
  // Direct validation
  if (validatorEmail === state.userEmail) {
    return { canValidate: true, isDelegation: false };
  }
  
  // Check delegation
  const delegation = getActiveDelegation(validatorEmail, workflowType);
  if (delegation) {
    return { 
      canValidate: true, 
      isDelegation: true, 
      delegator: delegation.Delegator 
    };
  }
  
  return { canValidate: false };
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
    btnNewRequest.addEventListener('click', () => {
      if (state.workflowTypes.length === 0) {
        showError('Veuillez d\'abord créer un workflow dans l\'onglet Configuration');
        switchTab('workflow');
      } else {
        openNewRequestModal();
      }
    });
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
  
  // Add workflow type button
  const btnAddWorkflowType = document.getElementById('btnAddWorkflowType');
  if (btnAddWorkflowType) {
    btnAddWorkflowType.addEventListener('click', addWorkflowType);
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
    filteredRequests = filteredRequests.filter(r => r.Status === filterStatus);
  }
  
  if (filterType) {
    filteredRequests = filteredRequests.filter(r => r.Type === filterType);
  }
  
  if (filteredRequests.length === 0) {
    // Check if workflows exist
    const hasWorkflows = state.workflowTypes.length > 0;
    
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-title">Aucune demande</div>
        ${hasWorkflows ? `
          <p>Créez votre première demande pour commencer</p>
          <button onclick="openNewRequestModal()" class="btn btn-primary" style="margin-top: 16px;">
            ➕ Nouvelle demande
          </button>
        ` : `
          <p style="color: var(--text-secondary); margin-bottom: 16px;">Avant de créer une demande, vous devez d'abord configurer un workflow.</p>
          <button onclick="switchTab('workflow')" class="btn btn-primary" style="margin-top: 8px;">
            ⚙️ Aller dans Configuration
          </button>
        `}
      </div>
    `;
    return;
  }
  
  // Separate valid and invalid requests
  const validRequests = filteredRequests.filter(r => r.Title && r.Type);
  const invalidRequests = filteredRequests.filter(r => !r.Title || !r.Type);
  
  let html = '';
  
  // Show warning for invalid requests
  if (invalidRequests.length > 0) {
    html += `
      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
        <strong>⚠️ ${invalidRequests.length} demande(s) invalide(s) détectée(s)</strong>
        <p style="margin: 8px 0 0 0; font-size: 0.9em;">
          Ces demandes ont été créées sans workflow configuré. 
          Ouvrez la table <strong>WF_Requests</strong> et supprimez les lignes avec "Sans titre" ou Type vide.
        </p>
      </div>
    `;
  }
  
  // Render valid requests
  html += validRequests.map(request => `
    <div class="request-card" onclick="openRequestDetails(${request.id})">
      <div class="request-card-header">
        <div>
          <div class="request-title">${escapeHtml(request.Title)}</div>
          <div class="request-type">${escapeHtml(request.Type)}</div>
        </div>
        <span class="request-status status-${request.Status || 'pending'}">
          ${getStatusLabel(request.Status)}
        </span>
      </div>
      <div class="request-meta">
        <div class="request-meta-item">
          <span>👤</span>
          <span>${escapeHtml(request.Requester || 'Inconnu')}</span>
        </div>
        <div class="request-meta-item">
          <span>📅</span>
          <span>${formatDate(request.Created_At)}</span>
        </div>
        ${request.Current_Step ? `
          <div class="request-meta-item">
            <span>⏳</span>
            <span>${escapeHtml(request.Current_Step)}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

// Workflow management functions
async function addWorkflowType() {
  // Create custom input modal
  const modalHtml = `
    <div id="modalWorkflowName" class="modal active">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
          <h2>Nouveau type de workflow</h2>
          <button class="modal-close" onclick="closeWorkflowNameModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="workflowNameInput">Nom du workflow *</label>
            <input type="text" id="workflowNameInput" class="form-control" placeholder="Ex: Note de frais" autofocus>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="closeWorkflowNameModal()">Annuler</button>
            <button type="button" class="btn btn-primary" onclick="submitWorkflowName()">Créer</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modalHtml;
  document.body.appendChild(tempDiv.firstElementChild);
  
  // Focus input
  setTimeout(() => {
    document.getElementById('workflowNameInput').focus();
  }, 100);
}

window.closeWorkflowNameModal = function() {
  const modal = document.getElementById('modalWorkflowName');
  if (modal) modal.remove();
}

window.submitWorkflowName = async function() {
  const input = document.getElementById('workflowNameInput');
  const workflowName = input.value.trim();
  
  if (!workflowName) {
    showError('Veuillez entrer un nom de workflow');
    return;
  }
  
  closeWorkflowNameModal();
  
  try {
    showLoading(true);
    
    // Add a default step to WF_Steps table
    await grist.docApi.applyUserActions([
      ['AddRecord', WORKFLOW_STEPS_TABLE, null, {
        Workflow_Type: workflowName,
        Step_Number: 1,
        Step_Name: 'Étape 1',
        Validator_Role: 'Manager',
        Validator_Email: 'validator@example.com',
        SLA_Hours: 48,
        Is_Parallel: false,
        Condition: ''
      }]
    ]);
    
    showSuccess('Workflow créé ! Allez dans la table WF_Steps pour le configurer.');
    
    // Reload data
    await loadData();
    renderWorkflowConfig();
    
  } catch (error) {
    console.error('Error creating workflow:', error);
    showError('Erreur lors de la création du workflow');
  } finally {
    showLoading(false);
  }
}

function editWorkflowType(typeName) {
  const workflow = state.workflowTypes.find(w => w.name === typeName);
  if (!workflow) return;
  
  const sortedSteps = workflow.steps.sort((a, b) => a.Step_Number - b.Step_Number);
  
  const stepsHtml = sortedSteps.map(step => `
    <div class="step-edit-card" data-step-id="${step.id}" style="background: var(--bg-secondary); padding: 16px; border-radius: 10px; margin-bottom: 12px; border-left: 4px solid var(--primary);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="background: var(--primary); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">${step.Step_Number}</span>
        <input type="text" value="${escapeHtml(step.Step_Name)}" class="form-control" data-field="Step_Name" style="flex: 1;" placeholder="Nom de l'étape">
        <button onclick="deleteWorkflowStep(${step.id})" class="btn btn-danger" style="padding: 8px 12px;">🗑️</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Rôle du valideur</label>
          <input type="text" value="${escapeHtml(step.Validator_Role || '')}" class="form-control" data-field="Validator_Role" placeholder="Ex: Manager">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Email du valideur</label>
          <input type="email" value="${escapeHtml(step.Validator_Email || '')}" class="form-control" data-field="Validator_Email" placeholder="email@example.com">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">SLA (heures)</label>
          <input type="number" value="${step.SLA_Hours || 48}" class="form-control" data-field="SLA_Hours" min="1">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Type</label>
          <select class="form-control" data-field="Is_Parallel">
            <option value="false" ${!step.Is_Parallel ? 'selected' : ''}>➡️ Séquentiel</option>
            <option value="true" ${step.Is_Parallel ? 'selected' : ''}>🔀 Parallèle</option>
          </select>
        </div>
      </div>
      <div style="margin-top: 12px;">
        <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Condition (optionnel)</label>
        <input type="text" value="${escapeHtml(step.Condition || '')}" class="form-control" data-field="Condition" placeholder="Ex: amount > 1000">
      </div>
    </div>
  `).join('');
  
  const modalHtml = `
    <div id="modalEditWorkflow" class="modal active">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2>✏️ Modifier le workflow "${escapeHtml(typeName)}"</h2>
          <button class="modal-close" onclick="closeEditWorkflowModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: 20px; padding: 12px; background: #dbeafe; border-radius: 8px; font-size: 0.9em;">
            💡 Modifiez les étapes ci-dessous. Les changements seront sauvegardés dans la table WF_Steps.
          </div>
          
          <div id="stepsEditContainer">
            ${stepsHtml}
          </div>
          
          <button onclick="addNewStep('${escapeHtml(typeName)}')" class="btn btn-secondary" style="width: 100%; margin-top: 12px;">
            ➕ Ajouter une étape
          </button>
          
          <div class="form-actions" style="margin-top: 24px;">
            <button type="button" class="btn btn-secondary" onclick="closeEditWorkflowModal()">Annuler</button>
            <button type="button" class="btn btn-primary" onclick="saveWorkflowChanges('${escapeHtml(typeName)}')">💾 Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modalHtml;
  document.body.appendChild(tempDiv.firstElementChild);
}

window.closeEditWorkflowModal = function() {
  const modal = document.getElementById('modalEditWorkflow');
  if (modal) modal.remove();
}

window.deleteWorkflowStep = function(stepId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette étape ?')) return;
  
  const stepCard = document.querySelector(`[data-step-id="${stepId}"]`);
  if (stepCard) {
    stepCard.style.opacity = '0.5';
    stepCard.dataset.deleted = 'true';
  }
}

window.addNewStep = function(workflowName) {
  const container = document.getElementById('stepsEditContainer');
  const existingSteps = container.querySelectorAll('.step-edit-card:not([data-deleted="true"])');
  const nextStepNumber = existingSteps.length + 1;
  
  const newStepHtml = `
    <div class="step-edit-card" data-new="true" style="background: var(--bg-secondary); padding: 16px; border-radius: 10px; margin-bottom: 12px; border-left: 4px solid #10b981;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">${nextStepNumber}</span>
        <input type="text" value="Nouvelle étape" class="form-control" data-field="Step_Name" style="flex: 1;" placeholder="Nom de l'étape">
        <button onclick="this.parentElement.parentElement.remove()" class="btn btn-danger" style="padding: 8px 12px;">🗑️</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Rôle du valideur</label>
          <input type="text" value="" class="form-control" data-field="Validator_Role" placeholder="Ex: Manager">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Email du valideur</label>
          <input type="email" value="" class="form-control" data-field="Validator_Email" placeholder="email@example.com">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">SLA (heures)</label>
          <input type="number" value="48" class="form-control" data-field="SLA_Hours" min="1">
        </div>
        <div>
          <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Type</label>
          <select class="form-control" data-field="Is_Parallel">
            <option value="false" selected>➡️ Séquentiel</option>
            <option value="true">🔀 Parallèle</option>
          </select>
        </div>
      </div>
      <div style="margin-top: 12px;">
        <label style="font-size: 0.85em; color: var(--text-secondary); margin-bottom: 4px; display: block;">Condition (optionnel)</label>
        <input type="text" value="" class="form-control" data-field="Condition" placeholder="Ex: amount > 1000">
      </div>
      <input type="hidden" data-field="Workflow_Type" value="${escapeHtml(workflowName)}">
      <input type="hidden" data-field="Step_Number" value="${nextStepNumber}">
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', newStepHtml);
}

window.saveWorkflowChanges = async function(workflowName) {
  try {
    showLoading(true);
    
    const actions = [];
    const container = document.getElementById('stepsEditContainer');
    const stepCards = container.querySelectorAll('.step-edit-card');
    
    stepCards.forEach((card, index) => {
      const stepId = card.dataset.stepId;
      const isNew = card.dataset.new === 'true';
      const isDeleted = card.dataset.deleted === 'true';
      
      if (isDeleted && stepId) {
        // Delete step
        actions.push(['RemoveRecord', WORKFLOW_STEPS_TABLE, parseInt(stepId)]);
      } else if (isNew) {
        // Add new step
        const data = {};
        card.querySelectorAll('[data-field]').forEach(input => {
          const field = input.dataset.field;
          let value = input.value;
          
          if (field === 'SLA_Hours') value = parseInt(value) || 48;
          else if (field === 'Is_Parallel') value = value === 'true';
          else if (field === 'Step_Number') value = parseInt(value);
          
          data[field] = value;
        });
        
        actions.push(['AddRecord', WORKFLOW_STEPS_TABLE, null, data]);
      } else if (stepId) {
        // Update existing step
        const data = {};
        card.querySelectorAll('[data-field]').forEach(input => {
          const field = input.dataset.field;
          let value = input.value;
          
          if (field === 'SLA_Hours') value = parseInt(value) || 48;
          else if (field === 'Is_Parallel') value = value === 'true';
          
          data[field] = value;
        });
        
        // Update step number based on position
        data.Step_Number = index + 1;
        
        actions.push(['UpdateRecord', WORKFLOW_STEPS_TABLE, parseInt(stepId), data]);
      }
    });
    
    if (actions.length > 0) {
      await grist.docApi.applyUserActions(actions);
      showSuccess('Workflow mis à jour avec succès !');
      
      // Reload and refresh
      await loadData();
      renderWorkflowConfig();
      closeEditWorkflowModal();
    } else {
      showInfo('Aucune modification à sauvegarder');
    }
    
  } catch (error) {
    console.error('Error saving workflow:', error);
    showError('Erreur lors de la sauvegarde du workflow');
  } finally {
    showLoading(false);
  }
}

window.viewWorkflowSteps = function(typeName) {
  const workflow = state.workflowTypes.find(w => w.name === typeName);
  if (!workflow) return;
  
  const stepsHtml = workflow.steps
    .sort((a, b) => a.Step_Number - b.Step_Number)
    .map(step => `
      <div style="padding: 16px; background: var(--bg-secondary); border-radius: 10px; border-left: 4px solid var(--primary); margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="background: var(--primary); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">${step.Step_Number}</span>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 1.1em;">${escapeHtml(step.Step_Name)}</div>
            <div style="font-size: 0.9em; color: var(--text-secondary); margin-top: 4px;">
              👤 ${escapeHtml(step.Validator_Role || 'N/A')} • 📧 ${escapeHtml(step.Validator_Email)}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 16px; font-size: 0.85em; color: var(--text-secondary); margin-top: 8px;">
          <span>⏱️ SLA: ${step.SLA_Hours}h</span>
          ${step.Is_Parallel ? '<span>🔀 Parallèle</span>' : '<span>➡️ Séquentiel</span>'}
          ${step.Condition ? `<span>🎯 Condition: ${escapeHtml(step.Condition)}</span>` : ''}
        </div>
      </div>
    `).join('');
  
  const modalHtml = `
    <div id="modalWorkflowSteps" class="modal active">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2>📋 ${escapeHtml(typeName)}</h2>
          <button class="modal-close" onclick="closeWorkflowStepsModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: 20px; padding: 16px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 10px;">
            <div style="font-size: 0.9em; color: var(--text-secondary);">
              Ce workflow comporte <strong>${workflow.steps.length} étape(s)</strong> de validation avec un SLA total de <strong>${workflow.steps.reduce((sum, s) => sum + (s.SLA_Hours || 0), 0)} heures</strong>.
            </div>
          </div>
          ${stepsHtml}
          <div style="margin-top: 20px; padding: 12px; background: #fef3c7; border-radius: 8px; font-size: 0.9em;">
            💡 Pour modifier ces étapes, allez dans la table <strong>WF_Steps</strong>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modalHtml;
  document.body.appendChild(tempDiv.firstElementChild);
}

window.closeWorkflowStepsModal = function() {
  const modal = document.getElementById('modalWorkflowSteps');
  if (modal) modal.remove();
}

// Render workflow configuration
function renderWorkflowConfig() {
  const typesList = document.getElementById('workflowTypesList');
  const stepsCanvas = document.getElementById('workflowStepsCanvas');
  
  if (!typesList) return;
  
  if (state.workflowTypes.length === 0) {
    typesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚙️</div>
        <div class="empty-state-title">${t('noWorkflows')}</div>
        <p>${t('noWorkflowsDesc')}</p>
      </div>
    `;
    if (stepsCanvas) stepsCanvas.innerHTML = '';
    return;
  }
  
  typesList.innerHTML = state.workflowTypes.map(type => `
    <div class="workflow-type-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 20px; position: relative; overflow: hidden; cursor: pointer;" onclick="selectWorkflowForDisplay('${escapeHtml(type.name)}')">
      <div style="position: absolute; top: -20px; right: -20px; font-size: 80px; opacity: 0.1;">⚙️</div>
      <div style="position: absolute; top: 20px; right: 20px; z-index: 10; display: flex; gap: 8px;">
        <button class="btn" onclick="event.stopPropagation(); editWorkflowType('${escapeHtml(type.name)}')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; white-space: nowrap;">
          ✏️ ${t('modify')}
        </button>
        <button class="btn" onclick="event.stopPropagation(); viewWorkflowSteps('${escapeHtml(type.name)}')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; white-space: nowrap;">
          👁️ Voir les étapes
        </button>
      </div>
      <div style="position: relative; z-index: 1;">
        <div style="display: flex; align-items: center; gap: 12px; padding-right: 280px;">
          <span style="font-size: 2em;">📋</span>
          <div>
            <div class="workflow-title" style="font-size: 1.3em; font-weight: 700; color: white;">${escapeHtml(type.name)}</div>
            <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px; font-size: 0.9em; opacity: 0.9;">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span>🔢</span>
                <span>${type.steps.length} ${type.steps.length > 1 ? 'étapes' : 'étape'}</span>
              </span>
              <span style="display: flex; align-items: center; gap: 6px;">
                <span>⏱️</span>
                <span>${type.steps.reduce((sum, s) => sum + (s.SLA_Hours || 0), 0)}h SLA total</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Display first workflow by default
  if (state.workflowTypes.length > 0 && stepsCanvas) {
    renderWorkflowSteps(state.workflowTypes[0].name);
  }
}

// Select and display workflow steps
window.selectWorkflowForDisplay = function(workflowName) {
  renderWorkflowSteps(workflowName);
}

// Render visual workflow steps diagram
function renderWorkflowSteps(workflowName) {
  const canvas = document.getElementById('workflowStepsCanvas');
  if (!canvas) return;
  
  const workflow = state.workflowTypes.find(w => w.name === workflowName);
  if (!workflow) {
    canvas.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Sélectionnez un workflow ci-dessus</p>';
    return;
  }
  
  const sortedSteps = workflow.steps.sort((a, b) => a.Step_Number - b.Step_Number);
  
  canvas.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <h4 style="margin: 0; color: var(--text-primary); font-size: 1.2em;">📋 ${escapeHtml(workflowName)}</h4>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 0.9em;">Circuit de validation en ${sortedSteps.length} étape(s)</p>
    </div>
    
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; padding: 20px;">
      ${sortedSteps.map((step, index) => `
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); min-width: 200px; position: relative;">
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1em; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
              ${step.Step_Number}
            </div>
            <div style="margin-top: 16px;">
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; text-align: center;">
                ${escapeHtml(step.Step_Name)}
              </div>
              <div style="font-size: 0.85em; color: var(--text-secondary); text-align: center; margin-bottom: 8px;">
                👤 ${escapeHtml(step.Validator_Role || 'N/A')}
              </div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.8em; color: var(--text-secondary); padding: 6px; background: var(--bg-secondary); border-radius: 6px;">
                <span>⏱️ ${step.SLA_Hours}h</span>
                ${step.Is_Parallel ? '<span style="color: #f59e0b;">🔀</span>' : '<span style="color: #10b981;">➡️</span>'}
              </div>
              ${step.Condition ? `
                <div style="margin-top: 8px; padding: 6px; background: #fef3c7; border-radius: 6px; font-size: 0.75em; text-align: center;">
                  🎯 ${escapeHtml(step.Condition)}
                </div>
              ` : ''}
            </div>
          </div>
          ${index < sortedSteps.length - 1 ? `
            <div style="color: var(--primary); font-size: 2em; font-weight: 700;">
              ${sortedSteps[index + 1].Is_Parallel ? '⇉' : '→'}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
    
    <div style="margin-top: 24px; padding: 16px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 10px; text-align: center;">
      <div style="font-size: 0.9em; color: var(--text-secondary);">
        <strong>SLA total :</strong> ${sortedSteps.reduce((sum, s) => sum + (s.SLA_Hours || 0), 0)} heures • 
        <strong>Étapes parallèles :</strong> ${sortedSteps.filter(s => s.Is_Parallel).length} • 
        <strong>Conditions :</strong> ${sortedSteps.filter(s => s.Condition).length}
      </div>
    </div>
  `;
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
  
  // Group by date
  const groupedByDate = {};
  state.auditLog.forEach(entry => {
    const date = entry.Timestamp ? new Date(entry.Timestamp).toLocaleDateString('fr-FR') : 'Date inconnue';
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push(entry);
  });
  
  container.innerHTML = Object.entries(groupedByDate).map(([date, entries]) => `
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border);">
        <span style="font-size: 1.2em;">📅</span>
        <span style="font-weight: 600; color: var(--text-primary);">${date}</span>
        <span style="background: var(--primary); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: 600;">${entries.length}</span>
      </div>
      ${entries.map(entry => `
        <div style="display: flex; gap: 16px; padding: 16px; background: var(--bg-secondary); border-radius: 10px; margin-bottom: 12px; transition: all 0.2s;" onmouseover="this.style.transform='translateX(4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='translateX(0)'; this.style.boxShadow='none'">
          <div style="font-size: 1.8em; min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            ${getActionIcon(entry.Action)}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
              ${escapeHtml(entry.Description || entry.Action || 'Action inconnue')}
            </div>
            <div style="font-size: 0.85em; color: var(--text-secondary); display: flex; align-items: center; gap: 12px;">
              <span>👤 ${escapeHtml(entry.User || 'Système')}</span>
              <span>🕐 ${formatDateTime(entry.Timestamp)}</span>
            </div>
            ${entry.Comment ? `
              <div style="margin-top: 8px; padding: 12px; background: white; border-radius: 8px; font-size: 0.9em; border-left: 3px solid var(--primary);">
                💬 ${escapeHtml(entry.Comment)}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// Render statistics
function renderStats() {
  const pending = state.requests.filter(r => r.Status === 'pending').length;
  const approved = state.requests.filter(r => r.Status === 'approved').length;
  const rejected = state.requests.filter(r => r.Status === 'rejected').length;
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
  
  // Check if workflows are configured
  if (state.workflowTypes.length === 0) {
    showError(t('noWorkflowsConfigured') || 'Aucun workflow configuré. Allez dans l\'onglet Configuration pour créer un type de workflow.');
    return;
  }
  
  // Populate workflow types
  typeSelect.innerHTML = state.workflowTypes.map(type => 
    `<option value="${escapeHtml(type.name)}">${escapeHtml(type.name)}</option>`
  ).join('');
  
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
  
  if (!type || !title) {
    showError(t('error') + ': ' + 'Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  try {
    showLoading(true);
    
    // Create request with current timestamp
    const now = new Date().toISOString();
    await grist.docApi.applyUserActions([
      ['AddRecord', REQUESTS_TABLE, null, {
        Type: type,
        Title: title,
        Description: description,
        Requester: state.userEmail,
        Status: 'pending',
        Current_Step: 'Étape 1',
        Priority: 'medium',
        Created_At: now
      }]
    ]);
    
    // Log action
    await logAction('create_request', `Nouvelle demande: ${title}`, { type, title });
    
    showSuccess(t('requestCreated'));
    closeModal(document.getElementById('modalNewRequest'));
    
    // Reload data
    await loadData();
    renderRequestsList();
    
  } catch (error) {
    console.error('Error creating request:', error);
    showError(t('error'));
  } finally {
    showLoading(false);
  }
}

function openRequestDetails(requestId) {
  const request = state.requests.find(r => r.id === requestId);
  if (!request) return;
  
  state.selectedRequest = request;
  
  const modal = document.getElementById('modalRequestDetails');
  const detailsContainer = document.getElementById('requestDetailsContent');
  const timelineContainer = document.getElementById('workflowTimeline');
  const actionsContainer = document.getElementById('validationActions');
  
  // Render request details with modern layout
  detailsContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 20px;">
      <div class="detail-row">
        <span class="detail-label">📋 ${t('type')}</span>
        <div style="font-size: 1.1em; font-weight: 600; color: var(--primary);">${escapeHtml(request.Type || '')}</div>
      </div>
      <div class="detail-row">
        <span class="detail-label">🏷️ ${t('status')}</span>
        <span class="request-status status-${request.Status}" style="display: inline-block; margin-top: 4px;">${getStatusLabel(request.Status)}</span>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 20px;">
      <div class="detail-row">
        <span class="detail-label">👤 ${t('requester')}</span>
        <div style="font-size: 1em; color: var(--text-primary);">${escapeHtml(request.Requester || '')}</div>
      </div>
      <div class="detail-row">
        <span class="detail-label">📅 ${t('createdAt')}</span>
        <div style="font-size: 1em; color: var(--text-primary);">${formatDateTime(request.Created_At)}</div>
      </div>
    </div>
    ${request.Description ? `
      <div class="detail-row" style="grid-column: 1 / -1;">
        <span class="detail-label">📝 ${t('description')}</span>
        <p style="white-space: pre-wrap;">${escapeHtml(request.Description)}</p>
      </div>
    ` : ''}
  `;
  
  // Render timeline
  renderTimeline(request, timelineContainer);
  
  // Render validation actions
  renderValidationActions(request, actionsContainer);
  
  modal.classList.add('active');
}

function renderTimeline(request, container) {
  // Get validation log for this request
  const logs = state.auditLog.filter(log => log.Request_Id === request.id);
  
  if (logs.length === 0) {
    container.innerHTML = `
      <h3>Historique</h3>
      <p style="text-align: center; padding: 24px; color: var(--text-secondary);">${t('noHistory')}</p>
    `;
    return;
  }
  
  container.innerHTML = `
    <h3>Historique</h3>
    ${logs.map(log => `
      <div class="timeline-item">
        <div class="timeline-icon">${getActionIcon(log.Action)}</div>
        <div class="timeline-content">
          <div class="timeline-title">${escapeHtml(log.Description || '')}</div>
          <div class="timeline-meta">
            👤 ${escapeHtml(log.User || '')} • 🕐 ${formatDateTime(log.Timestamp)}
          </div>
          ${log.Comment ? `<div class="timeline-comment">💬 ${escapeHtml(log.Comment)}</div>` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function renderValidationActions(request, container) {
  if (request.Status !== 'pending') {
    container.innerHTML = '';
    return;
  }
  
  // Check if user can validate
  if (state.userRole === 'Viewer') {
    container.innerHTML = `<p class="no-permission">${t('noPermission')}</p>`;
    return;
  }
  
  // Get current workflow step to check validator
  const workflow = state.workflowTypes.find(w => w.name === request.Type);
  if (!workflow) {
    container.innerHTML = `<p class="no-permission">Workflow non trouvé</p>`;
    return;
  }
  
  // Find current step (simplified - assumes step 1 for now)
  const currentStep = workflow.steps.find(s => s.Step_Number === 1);
  if (!currentStep) {
    container.innerHTML = `<p class="no-permission">Étape de validation non trouvée</p>`;
    return;
  }
  
  // Check if user can validate (directly or via delegation)
  const validationCheck = canUserValidate(currentStep.Validator_Email, request.Type);
  
  if (!validationCheck.canValidate) {
    container.innerHTML = `<p class="no-permission">${t('noPermission')}</p>`;
    return;
  }
  
  // Show delegation info if applicable
  const delegationBanner = validationCheck.isDelegation ? `
    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 1.5em;">🔄</span>
      <div>
        <div style="font-weight: 600;">Délégation active</div>
        <div style="font-size: 0.9em; opacity: 0.9;">Vous validez au nom de ${escapeHtml(validationCheck.delegator)}</div>
      </div>
    </div>
  ` : '';
  
  container.innerHTML = `
    <div class="validation-form">
      <h3>✍️ ${t('validationActions')}</h3>
      ${delegationBanner}
      <div class="form-group">
        <label for="validationComment" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 1.1em;">💬</span>
          <span>${t('comment')}</span>
        </label>
        <textarea 
          id="validationComment" 
          rows="4" 
          placeholder="Ajoutez un commentaire pour expliquer votre décision..."
          style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 8px; font-size: 0.95em; font-family: inherit; resize: vertical; transition: all 0.2s;"
          onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)'"
          onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'"
        ></textarea>
        <div style="font-size: 0.85em; color: var(--text-secondary); margin-top: 6px;">
          💡 Un commentaire détaillé aide à la traçabilité des décisions
        </div>
      </div>
      <div class="validation-buttons">
        <button class="btn btn-danger" onclick="handleValidation('reject')" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span style="font-size: 1.2em;">❌</span>
          <span>${t('reject')}</span>
        </button>
        <button class="btn btn-success" onclick="handleValidation('approve')" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span style="font-size: 1.2em;">✅</span>
          <span>${t('approve')}</span>
        </button>
      </div>
    </div>
  `;
  
  // Store delegation info for later use
  state.currentDelegation = validationCheck.isDelegation ? validationCheck : null;
}

async function handleValidation(action) {
  const request = state.selectedRequest;
  if (!request) return;
  
  const comment = document.getElementById('validationComment')?.value || '';
  
  try {
    showLoading(true);
    
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    
    // Update request status
    await grist.docApi.applyUserActions([
      ['UpdateRecord', REQUESTS_TABLE, request.id, {
        Status: newStatus,
        Completed_At: new Date().toISOString()
      }]
    ]);
    
    // Prepare description with delegation info
    let description = `Demande ${action === 'approve' ? 'approuvée' : 'rejetée'}`;
    if (state.currentDelegation && state.currentDelegation.isDelegation) {
      description += ` (délégation de ${state.currentDelegation.delegator})`;
    }
    
    // Add validation log entry
    await grist.docApi.applyUserActions([
      ['AddRecord', VALIDATION_LOG_TABLE, null, {
        Request_Id: request.id,
        User: state.userEmail,
        Action: action,
        Description: description,
        Comment: comment
      }]
    ]);
    
    showSuccess(action === 'approve' ? t('requestApproved') : t('requestRejected'));
    closeModal(document.getElementById('modalRequestDetails'));
    
    // Reload data
    await loadData();
    renderRequestsList();
    
  } catch (error) {
    console.error('Error validating request:', error);
    showError(t('error'));
  } finally {
    showLoading(false);
  }
}

// Logging function
async function logAction(action, description, details = {}) {
  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', VALIDATION_LOG_TABLE, null, {
        User: state.userEmail,
        Action: action,
        Description: description,
        Details: JSON.stringify(details)
      }]
    ]);
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

// Helper functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showSuccess(message) {
  showToast(message, 'success');
}

function showError(message) {
  showToast(message, 'error');
}

function showInfo(message) {
  showToast(message, 'info');
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
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

// Make functions globally accessible
window.openRequestDetails = openRequestDetails;
window.handleValidation = handleValidation;
window.editWorkflowType = editWorkflowType;
