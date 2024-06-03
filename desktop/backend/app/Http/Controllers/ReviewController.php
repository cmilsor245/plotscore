<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller {
  public function createReview(Request $request) {
    $review = Review::create($request -> all());

    return response() -> json($review, Response::HTTP_CREATED);
  }

  public function updateReview(Request $request, $id) {
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

  public function deleteReview($id) {
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

  public function getReview($id) {
    $review = Review::find($id);

    if (!$review) {
      return response() -> json([
        'error' => 'review not found'
      ], Response::HTTP_NOT_FOUND);
    }

    return response() -> json($review, Response::HTTP_OK);
  }
}
