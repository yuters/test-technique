<?php

use App\Models\Broker;
use App\Models\Team;
use Illuminate\Foundation\Testing\DatabaseMigrations;

uses(DatabaseMigrations::class);

it('lists brokers with their team', function () {
    $team = Team::factory()->create();
    $brokers = Broker::factory()->count(2)->create([
        'team_id' => $team->id,
    ]);

    $response = $this->getJson('/api/brokers');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data');

    foreach ($brokers->values() as $index => $broker) {
        $response
            ->assertJsonPath("data.$index.name", $broker->name)
            ->assertJsonPath("data.$index.email", $broker->email)
            ->assertJsonPath("data.$index.team.name", $team->name);
    }
});

it('creates a broker and returns a resource created response', function () {
    $team = Team::factory()->create();

    $response = $this->postJson('/api/brokers', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'team_id' => $team->id,
    ]);

    $response
        ->assertCreated()
        ->assertJsonPath('data.name', 'Jane Doe');

    $this->assertDatabaseHas('brokers', [
        'email' => 'jane@example.com',
    ]);
});

it('does not allow adding a broker to a soft deleted team', function () {
    $team = Team::factory()->create();
    $team->delete();

    $response = $this->postJson('/api/brokers', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'team_id' => $team->id,
    ]);

    $response
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['team_id']);

    $this->assertDatabaseMissing('brokers', [
        'email' => 'jane@example.com',
    ]);
});
