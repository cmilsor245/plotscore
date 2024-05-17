<?php
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('create-admin', [AuthController::class, 'createAdmin']);

Route::post('signup', [AuthController::class, 'signup']);
Route::get('user', [AuthController::class, 'user']);
