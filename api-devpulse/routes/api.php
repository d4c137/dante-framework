<?php

use Illuminate\Support\Facades\Route;
use App\Models\Project;

// Esta é a rota que o seu React vai chamar no localhost:8000/api/projects
Route::get('/projects', function () {
    return Project::all();
});