<?php

namespace Database\Factories;

use App\Models\Broker;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
        ];
    }

    /**
     * Add a random amount of brokers to the team.
     *
     * @return $this
     */
    public function withRandomBrokers(): static
    {
        return $this->afterCreating(function (Team $team) {
            Broker::factory(rand(2, 20))->create([
                'team_id' => $team->id,
            ]);
        });
    }
}
