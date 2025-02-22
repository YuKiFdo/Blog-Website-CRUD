<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Post routes
Route::middleware('auth:sanctum')->get('/posts', [PostController::class, 'index']);
Route::middleware('auth:sanctum')->get('/posts/{id}', [PostController::class, 'show']);
Route::middleware('auth:sanctum')->post('/posts', [PostController::class, 'store']);
Route::middleware('auth:sanctum')->put('/posts/{id}', [PostController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/posts/{id}', [PostController::class, 'destroy']);

// show auth posts
Route::middleware(['auth:sanctum'])->get('/authposts', [PostController::class, 'authindex']);



