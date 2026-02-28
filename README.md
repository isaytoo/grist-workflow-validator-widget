# 🔄 Grist Workflow Validator Widget

Revolutionary widget for managing multi-level validation workflows in Grist, designed for public administrations and private sector.

**🌍 Available in English and French** | **⚡ Auto-setup: Tables created automatically**

## 🚀 Quick Start

1. Add a Custom Widget in Grist
2. URL: `https://isaytoo.github.io/grist-workflow-validator-widget/`
3. Access: **Full document access**
4. **Done!** Tables are created automatically on first load

No manual configuration needed - the widget creates all required tables for you.

## 🎯 Key Features

### ✅ Circuits de validation multi-niveaux
- Validation séquentielle (A → B → C) ou parallèle (A + B → C)
- Conditions de routage intelligentes (ex: si montant > 1000€ → validation N+2)
- Interface visuelle pour définir les workflows

### 🔒 Sécurité renforcée
- Détection automatique du rôle utilisateur (Owner/Editor/Viewer)
- Traçabilité immuable avec horodatage
- Séparation stricte demandeur ≠ valideur
- Verrouillage des lignes validées (read-only)
- Audit trail complet pour conformité réglementaire

### 📊 Gestion intelligente
- Délégation de pouvoir avec gestion des absences
- Escalade automatique si pas de réponse sous X jours
- Notifications à chaque étape
- Suivi des délais (SLA tracking)
- Dashboard temps réel

### 📜 Legal Traceability
- Immutable audit log (append-only)
- Complete history: who, when, why
- Digitally signed PDF export (coming soon)
- GDPR compliant

### 🌍 Multilingual
- English and French interface
- Auto-detect browser language
- Easy to add more languages

### ⚡ Auto-Setup
- **No manual configuration required**
- Tables created automatically on first load
- Pre-configured with best practices
- Ready to use in seconds

## 📋 Tables Structure (Auto-created)

The widget automatically creates these tables on first load:

### 1. `WF_Requests` - Validation Requests
- `Type` (Text) - Request type
- `Title` (Text) - Title
- `Description` (Text) - Description
- `Requester` (Text) - Requester email
- `Status` (Choice) - pending, approved, rejected, cancelled
- `Created_At` (DateTime) - Auto-filled
- `Completed_At` (DateTime) - Completion date
- `Current_Step` (Text) - Current workflow step
- `Amount` (Numeric) - Amount (for conditional routing)
- `Priority` (Choice) - low, medium, high

### 2. `WF_Steps` - Workflow Configuration
- `Workflow_Type` (Text) - Workflow type name
- `Step_Number` (Int) - Step order
- `Step_Name` (Text) - Step name
- `Validator_Role` (Text) - Validator role
- `Validator_Email` (Text) - Validator email
- `SLA_Hours` (Int) - SLA in hours
- `Is_Parallel` (Bool) - Parallel validation
- `Condition` (Text) - Conditional routing (e.g., "Amount > 1000")

### 3. `WF_ValidationLog` - Audit Trail
- `Request_Id` (Ref:WF_Requests) - Request reference
- `User` (Text) - User email
- `Action` (Text) - Action performed
- `Description` (Text) - Description
- `Timestamp` (DateTime) - Auto-filled
- `Details` (Text) - JSON details
- `Comment` (Text) - User comment

### 4. `WF_Delegations` - Delegation Management
- `Delegator` (Text) - Delegator email
- `Delegate` (Text) - Delegate email
- `Start_Date` (Date) - Start date
- `End_Date` (Date) - End date
- `Workflow_Type` (Text) - Workflow type
- `Is_Active` (Bool) - Auto-calculated (active if today is between dates)

### 5. `WF_UserRoles` - User Roles
- `Email` (Text) - User email
- `Role` (Choice) - Owner, Editor, Viewer
- `Department` (Text) - Department
- `Manager_Email` (Text) - Manager email

## 🚀 Installation (2 minutes)

1. **Add Custom Widget** in your Grist document
   - Create a new page → Custom Widget
   - URL: `https://isaytoo.github.io/grist-workflow-validator-widget/`
   - Access: **Full document access**
   - Click **Save**

2. **That's it!** 🎉
   - Tables are created automatically
   - Widget is ready to use
   - Start creating workflows

### Alternative URLs

- **GitHub Pages**: `https://isaytoo.github.io/grist-workflow-validator-widget/`
- **jsDelivr CDN**: `https://cdn.jsdelivr.net/gh/isaytoo/grist-workflow-validator-widget@main/index.html`

## 💼 Cas d'usage

### Administration publique
- ✅ Validation des demandes de subventions (3 niveaux)
- ✅ Approbation des congés médicaux (chef service → DRH)
- ✅ Validation des missions (responsable → comptabilité → président)
- ✅ Demandes d'habilitations sécurité

### Secteur privé
- ✅ Circuit de validation des achats (manager → DAF → CEO si >5k€)
- ✅ Notes de frais avec seuils
- ✅ Validation de projets
- ✅ Approbations budgétaires

### Avantages
- 📉 Réduction des erreurs humaines
- ⚡ Gain de temps (plus de validation par email)
- 👁️ Visibilité temps réel sur les workflows
- 🔗 Intégration native avec les données Grist
- 💰 Économies vs outils externes (Jira, ServiceNow)

## 🛠️ Configuration d'un workflow

### Exemple : Validation de note de frais

1. **Créer le type de workflow** dans `WorkflowSteps` :

```
Type: "Note de frais"
Étape 1: Manager direct (SLA: 48h)
Étape 2: DAF si montant > 500€ (SLA: 72h)
Étape 3: CEO si montant > 5000€ (SLA: 120h)
```

2. **Soumettre une demande** :
   - L'utilisateur crée une nouvelle demande
   - Le système route automatiquement selon les règles
   - Notifications envoyées aux valideurs

3. **Validation** :
   - Le valideur reçoit la notification
   - Il approuve ou rejette avec commentaire
   - L'action est enregistrée dans le journal d'audit
   - La demande passe à l'étape suivante ou se termine

## 🔐 Sécurité et conformité

### Détection des rôles
Le widget détecte automatiquement le rôle réel de l'utilisateur :
- **Owner** : Peut modifier la structure et les données
- **Editor** : Peut modifier les données uniquement
- **Viewer** : Lecture seule

Méthode utilisée :
1. Tentative de modification de structure → Owner ou non
2. Tentative d'écriture vide → Editor ou Viewer

### Traçabilité
- Chaque action est enregistrée avec horodatage
- Journal non modifiable (append-only)
- Identité de l'utilisateur capturée
- Commentaires obligatoires pour rejets

### Conformité RGPD
- Données personnelles minimales
- Droit à l'oubli supporté
- Export des données possible
- Audit trail pour contrôles

## 📊 Statistiques et reporting

Le widget fournit :
- Nombre de demandes en attente
- Délai moyen de traitement
- Taux d'approbation
- Respect des SLA
- Graphiques de tendances (à venir)

## 🔄 Roadmap

### Version 1.0 (actuelle)
- ✅ Gestion des demandes
- ✅ Validation simple
- ✅ Journal d'audit
- ✅ Détection des rôles
- ✅ Statistiques de base

### Version 1.1 (à venir)
- ⏳ Délégations automatiques
- ⏳ Escalade sur timeout
- ⏳ Notifications email/webhook
- ⏳ Workflows conditionnels avancés
- ⏳ Export PDF signé

### Version 2.0 (futur)
- 🔮 Interface drag-and-drop pour workflows
- 🔮 Validation parallèle
- 🔮 Intégration calendrier
- 🔮 API REST pour intégrations externes
- 🔮 Templates de workflows prédéfinis

## 📝 Licence

Copyright 2026 Said Hamadou (isaytoo)  
Licensed under the Apache License, Version 2.0

## 🔗 Liens

- Documentation : [gristup.fr](https://gristup.fr)
- GitHub : [isaytoo/grist-workflow-validator-widget](https://github.com/isaytoo/grist-workflow-validator-widget)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests

---

**Made with ❤️ for Grist community**
