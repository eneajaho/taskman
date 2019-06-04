<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function store(Request $request)
    {
        $task = Task::create($request->validate([
            'title'=>'required',
            'project_id'=>'required',
        ]));

        return $task->toJson();
    }

    public function update(Task $task)
    {
        $task->is_completed = true;
        $task->update();
        return response()->json('Task updated!');
    }
}
