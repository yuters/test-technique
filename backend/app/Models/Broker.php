<?php

namespace App\Models;

use Database\Factories\BrokerFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['name', 'email', 'team_id'])]
class Broker extends Model
{
    /* @use HasFactory<BrokerFactory> */
    use HasFactory;
    use SoftDeletes;

    /**
     * This broker belongs to a team.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
