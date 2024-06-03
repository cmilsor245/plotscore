<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::post('create-admin', [AuthController::class, 'createAdmin']);
Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('user', [AuthController::class, 'user']);
  Route::post('logout', [AuthController::class, 'logout']);

  Route::get('all-users', [AuthController::class, 'getAllUsers']);
  Route::put('update-user/{id}', [AuthController::class, 'updateUser']);
  Route::delete('delete-user/{id}', [AuthController::class, 'deleteUser']);

  Route::get('all-media', [MediaController::class, 'getAllMedia']);
  Route::get('media/{id}', [MediaController::class, 'getMediaById']);
  Route::post('create-media', [MediaController::class, 'createMedia']);
  Route::put('update-media/{id}', [MediaController::class, 'updateMedia']);
  Route::delete('delete-media/{id}', [MediaController::class, 'deleteMedia']);

  Route::get('all-reviews', [ReviewController::class, 'getAllReviews']);
  Route::get('review/{id}', [ReviewController::class, 'getReviewById']);
  Route::post('create-review', [ReviewController::class, 'createReview']);
  Route::put('update-review/{id}', [ReviewController::class, 'updateReview']);
  Route::delete('delete-review/{id}', [ReviewController::class, 'deleteReview']);

  Route::post('follow/{id}', [FollowController::class, 'followUser']);
  Route::delete('unfollow/{id}', [FollowController::class, 'unfollowUser']);
});
