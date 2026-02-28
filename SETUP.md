# 🚀 Guide d'installation rapide

## Étape 1 : Créer les tables dans Grist

### Option A : Import automatique (recommandé)

Téléchargez le template Grist pré-configuré :
- [Template Workflow Validator](https://gristup.fr/templates/workflow-validator) (à venir)

### Option B : Création manuelle

#### 1. Table `Requests`

```
Nom de la table : Requests
Colonnes :
  - id (Integer, Auto-increment)
  - type (Text)
  - title (Text)
  - description (Text)
  - requester (Text)
  - status (Choice: pending, approved, rejected, cancelled)
  - created_at (DateTime)
  - completed_at (DateTime)
  - current_step (Text)
  - amount (Numeric) [optionnel]
  - priority (Choice: low, medium, high) [optionnel]
```

**Formule pour `created_at` (par défaut)** :
```python
NOW()
```

#### 2. Table `WorkflowSteps`

```
Nom de la table : WorkflowSteps
Colonnes :
  - id (Integer, Auto-increment)
  - workflow_type (Text)
  - step_number (Integer)
  - step_name (Text)
  - validator_role (Text)
  - validator_email (Text)
  - sla_hours (Integer)
  - is_parallel (Toggle)
  - condition (Text) [optionnel - ex: "amount > 1000"]
```

#### 3. Table `ValidationLog`

```
Nom de la table : ValidationLog
Colonnes :
  - id (Integer, Auto-increment)
  - request_id (Reference: Requests)
  - user (Text)
  - action (Text)
  - description (Text)
  - timestamp (DateTime)
  - details (Text)
  - comment (Text)
```

**Formule pour `timestamp` (par défaut)** :
```python
NOW()
```

#### 4. Table `Delegations` (optionnel)

```
Nom de la table : Delegations
Colonnes :
  - id (Integer, Auto-increment)
  - delegator (Text)
  - delegate (Text)
  - start_date (Date)
  - end_date (Date)
  - workflow_type (Text)
  - is_active (Toggle)
```

**Formule pour `is_active`** :
```python
from datetime import date
today = date.today()
return $start_date <= today <= $end_date
```

#### 5. Table `UserRoles` (optionnel)

```
Nom de la table : UserRoles
Colonnes :
  - id (Integer, Auto-increment)
  - email (Text)
  - role (Choice: Owner, Editor, Viewer)
  - department (Text)
  - manager_email (Text)
```

---

## Étape 2 : Ajouter le widget

### 2.1 Créer une page Custom Widget

1. Dans Grist, cliquez sur **Add New** → **Add Page**
2. Sélectionnez **Custom Widget**
3. Nommez la page : "Workflow Validator"

### 2.2 Configurer l'URL du widget

**Option A : Hébergement Vercel/Netlify (recommandé)**
```
https://votre-domaine.vercel.app/
```

**Option B : Hébergement local (développement)**
```
http://localhost:8000/
```

Pour tester en local :
```bash
cd grist-workflow-validator-widget
python3 -m http.server 8000
```

### 2.3 Configurer l'accès

- **Access** : Sélectionnez **Full document access**
- Cliquez sur **Save**

### 2.4 Mapper les colonnes

Dans les paramètres du widget, mappez les tables :

| Widget Column | Grist Table |
|---------------|-------------|
| Requests | Requests |
| WorkflowSteps | WorkflowSteps |
| ValidationLog | ValidationLog |
| Delegations | Delegations (optionnel) |
| UserRoles | UserRoles (optionnel) |

---

## Étape 3 : Configurer les workflows

### 3.1 Ajouter des types de workflow

Dans la table `WorkflowSteps`, ajoutez vos workflows :

**Exemple : Note de frais**
```
workflow_type: "Note de frais"
step_number: 1
step_name: "Validation manager"
validator_role: "Manager"
validator_email: "manager@company.fr"
sla_hours: 48
is_parallel: false
```

### 3.2 Ajouter des utilisateurs

Dans la table `UserRoles` :
```
email: "jean.dupont@company.fr"
role: "Editor"
department: "Commercial"
manager_email: "marie.martin@company.fr"
```

---

## Étape 4 : Tester le widget

### 4.1 Créer une demande test

1. Ouvrez le widget
2. Cliquez sur **Nouvelle demande**
3. Remplissez le formulaire :
   - Type : "Note de frais"
   - Titre : "Test validation"
   - Description : "Demande de test"
4. Cliquez sur **Soumettre**

### 4.2 Valider la demande

1. Cliquez sur la demande dans la liste
2. Ajoutez un commentaire (optionnel)
3. Cliquez sur **Approuver** ou **Rejeter**

### 4.3 Vérifier l'audit

1. Allez dans l'onglet **Historique**
2. Vérifiez que toutes les actions sont enregistrées

---

## Étape 5 : Configuration avancée

### 5.1 Délégations

Pour configurer une délégation d'absence :

```
delegator: "paul.lefebvre@company.fr"
delegate: "anne.rousseau@company.fr"
start_date: 2026-08-01
end_date: 2026-08-15
workflow_type: "Congés"
```

### 5.2 Workflows conditionnels

Dans `WorkflowSteps`, utilisez le champ `condition` :

```
condition: "amount > 1000"
```

Le widget évaluera cette condition pour déterminer si l'étape est requise.

### 5.3 Validation parallèle

Pour une validation parallèle (plusieurs valideurs simultanés) :

```
Étape 1a:
  step_number: 1
  is_parallel: true
  validator_role: "Manager"

Étape 1b:
  step_number: 1
  is_parallel: true
  validator_role: "RSSI"
```

Les deux doivent approuver pour passer à l'étape 2.

---

## Étape 6 : Notifications (à venir)

### Configuration webhook

Dans les paramètres du widget (futur) :

```json
{
  "webhook_url": "https://votre-api.com/notifications",
  "events": ["request_created", "request_approved", "request_rejected"],
  "email_enabled": true,
  "email_template": "default"
}
```

---

## Dépannage

### Le widget ne charge pas

1. Vérifiez que l'URL est correcte
2. Vérifiez que **Full document access** est activé
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les rôles ne sont pas détectés

1. Vérifiez que vous avez les droits nécessaires sur le document
2. Le widget utilise la détection automatique (Owner/Editor/Viewer)
3. Consultez la console pour les messages de debug

### Les demandes ne s'affichent pas

1. Vérifiez que les tables sont correctement mappées
2. Vérifiez que la table `Requests` contient des données
3. Vérifiez les filtres (statut, type)

### Les validations ne fonctionnent pas

1. Vérifiez que vous avez le rôle Editor ou Owner
2. Vérifiez que le workflow est correctement configuré dans `WorkflowSteps`
3. Consultez le journal d'audit pour voir les erreurs

---

## Sécurité

### Bonnes pratiques

✅ **À faire** :
- Utiliser HTTPS pour l'hébergement du widget
- Limiter l'accès au document Grist aux utilisateurs autorisés
- Configurer des règles d'accès Grist appropriées
- Sauvegarder régulièrement le journal d'audit
- Former les utilisateurs à l'utilisation du widget

❌ **À éviter** :
- Partager le document Grist publiquement
- Donner des droits Owner à tous les utilisateurs
- Modifier manuellement le journal d'audit
- Désactiver la traçabilité

### Conformité RGPD

Le widget est conçu pour être conforme RGPD :
- Données personnelles minimales (email uniquement)
- Traçabilité complète des actions
- Droit à l'oubli : supprimez les lignes dans les tables
- Export des données : utilisez l'export Grist standard

---

## Support

### Ressources

- 📖 Documentation complète : [README.md](README.md)
- 💡 Exemples d'utilisation : [EXAMPLE.md](EXAMPLE.md)
- 🐛 Signaler un bug : [GitHub Issues](https://github.com/isaytoo/grist-workflow-validator-widget/issues)
- 💬 Forum communautaire : [Grist Community](https://community.getgrist.com)

### Contact

- 🌐 Site web : https://gristup.fr
- 🐙 GitHub : https://github.com/isaytoo

---

**Prêt à révolutionner vos workflows de validation ! 🚀**
