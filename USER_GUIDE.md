# 📖 Guide Utilisateur Complet - Workflow Validator Widget

## 🌍 Guide disponible en : [English](#english-guide) | [Français](#guide-français)

---

# English Guide

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Interface Overview](#interface-overview)
4. [Core Features](#core-features)
5. [Workflow Configuration](#workflow-configuration)
6. [Creating Requests](#creating-requests)
7. [Validation Process](#validation-process)
8. [Audit Trail](#audit-trail)
9. [Statistics Dashboard](#statistics-dashboard)
10. [Advanced Features](#advanced-features)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

The **Workflow Validator Widget** is a professional tool for managing multi-level validation workflows in Grist. It's designed for organizations that need formal approval processes with complete traceability.

### Key Benefits
- ✅ **Zero Configuration**: Tables created automatically
- ✅ **Bilingual**: English and French interface
- ✅ **Secure**: Automatic role detection (Owner/Editor/Viewer)
- ✅ **Traceable**: Immutable audit log
- ✅ **Flexible**: Sequential and parallel workflows
- ✅ **Real-time**: Live dashboard and statistics

---

## Installation

### Step 1: Add the Widget to Grist

1. Open your Grist document
2. Create a new page → **Custom Widget**
3. Enter the URL: `https://grist-workflow-validator-widget.vercel.app`
4. Set access to: **Full document access**
5. Click **Save**

### Step 2: Automatic Setup

The widget automatically creates 5 tables:

| Table | Purpose |
|-------|---------|
| `WF_Requests` | Validation requests |
| `WF_Steps` | Workflow configuration |
| `WF_ValidationLog` | Audit trail |
| `WF_Delegations` | Delegation management |
| `WF_UserRoles` | User roles |

**That's it!** The widget is ready to use.

---

## Interface Overview

### Header Section

```
🔄 Workflow Validator    [🇬🇧 EN ▼]  user@example.com  [Editor]
```

- **Language Selector**: Switch between English and French
- **User Email**: Your email address
- **User Role**: Your access level (Owner/Editor/Viewer)

### Main Tabs

1. **Requests** - View and manage validation requests
2. **Configuration** - Set up workflow types and steps
3. **History** - View audit log
4. **Statistics** - Dashboard with KPIs

---

## Core Features

### 1. Request Management

**What you can do:**
- Create new validation requests
- View all requests with filters
- Track request status in real-time
- Approve or reject requests
- Add comments to validations

**Request Statuses:**
- 🟡 **Pending** - Awaiting validation
- 🟢 **Approved** - Request approved
- 🔴 **Rejected** - Request rejected
- ⚫ **Cancelled** - Request cancelled

### 2. Workflow Configuration

**What you can do:**
- Define workflow types (e.g., "Expense Report", "Leave Request")
- Configure validation steps for each type
- Set validators for each step
- Define SLA (Service Level Agreement) in hours
- Enable parallel validation (multiple validators at once)
- Add conditional routing (e.g., "if amount > 1000")

### 3. Audit Trail

**What you can do:**
- View complete history of all actions
- Filter by date, user, or action type
- Export audit logs for compliance
- Verify who did what and when

**Logged Actions:**
- Request creation
- Approvals and rejections
- Comments added
- Status changes
- Delegations

### 4. Statistics Dashboard

**What you can see:**
- Number of pending requests
- Average processing time
- Approval rate
- SLA compliance rate

---

## Workflow Configuration

### Creating a Workflow Type

**Example: Expense Report Workflow**

1. Go to **Configuration** tab
2. Click **Add type**
3. Enter workflow name: "Expense Report"
4. Click **Save**

### Defining Validation Steps

**Example: 3-level validation**

| Step | Name | Validator | SLA | Condition |
|------|------|-----------|-----|-----------|
| 1 | Manager Approval | manager@company.com | 48h | - |
| 2 | Finance Approval | finance@company.com | 72h | amount > 500 |
| 3 | CEO Approval | ceo@company.com | 120h | amount > 5000 |

**How to configure:**

1. In `WF_Steps` table, add a row:
   - `Workflow_Type`: "Expense Report"
   - `Step_Number`: 1
   - `Step_Name`: "Manager Approval"
   - `Validator_Email`: "manager@company.com"
   - `SLA_Hours`: 48
   - `Is_Parallel`: false
   - `Condition`: (leave empty for step 1)

2. Repeat for steps 2 and 3 with their respective conditions

### Sequential vs Parallel Validation

**Sequential** (default):
```
Step 1 → Step 2 → Step 3
```
Each step waits for the previous one to complete.

**Parallel** (set `Is_Parallel` = true):
```
Step 1a ┐
        ├→ Step 2
Step 1b ┘
```
Multiple validators must approve simultaneously.

**Example: Security Clearance**
- Step 1a: Manager approval (parallel)
- Step 1b: Security officer approval (parallel)
- Step 2: HR final approval (sequential)

Both 1a and 1b must approve before moving to step 2.

### Conditional Routing

Use the `Condition` field to route requests based on data:

**Examples:**
- `amount > 1000` - Only if amount exceeds 1000
- `priority == 'high'` - Only for high priority
- `department == 'IT'` - Only for IT department

If condition is false, the step is skipped automatically.

---

## Creating Requests

### Step-by-Step Guide

1. **Click "New Request"** button
2. **Select Type**: Choose from configured workflows
3. **Enter Title**: Brief description (e.g., "March 2026 Expenses")
4. **Add Description**: Detailed information
5. **Fill Custom Fields**: Amount, priority, etc.
6. **Click "Submit"**

### What Happens Next

1. Request is created with status "Pending"
2. First validator receives notification (future feature)
3. Request appears in validator's pending list
4. Audit log records the creation

### Example: Expense Report

```
Type: Expense Report
Title: Client Meeting - Paris
Description: Train tickets + Hotel + Meals
Amount: 1,200 €
Priority: Medium
```

**Workflow triggered:**
1. Manager approval (48h SLA)
2. Finance approval (72h SLA) - because amount > 500
3. CEO approval skipped - because amount < 5000

---

## Validation Process

### For Validators

**How to validate a request:**

1. Go to **Requests** tab
2. Click on a pending request
3. Review details and history
4. Add a comment (optional but recommended)
5. Click **Approve** or **Reject**

### Validation Actions

**Approve:**
- Request moves to next step
- If last step, status becomes "Approved"
- Action logged in audit trail

**Reject:**
- Request status becomes "Rejected"
- No further steps executed
- Rejection reason logged

**Comment:**
- Always visible in request history
- Helps track decision rationale
- Required for rejections (best practice)

### Example Validation Flow

**Request: Leave Request (10 days)**

```
Day 1, 9:00 AM - Employee submits request
Day 1, 2:00 PM - Manager approves (Comment: "Approved, team coverage OK")
Day 2, 10:00 AM - HR approves (Comment: "Leave balance verified")
Status: Approved
```

**Audit Trail:**
```
[2026-03-15 09:00] john.doe@company.com - create_request
  → New request: Summer Vacation 2026

[2026-03-15 14:00] manager@company.com - approved
  → Step 1 approved - Comment: "Approved, team coverage OK"

[2026-03-16 10:00] hr@company.com - approved
  → Step 2 approved - Comment: "Leave balance verified"
```

---

## Audit Trail

### What is Logged

**Every action is recorded:**
- User email
- Timestamp (server time)
- Action type
- Description
- Additional details (JSON)
- User comments

### Immutability

The audit log is **append-only**:
- ✅ New entries can be added
- ❌ Existing entries cannot be modified
- ❌ Entries cannot be deleted

This ensures **legal compliance** and **traceability**.

### Filtering Audit Logs

**By Date:**
1. Go to **History** tab
2. Select date range (From/To)
3. Click **Filter**

**By User:**
1. Enter user email in search box
2. Click **Filter**

**By Action:**
- View all actions or filter by type
- Export to CSV for external analysis

### Compliance Use Cases

**ISO 27001:**
- Track all access to sensitive data
- Prove who approved what and when

**GDPR:**
- Demonstrate data processing authorization
- Provide audit trail for data subject requests

**SOX (Sarbanes-Oxley):**
- Financial approval audit trail
- Segregation of duties verification

---

## Statistics Dashboard

### Key Performance Indicators (KPIs)

**1. Pending Requests**
- Number of requests awaiting validation
- Real-time count
- Click to filter pending requests

**2. Average Delay**
- Mean time from creation to completion
- Measured in days
- Helps identify bottlenecks

**3. Approval Rate**
- Percentage of approved vs rejected requests
- Formula: (Approved / Total) × 100
- Indicates process efficiency

**4. SLA Respected**
- Percentage of requests completed within SLA
- Formula: (On-time / Total) × 100
- Measures validator responsiveness

### Using Statistics

**Identify Bottlenecks:**
```
If Average Delay > Expected:
→ Check which step takes longest
→ Consider adding more validators
→ Review SLA settings
```

**Improve Approval Rate:**
```
If Approval Rate < 80%:
→ Review rejection reasons
→ Improve request guidelines
→ Train requesters
```

**Monitor SLA Compliance:**
```
If SLA Respected < 95%:
→ Send reminders to validators
→ Enable escalation (future feature)
→ Adjust SLA hours
```

---

## Advanced Features

### 1. Delegation Management

**Use Case:** Manager on vacation

**Setup:**
1. Add row in `WF_Delegations` table:
   - `Delegator`: "manager@company.com"
   - `Delegate`: "deputy@company.com"
   - `Start_Date`: 2026-08-01
   - `End_Date`: 2026-08-15
   - `Workflow_Type`: "Leave Request"

2. During this period:
   - Deputy receives validation requests
   - Audit log shows: "Approved by deputy@company.com (delegation from manager@company.com)"

**Auto-calculation:**
- `Is_Active` field automatically checks if today is between start and end dates

### 2. User Roles

**Purpose:** Map users to organizational roles

**Setup in `WF_UserRoles` table:**

| Email | Role | Department | Manager_Email |
|-------|------|------------|---------------|
| john@company.com | Editor | Sales | manager@company.com |
| manager@company.com | Editor | Management | ceo@company.com |
| ceo@company.com | Owner | Executive | - |

**Benefits:**
- Automatic role detection
- Organizational hierarchy
- Delegation routing

### 3. Priority Levels

**Configure in requests:**
- **Low**: Standard processing
- **Medium**: Normal priority
- **High**: Urgent, requires fast-track

**Use in workflows:**
```
Condition: priority == 'high'
→ Skip step 1, go directly to step 2
```

### 4. Amount-Based Routing

**Example: Purchase Orders**

| Amount | Validator | Rationale |
|--------|-----------|-----------|
| < 500€ | Manager | Standard approval |
| 500-5000€ | Finance | Budget control |
| > 5000€ | CEO | Strategic decision |

**Configuration:**
```
Step 1: Manager (no condition)
Step 2: Finance (condition: amount > 500)
Step 3: CEO (condition: amount > 5000)
```

---

## Best Practices

### 1. Workflow Design

**✅ DO:**
- Keep workflows simple (3-5 steps max)
- Use clear, descriptive names
- Set realistic SLA times
- Document workflow purpose

**❌ DON'T:**
- Create overly complex workflows (>7 steps)
- Use technical jargon in names
- Set impossible SLA (<24h for non-urgent)
- Skip documentation

### 2. Request Creation

**✅ DO:**
- Provide detailed descriptions
- Attach supporting documents (future feature)
- Use consistent naming conventions
- Fill all required fields

**❌ DON'T:**
- Submit incomplete requests
- Use vague titles like "Request 1"
- Skip description field
- Forget to set priority

### 3. Validation

**✅ DO:**
- Review requests promptly
- Add meaningful comments
- Explain rejection reasons
- Respect SLA deadlines

**❌ DON'T:**
- Approve without reviewing
- Reject without explanation
- Ignore SLA warnings
- Validate your own requests

### 4. Audit Trail

**✅ DO:**
- Regularly review audit logs
- Export logs for compliance
- Investigate anomalies
- Keep logs for required retention period

**❌ DON'T:**
- Attempt to modify logs
- Delete audit entries
- Ignore suspicious activities
- Share logs publicly

### 5. Security

**✅ DO:**
- Use role-based access control
- Enable Grist access rules
- Regularly review user permissions
- Train users on security

**❌ DON'T:**
- Share Owner access widely
- Allow self-validation
- Disable audit logging
- Ignore security warnings

---

## Troubleshooting

### Common Issues

**1. Tables not created automatically**

**Symptoms:**
- Widget shows "Required columns" error
- No `WF_*` tables in document

**Solution:**
1. Refresh the page
2. Check browser console (F12) for errors
3. Verify widget URL is correct
4. Ensure "Full document access" is enabled

**2. Duplicate tables created**

**Symptoms:**
- Multiple `WF_Requests` tables
- Widget creates tables on each reload

**Solution:**
1. Delete duplicate tables (keep only one set)
2. Update to latest widget version
3. Refresh the page

**3. Language selector not working**

**Symptoms:**
- Interface stays in one language
- Selector doesn't change text

**Solution:**
1. Clear browser cache
2. Check localStorage is enabled
3. Refresh the page

**4. Validation buttons disabled**

**Symptoms:**
- Cannot approve/reject requests
- Buttons are grayed out

**Possible causes:**
- You are a Viewer (read-only access)
- Request is already completed
- You are the requester (self-validation blocked)

**Solution:**
1. Check your role in header
2. Verify request status
3. Ask Owner to grant Editor access

**5. SLA not calculating correctly**

**Symptoms:**
- SLA shows 0% or incorrect value
- Average delay is wrong

**Possible causes:**
- Missing `Completed_At` dates
- Incorrect date formats

**Solution:**
1. Verify `Completed_At` is filled for completed requests
2. Check date format is ISO 8601 (YYYY-MM-DD)

---

## FAQ

**Q: Can I customize the workflow types?**
A: Yes! Add any workflow type in the `WF_Steps` table.

**Q: How many validation steps can I have?**
A: Technically unlimited, but we recommend 3-5 steps for efficiency.

**Q: Can I delete a request?**
A: Yes, but it will remain in the audit log for traceability.

**Q: Is the audit log really immutable?**
A: Yes, it's append-only. Even Owners cannot modify past entries.

**Q: Can I export data?**
A: Yes, use Grist's standard export features (CSV, Excel).

**Q: Does it work offline?**
A: No, it requires internet connection to sync with Grist.

**Q: Can I integrate with other tools?**
A: Future feature: webhooks for notifications and integrations.

**Q: Is it GDPR compliant?**
A: Yes, with proper Grist access controls and data retention policies.

---

# Guide Français

## 📑 Table des Matières

1. [Introduction](#introduction-fr)
2. [Installation](#installation-fr)
3. [Vue d'ensemble](#vue-densemble)
4. [Fonctionnalités](#fonctionnalités)
5. [Configuration des Workflows](#configuration-des-workflows)
6. [Création de Demandes](#création-de-demandes)
7. [Processus de Validation](#processus-de-validation)
8. [Journal d'Audit](#journal-daudit)
9. [Tableau de Bord](#tableau-de-bord)
10. [Fonctionnalités Avancées](#fonctionnalités-avancées)
11. [Bonnes Pratiques](#bonnes-pratiques-fr)
12. [Dépannage](#dépannage)

---

## Introduction (FR)

Le **Widget Workflow Validator** est un outil professionnel pour gérer des circuits de validation multi-niveaux dans Grist. Il est conçu pour les organisations nécessitant des processus d'approbation formels avec traçabilité complète.

### Avantages Clés
- ✅ **Zéro Configuration**: Tables créées automatiquement
- ✅ **Bilingue**: Interface en français et anglais
- ✅ **Sécurisé**: Détection automatique des rôles
- ✅ **Traçable**: Journal d'audit immuable
- ✅ **Flexible**: Workflows séquentiels et parallèles
- ✅ **Temps Réel**: Dashboard et statistiques en direct

---

## Installation (FR)

### Étape 1: Ajouter le Widget à Grist

1. Ouvrez votre document Grist
2. Créez une nouvelle page → **Custom Widget**
3. Entrez l'URL: `https://grist-workflow-validator-widget.vercel.app`
4. Définissez l'accès à: **Accès complet au document**
5. Cliquez sur **Enregistrer**

### Étape 2: Configuration Automatique

Le widget crée automatiquement 5 tables:

| Table | Objectif |
|-------|----------|
| `WF_Requests` | Demandes de validation |
| `WF_Steps` | Configuration des workflows |
| `WF_ValidationLog` | Journal d'audit |
| `WF_Delegations` | Gestion des délégations |
| `WF_UserRoles` | Rôles utilisateurs |

**C'est tout!** Le widget est prêt à l'emploi.

---

## Vue d'Ensemble

### Section En-tête

```
🔄 Validateur de Workflow    [🇫🇷 FR ▼]  user@example.com  [Éditeur]
```

- **Sélecteur de Langue**: Basculer entre français et anglais
- **Email Utilisateur**: Votre adresse email
- **Rôle Utilisateur**: Votre niveau d'accès

### Onglets Principaux

1. **Demandes** - Voir et gérer les demandes
2. **Configuration** - Configurer les types de workflows
3. **Historique** - Voir le journal d'audit
4. **Statistiques** - Tableau de bord avec KPIs

---

*[Le reste du guide français suit la même structure que la version anglaise avec les traductions appropriées]*

---

## Support

Pour toute question ou assistance:
- 🌐 Site web: https://gristup.fr
- 📖 GitHub: https://github.com/isaytoo/grist-workflow-validator-widget
- 💬 Forum: community.getgrist.com

---

**Made with ❤️ for Grist community**  
**Copyright 2026 Said Hamadou (isaytoo)**
