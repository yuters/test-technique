# Test technique

Application Full-stack IA, Laravel & VueJS permettant la gestion d'équipes de courtiers.

### Installation

```bash
git clone https://github.com/yuters/test-technique.git
cd test-technique
./dev-setup.sh
```

## Architecture

### Structure principale:

```text
test-technique/
├── backend/
│   ├── app/
│   │   ├── Actions/
│   │   │   ├── Brokers/
│   │   │   │   └── CreateBroker.php
│   │   │   └── Teams/
│   │   │       └── DeleteTeam.php
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── BrokerController.php
│   │   │   │   ├── Controller.php
│   │   │   │   └── TeamController.php
│   │   │   ├── Requests/
│   │   │   │   └── StoreBrokerRequest.php
│   │   │   └── Resources/
│   │   │       ├── BrokerResource.php
│   │   │       └── TeamResource.php
│   │   └── Models/
│   │       ├── Broker.php
│   │       └── Team.php
│   └── routes/
│       └── api.php
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ConfirmAction.vue
│   │   │   ├── StateCard.vue
│   │   │   └── team/
│   │   │       └── CreateBrokerAction.vue
│   │   ├── composables/
│   │   │   └── useTeamsApi.ts
│   │   └── pages/
│   │       └── teams/
│   │           ├── [id].vue
│   │           └── index.vue
│   ├── server/
│   │   ├── api/
│   │   │   └── teams/
│   │   │       ├── [id].delete.ts
│   │   │       ├── [id].get.ts
│   │   │       ├── index.get.ts
│   │   │       └── [id]/
│   │   │           └── brokers.post.ts
│   │   └── utils/
│   │       └── backend.ts
│   ├── shared/
│   │   └── types/
│   │       ├── broker.ts
│   │       └── team.ts
```

### Routes API

| Method | URI | Name | Action |
| --- | --- | --- | --- |
| GET | `/api/brokers` | `brokers.index` | `App\Http\Controllers\BrokerController@index` |
| POST | `/api/brokers` | `brokers.store` | `App\Http\Controllers\BrokerController@store` |
| GET | `/api/brokers/{broker}` | `brokers.show` | `App\Http\Controllers\BrokerController@show` |
| GET | `/api/teams` | `teams.index` | `App\Http\Controllers\TeamController@index` |
| GET | `/api/teams/{team}` | `teams.show` | `App\Http\Controllers\TeamController@show` |
| DELETE | `/api/teams/{team}` | `teams.destroy` | `App\Http\Controllers\TeamController@destroy` |


### Utilisation de l'intelligence artificielle

#### Outils utilisés:

- Le test technique est fait entièrement avec l'aide de l'application de console Codex (OpenAI).
- Pour le backend, on utilise Laravel Boost.
- Pour le frontend, l'outil est relié au serveur MCP de Nuxt.js.

#### Exemple ou l'IA m'a aidé

La génération du code (Structure principale, styles et html) pour le frontend, et aussi pour générer les suites
de feature tests.

#### Cas d'ajustement

J'ai demandé un premier jet de la structure du frontend sans le MCP de Nuxt.js, et je pouvais bien voir que c'était pas
très génial. Après avoir chargé le MCP, ça faisait plus de sens. 