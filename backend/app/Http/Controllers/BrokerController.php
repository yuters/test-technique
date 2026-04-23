<?php

namespace App\Http\Controllers;

use App\Actions\Brokers\CreateBroker;
use App\Http\Requests\StoreBrokerRequest;
use App\Models\Broker;
use Illuminate\Http\JsonResponse;

class BrokerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Broker::with('team')->get()->toResourceCollection();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrokerRequest $request, CreateBroker $createBroker): JsonResponse
    {
        return $createBroker->execute($request->all())->toResource()->response();
    }

    /**
     * Display the specified resource.
     */
    public function show(Broker $broker)
    {
        return $broker->load('team')->toResource();
    }
}
