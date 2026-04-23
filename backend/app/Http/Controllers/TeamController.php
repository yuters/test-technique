<?php

namespace App\Http\Controllers;

use App\Actions\Teams\DeleteTeam;
use App\Models\Team;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): ResourceCollection
    {
        return Team::with('brokers')->get()->toResourceCollection();
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return $team->load('brokers')->toResource();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team, DeleteTeam $deleteTeam)
    {
        $deleteTeam->execute($team);

        return response()->noContent();
    }
}
