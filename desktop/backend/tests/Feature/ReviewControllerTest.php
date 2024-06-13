<?php
namespace Tests\Feature;

use App\Models\Media;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ReviewControllerTest extends TestCase {
  use RefreshDatabase;
  use WithFaker;

  public function setUp(): void {
    parent::setUp();
  }

  public function test_create_review_successful() {
    $this -> withoutExceptionHandling();

    $user = User::factory() -> create();
    $media = Media::factory() -> create();

    $response = $this -> actingAs($user) -> postJson('/api/create-review', [
      'user_id' => $user -> id,
      'user_username' => $user -> username,
      'user_avatar' => $user -> avatar,

      'media_id' => $media -> id,
      'media_title' => $media -> title,
      'media_release_date' => $media -> release_date,
      'media_poster' => $media -> poster,

      'rating' => 4.5,

      'review_text' => 'test review',

      'contains_spoilers' => false,
      'watched_on' => '2023-06-01',
      'watched_before' => true
    ]);

    $response -> assertStatus(Response::HTTP_CREATED)
      -> assertJsonStructure([
        'id',

        'user_id',
        'user_username',
        'user_avatar',

        'media_id',
        'media_title',
        'media_release_date',
        'media_poster',

        'rating',

        'review_text',

        'contains_spoilers',
        'watched_on',
        'watched_before'
      ]);
  }

  public function test_create_review_unauthorized() {
    $response = $this -> postJson('/api/create-review', [
      'user_id' => 1,

      'media_id' => 1,

      'rating' => 4.5,

      'review_text' => 'test review',

      'contains_spoilers' => false,
      'watched_on' => '2023-06-01'
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_create_review_missing_required_fields() {
    $user = User::factory() -> create();
    $media = Media::factory() -> create();

    $response = $this -> actingAs($user) -> postJson('/api/create-review', [
      'user_username' => $user -> username,
      'user_avatar' => $user -> avatar,

      'media_id' => $media -> id,
      'media_title' => $media -> title,
      'media_release_date' => $media -> release_date,
      'media_poster' => $media -> poster,

      'rating' => 4.5,

      'review_text' => 'test review',

      'contains_spoilers' => false,
      'watched_on' => '2023-06-01'
  ]);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
  }

  public function test_get_review_successful() {
    $review = Review::factory() -> create();

    $response = $this -> getJson("/api/review/{$review -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
          'id' => $review -> id,
      ]);
  }

  public function test_get_review_not_found() {
    $response = $this -> getJson('/api/review/999');

    $response -> assertStatus(Response::HTTP_NOT_FOUND);
  }

  public function test_get_all_reviews_for_user() {
    $user = User::factory() -> create();
    Review::factory() -> count(5) -> create(['user_id' => $user -> id]);

    $response = $this -> actingAs($user) -> getJson("/api/get-all-reviews-for-user/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'reviews',
        'totalReviews'
      ]);
  }

  public function test_get_this_year_reviews_for_user() {
    $user = User::factory() -> create();
    Review::factory() -> count(5) -> create(['user_id' => $user -> id]);

    $response = $this -> actingAs($user) -> getJson("/api/get-this-year-reviews-for-user/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'reviews',
        'totalReviews'
      ]);
  }

  public function test_get_all_reviews() {
    Review::factory() -> count(15) -> create();

    $response = $this -> getJson('/api/all-reviews');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'reviews',
        'currentPage',
        'totalPages',
        'totalItems'
      ]);
  }

  // ! not working
  // public function test_update_review_successful() {
  //   $this -> withoutExceptionHandling();

  //   $user = User::factory() -> create();
  //   $review = Review::factory() -> create(['user_id' => $user -> id]);

  //   $response = $this -> actingAs($user) -> putJson("/api/update-review/{$review -> id}", [
  //     'rating' => 5.0,
  //     'review_text' => 'updated review'
  //   ]);

  //   $response -> assertStatus(Response::HTTP_OK)
  //     -> assertJson([
  //       'message' => 'success'
  //     ]);

  //   $updatedReview = Review::find($review -> id);
  //   $this -> assertEquals(5.0, $updatedReview -> rating);
  //   $this -> assertEquals('updated review', $updatedReview -> review_text);
  // }

  public function test_update_review_unauthorized() {
    $review = Review::factory() -> create();

    $response = $this -> putJson("/api/update-review/{$review -> id}", [
      'rating' => 5.0,
      'review_text' => 'updated review'
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_delete_review_successful() {
    $this -> withoutExceptionHandling();

    $user = User::factory() -> create();
    $review = Review::factory() -> create(['user_id' => $user -> id]);

    $response = $this -> actingAs($user) -> deleteJson("/api/delete-review/{$review -> id}", [
      'user_id' => $user -> id
    ]);

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
          'message' => 'success',
      ]);

    $this -> assertDatabaseMissing('reviews', ['id' => $review -> id]);
  }

  public function test_delete_review_unauthorized() {
    $review = Review::factory() -> create();

    $response = $this -> deleteJson("/api/delete-review/{$review -> id}", [
      'user_id' => 1
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_delete_review_not_found() {
    $user = User::factory() -> create();

    $response = $this -> actingAs($user) -> deleteJson('/api/delete-review/999', [
      'user_id' => $user -> id
    ]);

    $response -> assertStatus(Response::HTTP_NOT_FOUND);
  }

  public function test_new_on_plotscore() {
    Review::factory() -> count(6) -> create();

    $response = $this -> getJson('/api/new-on-plotscore');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonCount(6);
  }
}
