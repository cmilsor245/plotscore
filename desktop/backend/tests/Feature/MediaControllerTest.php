<?php
namespace Tests\Feature;

use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class MediaControllerTest extends TestCase {
  use RefreshDatabase;
  use WithFaker;

  public function setUp(): void {
    parent::setUp();
  }

  public function test_create_media_successful() {
    $this -> withoutExceptionHandling();

    $user = User::factory() -> create(['role' => 'admin']);

    $response = $this -> actingAs($user) -> postJson('/api/create-media', [
      'title' => 'test media',
      'synopsis' => 'test synopsis',
      'release_date' => '2023-01-01',

      'type' => 'movie'
    ]);

    $response -> assertStatus(Response::HTTP_CREATED)
      -> assertJsonStructure([
        'id',
        'title',
        'synopsis',
        'release_date',

        'type'
      ]);
  }

  public function test_create_media_unauthorized() {
    $response = $this -> postJson('/api/create-media', [
      'title' => 'test media',
      'synopsis' => 'test synopsis',
      'release_date' => '2023-01-01',

      'type' => 'movie'
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_create_media_validation_error() {
    $user = User::factory() -> create(['role' => 'admin']);

    $response = $this -> actingAs($user) -> postJson('/api/create-media', []);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['title', 'synopsis', 'release_date', 'type']);
  }

  public function test_get_media_successful() {
    $media = Media::factory() -> create();

    $response = $this -> getJson("/api/media/{$media -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
      'id' => $media -> id,
      'title' => $media -> title
      ]);
  }

  public function test_get_media_not_found() {
    $response = $this -> getJson('/api/media/999');

    $response -> assertStatus(Response::HTTP_NOT_FOUND);
  }

  public function test_get_all_media() {
    Media::factory() -> count(15) -> create();

    $response = $this -> getJson('/api/all-media');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'media',
        'currentPage',
        'totalPages',
        'totalItems'
      ]);
  }

  public function test_update_media_successful() {
    $this -> withoutExceptionHandling();

    $user = User::factory() -> create(['role' => 'admin']);
    $media = Media::factory() -> create();

    $response = $this -> actingAs($user) -> putJson("/api/update-media/{$media -> id}", [
      'title' => 'updated media title',
    ]);

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success',
      ]);

    $updatedMedia = Media::find($media -> id);
    $this -> assertEquals('updated media title', $updatedMedia -> title);
  }

  public function test_update_media_unauthorized() {
    $media = Media::factory() -> create();

    $response = $this -> putJson("/api/update-media/{$media -> id}", [
      'title' => 'updated media title',
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_update_media_not_found() {
    $user = User::factory() -> create(['role' => 'admin']);

    $response = $this -> actingAs($user) -> putJson('/api/update-media/999', [
      'title' => 'updated media title',
    ]);

    $response -> assertStatus(Response::HTTP_NOT_FOUND);
  }

  public function test_delete_media_successful() {
    $this -> withoutExceptionHandling();

    $user = User::factory() -> create(['role' => 'admin']);
    $media = Media::factory() -> create();

    $response = $this -> actingAs($user) -> deleteJson("/api/delete-media/{$media -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success',
      ]);

    $this -> assertDatabaseMissing('media', ['id' => $media -> id]);
  }

  public function test_delete_media_unauthorized() {
    $media = Media::factory() -> create();

    $response = $this -> deleteJson("/api/delete-media/{$media -> id}");

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED);
  }

  public function test_delete_media_not_found() {
    $user = User::factory() -> create(['role' => 'admin']);

    $response = $this -> actingAs($user) -> deleteJson('/api/delete-media/999');

    $response -> assertStatus(Response::HTTP_NOT_FOUND);
  }
}
