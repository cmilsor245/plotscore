<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller {
  public function likeReview($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $user = auth() -> user();

    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if ($user -> likedReviews() -> where('review_id', $id) -> exists()) {
      return response() -> json([
        'error' => 'you have already liked this review'
      ], Response::HTTP_BAD_REQUEST);
    }

    $user -> likedReviews() -> attach($review -> id);

    $review -> like_count++;

    $user -> save();
    $review -> save();

    return response() -> json([
      'message' => 'like added successfully'
    ], Response::HTTP_OK);
  }

  public function unlikeReview($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $user = auth() -> user();

    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if (!$user -> likedReviews() -> where('review_id', $id) -> exists()) {
      return response() -> json([
        'error' => 'you have not liked this review'
      ], Response::HTTP_BAD_REQUEST);
    }

    $user -> likedReviews() -> detach($review -> id);

    $review -> like_count--;

    $user -> save();
    $review -> save();

    return response() -> json([
      'message' => 'like removed successfully'
    ], Response::HTTP_OK);
  }

  // ! not working
  public function checkIfAlreadyLiked($reviewId) {
    $user = auth() -> user();

    $review = Review::find($reviewId);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if ($user -> likedReviews() -> where('review_id', $reviewId) -> exists()) {
      return response() -> json([
        'liked' => true
      ], Response::HTTP_OK);
    }

    return response() -> json([
      'liked' => false
    ], Response::HTTP_OK);
  }
}
