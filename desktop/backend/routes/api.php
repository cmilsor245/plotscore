<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SearchController;
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

  /* ------------------------------------------------ */

  Route::post('create-media', [MediaController::class, 'createMedia']);

  Route::get('get-media-for-review', [MediaController::class, 'getMediaForReview']);

  Route::put('update-media/{id}', [MediaController::class, 'updateMedia']);
  Route::delete('delete-media/{id}', [MediaController::class, 'deleteMedia']);

  /* ------------------------------------------------ */

  Route::post('create-review', [ReviewController::class, 'createReview']);

  Route::put('update-review/{id}', [ReviewController::class, 'updateReview']);
  Route::delete('delete-review/{id}', [ReviewController::class, 'deleteReview']);

  /* ------------------------------------------------ */

  Route::post('like-review/{id}', [LikeController::class, 'likeReview']);
  Route::delete('unlike-review/{id}', [LikeController::class, 'unlikeReview']);

  /* ------------------------------------------------ */

  Route::post('follow/{id}', [FollowController::class, 'followUser']);
  Route::delete('unfollow/{id}', [FollowController::class, 'unfollowUser']);
  Route::get('check-if-following/{id}', [FollowController::class, 'checkIfFollowing']);
});

Route::get('user/{id}', [AuthController::class, 'getUser']);
Route::get('get-user-by-username/{username}', [AuthController::class, 'getUserByUsername']);

Route::get('media/{id}', [MediaController::class, 'getMedia']);
Route::get('all-media', [MediaController::class, 'getAllMedia']);

Route::get('review/{id}', [ReviewController::class, 'getReview']);
Route::get('all-reviews', [ReviewController::class, 'getAllReviews']);
Route::get('get-all-reviews-for-user/{id}', [ReviewController::class, 'getAllReviewsForUser']);
// Route::get('get-user-linked-to-review/{id}', [ReviewController::class, 'getUserLinkedToReview']);
// Route::get('get-media-linked-to-review/{id}', [ReviewController::class, 'getMediaLinkedToReview']);
Route::get('get-this-year-reviews-for-user/{id}', [ReviewController::class, 'getThisYearReviewsForUser']);
Route::get('new-on-plotscore', [ReviewController::class, 'newOnPlotscore']);

Route::get('check-if-already-liked/{id}', [LikeController::class, 'checkIfAlreadyLiked']);

Route::get('get-followers/{id}', [FollowController::class, 'getFollowers']);
Route::get('get-following/{id}', [FollowController::class, 'getFollowing']);

Route::get('get-user-and-or-media/{searchTerm}', [SearchController::class, 'getUserAndOrMedia']);
