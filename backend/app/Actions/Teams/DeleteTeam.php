<?php

namespace App\Actions\Teams;

use App\Models\Team;
use Illuminate\Support\Facades\DB;

class DeleteTeam
{
    public function execute(Team $team)
    {
        DB::transaction(function () use ($team) {
            $team->brokers()->each(fn ($broker) => $broker->delete());
            $team->delete();
        });
    }
}
