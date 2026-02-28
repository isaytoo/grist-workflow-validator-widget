# 📚 Exemples d'utilisation

## Exemple 1 : Validation de notes de frais

### Configuration du workflow

**Table WorkflowSteps** :

| id | workflow_type | step_number | step_name | validator_role | sla_hours | is_parallel |
|----|---------------|-------------|-----------|----------------|-----------|-------------|
| 1 | Note de frais | 1 | Validation manager | Manager | 48 | false |
| 2 | Note de frais | 2 | Validation DAF | DAF | 72 | false |
| 3 | Note de frais | 3 | Validation CEO | CEO | 120 | false |

### Scénario d'utilisation

1. **Soumission** (Employé)
   - Jean Dupont soumet une note de frais de 1 200€
   - Titre : "Déplacement client Paris - Mars 2026"
   - Description : "Train + Hôtel + Repas"
   - Statut : `pending`

2. **Validation Étape 1** (Manager)
   - Marie Martin (manager) reçoit la notification
   - Elle vérifie les justificatifs
   - Action : ✅ Approuve avec commentaire "Conforme"
   - La demande passe à l'étape 2

3. **Validation Étape 2** (DAF)
   - Pierre Durand (DAF) reçoit la notification
   - Montant > 500€ → validation requise
   - Action : ✅ Approuve
   - La demande passe à l'étape 3

4. **Validation Étape 3** (CEO)
   - Montant < 5000€ → étape automatiquement sautée
   - Statut final : `approved`
   - Notification envoyée à Jean Dupont

### Journal d'audit généré

```
[2026-03-15 09:30] jean.dupont@company.fr - create_request
  → Nouvelle demande: Déplacement client Paris - Mars 2026

[2026-03-15 14:20] marie.martin@company.fr - approved
  → Étape 1 approuvée - Commentaire: "Conforme"

[2026-03-16 10:15] pierre.durand@company.fr - approved
  → Étape 2 approuvée - Validation DAF

[2026-03-16 10:16] system - auto_approved
  → Étape 3 sautée (montant < 5000€)
```

---

## Exemple 2 : Demande de congés

### Configuration du workflow

**Table WorkflowSteps** :

| id | workflow_type | step_number | step_name | validator_role | sla_hours | is_parallel |
|----|---------------|-------------|-----------|----------------|-----------|-------------|
| 1 | Congés | 1 | Validation chef service | Chef service | 24 | false |
| 2 | Congés | 2 | Validation RH | RH | 48 | false |

### Scénario avec délégation

1. **Soumission** (Employé)
   - Sophie Bernard demande 2 semaines de congés en août
   - Dates : 01/08/2026 - 15/08/2026

2. **Délégation active**
   - Le chef de service (Paul Lefebvre) est en congés
   - Délégation configurée vers Anne Rousseau (chef adjoint)
   - Anne reçoit la notification à la place de Paul

3. **Validation avec délégation**
   - Anne Rousseau approuve la demande
   - Le système enregistre : "Approuvé par Anne Rousseau (délégation de Paul Lefebvre)"

4. **Validation RH**
   - Le service RH vérifie les compteurs de congés
   - Approuve la demande
   - Statut : `approved`

---

## Exemple 3 : Bon de commande avec escalade

### Configuration du workflow

**Table WorkflowSteps** :

| id | workflow_type | step_number | step_name | validator_role | sla_hours | is_parallel |
|----|---------------|-------------|-----------|----------------|-----------|-------------|
| 1 | Bon de commande | 1 | Validation manager | Manager | 48 | false |
| 2 | Bon de commande | 2 | Validation achats | Achats | 72 | false |
| 3 | Bon de commande | 3 | Validation direction | Direction | 120 | false |

### Scénario avec escalade

1. **Soumission** (Demandeur)
   - Commande de matériel informatique : 8 500€
   - Fournisseur : TechPro SARL

2. **Timeout Étape 1**
   - Le manager ne répond pas sous 48h
   - Le système envoie un rappel
   - Après 72h : escalade automatique vers le N+2

3. **Escalade**
   - La demande est escaladée au directeur
   - Email : "Demande en attente depuis 72h - Escalade automatique"
   - Le directeur approuve directement

4. **Suite du workflow**
   - La demande passe au service achats
   - Validation finale par la direction (montant > 5000€)
   - Statut : `approved`

---

## Exemple 4 : Validation parallèle (Habilitation sécurité)

### Configuration du workflow

**Table WorkflowSteps** :

| id | workflow_type | step_number | step_name | validator_role | sla_hours | is_parallel |
|----|---------------|-------------|-----------|----------------|-----------|-------------|
| 1 | Habilitation | 1 | Validation manager | Manager | 48 | true |
| 2 | Habilitation | 1 | Validation sécurité | RSSI | 48 | true |
| 3 | Habilitation | 2 | Validation DG | Direction | 72 | false |

### Scénario validation parallèle

1. **Soumission**
   - Demande d'accès à la salle serveurs
   - Niveau : Confidentiel Défense

2. **Étape 1 - Validation parallèle**
   - Le manager ET le RSSI reçoivent la notification simultanément
   - Les deux doivent approuver pour passer à l'étape 2
   - Manager approuve en 24h
   - RSSI approuve en 36h
   - ✅ Étape 1 complète quand les deux ont validé

3. **Étape 2 - Validation finale**
   - La direction reçoit la demande
   - Approuve après vérification du casier judiciaire
   - Statut : `approved`

---

## Exemple 5 : Rejet avec commentaire

### Scénario

1. **Soumission**
   - Demande de formation : 3 500€
   - Formation : "Certification AWS Solutions Architect"

2. **Rejet Étape 1**
   - Le manager rejette la demande
   - Commentaire : "Budget formation déjà dépassé ce trimestre. Reprogrammer au T2."
   - Statut : `rejected`

3. **Nouvelle soumission**
   - L'employé soumet une nouvelle demande au T2
   - Référence à la demande précédente
   - Cette fois : ✅ Approuvée

---

## Statistiques générées

Après ces 5 exemples, le dashboard afficherait :

```
📊 Demandes en attente : 0
⏱️ Délai moyen : 2.3 jours
✅ Taux d'approbation : 80% (4/5)
🎯 SLA respectés : 100%
```

---

## Structure SQL pour import rapide

```sql
-- Exemple de données pour démarrage rapide

-- WorkflowSteps
INSERT INTO WorkflowSteps (workflow_type, step_number, step_name, validator_role, sla_hours, is_parallel) VALUES
('Note de frais', 1, 'Validation manager', 'Manager', 48, 0),
('Note de frais', 2, 'Validation DAF', 'DAF', 72, 0),
('Congés', 1, 'Validation chef service', 'Chef service', 24, 0),
('Congés', 2, 'Validation RH', 'RH', 48, 0),
('Bon de commande', 1, 'Validation manager', 'Manager', 48, 0),
('Bon de commande', 2, 'Validation achats', 'Achats', 72, 0),
('Bon de commande', 3, 'Validation direction', 'Direction', 120, 0);

-- UserRoles
INSERT INTO UserRoles (email, role, department) VALUES
('jean.dupont@company.fr', 'Editor', 'Commercial'),
('marie.martin@company.fr', 'Editor', 'Management'),
('pierre.durand@company.fr', 'Owner', 'Finance'),
('sophie.bernard@company.fr', 'Editor', 'RH'),
('paul.lefebvre@company.fr', 'Editor', 'IT');
```

---

## Bonnes pratiques

### ✅ À faire
- Définir des SLA réalistes
- Documenter les workflows dans les commentaires
- Former les valideurs à l'utilisation du widget
- Mettre en place des délégations pour les absences
- Consulter régulièrement le journal d'audit

### ❌ À éviter
- Circuits de validation trop complexes (>5 étapes)
- SLA trop courts (< 24h)
- Oublier de configurer les délégations
- Modifier manuellement le journal d'audit
- Valider ses propres demandes

---

## Support

Pour plus d'exemples ou des questions :
- 📧 contact@gristup.fr
- 🌐 https://gristup.fr
- 💬 Community Grist Forum
