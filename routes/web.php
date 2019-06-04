<?php


Route::get('/projects', 'ProjectController@index');
Route::post('projects', 'ProjectController@store');
Route::get('projects/{id}', 'ProjectController@show');
Route::put('projects/{project}', 'ProjectController@update');
Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@update');

Route::view('/{path?}', 'app');
