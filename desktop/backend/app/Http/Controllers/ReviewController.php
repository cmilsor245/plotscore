<?php
namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Media;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller {
  public function createReview(ReviewRequest $request) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    if (!$request -> user_id || !$request -> media_id) {
      return response() -> json([
        'error' => 'user_id, media_id and contains_spoilers are required'
      ], Response::HTTP_BAD_REQUEST);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> id !== $request -> user_id) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $review = Review::create($request -> all());

    return response() -> json($review, Response::HTTP_CREATED);
  }

  public function getReview($id) {
    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    return response() -> json($review, Response::HTTP_OK);
  }

  public function getAllReviewsForUser($id) {
    $reviews = Review::where('user_id', $id) -> get();

    if ($reviews -> count() === 0) {
      $totalReviews = 0;
    } else {
      $totalReviews = $reviews -> count();
    }

    return response() -> json([
      'reviews' => $reviews,
      'totalReviews' => $totalReviews
    ], Response::HTTP_OK);
  }

  // public function getUserLinkedToReview($reviewId) {
  //   $review = Review::find($reviewId);

  //   if (!$review) {
  //     return response() -> json([
  //       'error' => 'review not found'
  //     ], Response::HTTP_NOT_FOUND);
  //   }

  //   $userId = $review -> user_id;

  //   $user = User::find($userId);

  //   if (!$user) {
  //     return response() -> json([
  //       'error' => 'user not found'
  //     ], Response::HTTP_NOT_FOUND);
  //   }

  //   return response() -> json($user, Response::HTTP_OK);
  // }

  // public function getMediaLinkedToReview($reviewId) {
  //   $review = Review::find($reviewId);

  //   if (!$review) {
  //     return response() -> json([
  //       'error' => 'review not found'
  //     ], Response::HTTP_NOT_FOUND);
  //   }

  //   $mediaId = $review -> media_id;

  //   $media = Media::find($mediaId);

  //   if (!$media) {
  //     return response() -> json([
  //       'error' => 'media not found'
  //     ], Response::HTTP_NOT_FOUND);
  //   }

  //   return response() -> json($media, Response::HTTP_OK);
  // }

  public function getThisYearReviewsForUser($id) {
    $reviews = Review::where('user_id', $id)
      -> whereYear('watched_on', date('Y'))
      -> get();

    if ($reviews -> isEmpty()) {
      $totalReviews = 0;
    } else {
      $totalReviews = $reviews -> count();
    }

    return response() -> json([
      'reviews' => $reviews,
      'totalReviews' => $totalReviews
    ], Response::HTTP_OK);
  }

  public function getAllReviews(Request $request) {
    // $page = $request -> query('page', 1);
    // $perPage = 10;

    // $reviews = Review::paginate($perPage, ['*'], 'page', $page);

    // return response() -> json([
    //   'reviews' => $reviews -> items(),
    //   'currentPage' => $reviews -> currentPage(),
    //   'totalPages' => $reviews -> lastPage(),
    //   'totalItems' => $reviews -> total()
    // ], Response::HTTP_OK);

    $reviewsWithoutPagination = Review::all();

    return response() -> json([
      'reviews' => $reviewsWithoutPagination
    ], Response::HTTP_OK);

    return response() -> json($reviewsWithoutPagination, Response::HTTP_OK);
  }

  public function updateReview(Request $request, $id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> id !== $request -> user_id) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $review -> update($request -> all());

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function deleteReview(Request $request, $id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> id !== $request -> user_id && $authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $review -> delete();

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  /* --------------------------------------------------------------------------------- */

  public function newOnPlotscore() {
    $reviews = Review::with(['user', 'media']) -> orderBy('created_at', 'desc') -> limit(6) -> get();

    return response() -> json($reviews, Response::HTTP_OK);
  }
}
