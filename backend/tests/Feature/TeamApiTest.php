<?php

use App\Models\Broker;
use App\Models\Team;
use Illuminate\Foundation\Testing\DatabaseMigrations;

uses(DatabaseMigrations::class);

it('lists teams with their brokers', function () {
    $teams = Team::factory()
        ->count(2)
        ->withRandomBrokers()
        ->create();

    $response = $this->getJson('/api/teams');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('data.0.name', $teams[0]->name)
        ->assertJsonPath('data.1.name', $teams[1]->name);

    foreach ($teams as $index => $team) {
        $team->load('brokers');

        $response->assertJsonCount($team->brokers->count(), "data.$index.brokers");

        foreach ($team->brokers->sortBy('name')->values() as $brokerIndex => $broker) {
            $response
                ->assertJsonPath("data.$index.brokers.$brokerIndex.name", $broker->name)
                ->assertJsonPath("data.$index.brokers.$brokerIndex.email", $broker->email);
        }
    }
});

it('deletes a team with its brokers using soft deletes and returns 204', function () {
    $team = Team::factory()->create();
    $brokers = Broker::factory()->count(2)->create([
        'team_id' => $team->id,
    ]);

    $this->deleteJson("/api/teams/{$team->id}")
        ->assertNoContent();

    $this->assertSoftDeleted($team);

    foreach ($brokers as $broker) {
        $this->assertSoftDeleted($broker);
    }
});
