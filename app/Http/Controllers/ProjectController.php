<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{

    public function index()
    {
        $projects = Project::where('is_completed', false)
            ->orderBy('created_at', 'desc')
            ->withCount(['tasks' => function ($query) {
                $query->where('is_completed', false);
            }])
            ->get();
        return $projects->toJson();
    }

    public function store(Request $request)
    {
        Project::create($request->validate([
            'name'=>'required',
            'description'=>'required',
        ]));

        return response()->json('Project created!');
    }

    public function show($id)
    {
        $project = Project::with(['tasks' => function ($query) {
            $query->where('is_completed', false);
        }])->find($id);

        return $project->toJson();
    }

    public function update(Project $project)
    {
        $project->is_completed = true;
        $project->update();
        return response()->json('Project updated!');
    }

}
