<?php

use App\Http\Controllers\BrokerController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::apiResource('teams', TeamController::class)
    ->only([
        'index',
        'show',
        'destroy',
    ]);

Route::apiResource('brokers', BrokerController::class)
    ->only([
        'index',
        'show',
        'store',
    ]);
