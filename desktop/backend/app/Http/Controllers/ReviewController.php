<?php
namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller {
  public function createReview(ReviewRequest $request) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    if (!$request -> user_id || !$request -> media_id || $request -> spoilers_free === null) {
      return response() -> json([
        'error' => 'user_id, media_id and spoilers_free are required'
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

  public function getAllReviews(Request $request) {
    $page = $request -> query('page', 1);
    $perPage = 10;

    $reviews = Review::paginate($perPage, ['*'], 'page', $page);

    return response() -> json([
      'reviews' => $reviews -> items(),
      'currentPage' => $reviews -> currentPage(),
      'totalPages' => $reviews -> lastPage(),
      'totalItems' => $reviews -> total(),
    ], Response::HTTP_OK);
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
      'message' => 'success',
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
}
