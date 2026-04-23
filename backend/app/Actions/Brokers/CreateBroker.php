<?php

namespace App\Actions\Brokers;

use App\Models\Broker;

class CreateBroker
{
    public function execute(array $data)
    {
        return Broker::create($data);
    }
}
