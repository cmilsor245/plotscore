<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('create-admin', [AuthController::class, 'createAdmin']);
Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum') -> group(function () {
  Route::get('user', [AuthController::class, 'user']);
  Route::post('logout', [AuthController::class, 'logout']);
});
