# 🔄 Grist Workflow Validator Widget

Widget révolutionnaire pour la gestion des circuits de validation dans Grist, conçu pour les administrations et le secteur privé.

## 🎯 Fonctionnalités principales

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

### 📜 Traçabilité légale
- Journal d'audit non modifiable (append-only log)
- Historique complet : qui, quand, pourquoi
- Export PDF signé numériquement (à venir)
- Conformité RGPD

## 📋 Structure des tables Grist requises

### 1. Table `Requests` (Demandes)
Colonnes requises :
- `id` (Integer) - ID auto
- `type` (Text) - Type de demande
- `title` (Text) - Titre
- `description` (Text) - Description
- `requester` (Text) - Email du demandeur
- `status` (Choice) - pending, approved, rejected, cancelled
- `created_at` (DateTime) - Date de création
- `completed_at` (DateTime) - Date de finalisation
- `current_step` (Text) - Étape actuelle

### 2. Table `WorkflowSteps` (Étapes du workflow)
Colonnes requises :
- `id` (Integer) - ID auto
- `workflow_type` (Text) - Type de workflow
- `step_number` (Integer) - Numéro d'ordre
- `step_name` (Text) - Nom de l'étape
- `validator_role` (Text) - Rôle du valideur
- `validator_email` (Text) - Email du valideur
- `sla_hours` (Integer) - Délai en heures
- `is_parallel` (Toggle) - Validation parallèle

### 3. Table `ValidationLog` (Journal de validation)
Colonnes requises :
- `id` (Integer) - ID auto
- `request_id` (Reference:Requests) - Référence à la demande
- `user` (Text) - Email de l'utilisateur
- `action` (Text) - Action effectuée
- `description` (Text) - Description
- `timestamp` (DateTime) - Horodatage
- `details` (Text) - Détails JSON
- `comment` (Text) - Commentaire

### 4. Table `Delegations` (Délégations) - Optionnel
Colonnes :
- `id` (Integer) - ID auto
- `delegator` (Text) - Email du délégant
- `delegate` (Text) - Email du délégataire
- `start_date` (Date) - Date de début
- `end_date` (Date) - Date de fin
- `workflow_type` (Text) - Type de workflow concerné

### 5. Table `UserRoles` (Rôles utilisateurs) - Optionnel
Colonnes :
- `id` (Integer) - ID auto
- `email` (Text) - Email utilisateur
- `role` (Choice) - Owner, Editor, Viewer
- `department` (Text) - Service

## 🚀 Installation

1. **Créer les tables** dans votre document Grist selon la structure ci-dessus

2. **Ajouter le widget** :
   - Créer une nouvelle page Custom Widget
   - URL : `https://votre-url/index.html`
   - Accès : Full document access

3. **Mapper les colonnes** :
   - Requests → Table des demandes
   - WorkflowSteps → Table des étapes workflow
   - ValidationLog → Table du journal de validation
   - Delegations → Table des délégations (optionnel)
   - UserRoles → Table des rôles (optionnel)

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
