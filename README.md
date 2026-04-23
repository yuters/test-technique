# Test technique

Full-stack IA, Laravel & VueJS

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

### Routes

| Method | URI | Name | Action |
| --- | --- | --- | --- |
| GET | `/api/brokers` | `brokers.index` | `App\Http\Controllers\BrokerController@index` |
| POST | `/api/brokers` | `brokers.store` | `App\Http\Controllers\BrokerController@store` |
| GET | `/api/brokers/{broker}` | `brokers.show` | `App\Http\Controllers\BrokerController@show` |
| GET | `/api/teams` | `teams.index` | `App\Http\Controllers\TeamController@index` |
| GET | `/api/teams/{team}` | `teams.show` | `App\Http\Controllers\TeamController@show` |
| DELETE | `/api/teams/{team}` | `teams.destroy` | `App\Http\Controllers\TeamController@destroy` |



### Installation

```bash
git clone https://github.com/yuters/test-technique.git
cd test-technique/backend
composer setup
composer dev
```
