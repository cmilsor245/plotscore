<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class FollowControllerTest extends TestCase {
  use RefreshDatabase;

  public function test_follow_user_successful() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $response = $this -> actingAs($user) -> postJson("/api/follow/{$anotherUser -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);

    $this -> assertDatabaseHas('followers', [
      'follower_id' => $user -> id,
      'followed_id' => $anotherUser -> id
    ]);
  }

  public function test_unfollow_user_successful() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $this -> actingAs($user) -> postJson("/api/follow/{$anotherUser -> id}");

    $response = $this -> actingAs($user) -> deleteJson("/api/unfollow/{$anotherUser -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);

    $this -> assertDatabaseMissing('followers', [
      'follower_id' => $user -> id,
      'followed_id' => $anotherUser -> id
    ]);
  }

  public function test_check_if_following() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $this -> actingAs($user) -> postJson("/api/follow/{$anotherUser -> id}");

    $response = $this -> actingAs($user) -> getJson("/api/check-if-following/{$anotherUser -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'isFollowing' => true
      ]);
  }

  public function test_check_if_not_following() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $response = $this -> actingAs($user) -> getJson("/api/check-if-following/{$anotherUser -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'isFollowing' => false
      ]);
  }

  public function test_get_followers() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $this -> actingAs($anotherUser) -> postJson("/api/follow/{$user -> id}");

    $response = $this -> getJson("/api/get-followers/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'followers'
      ]);
  }

  public function test_get_following()
  {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $this -> actingAs($user) -> postJson("/api/follow/{$anotherUser -> id}");

    $response = $this -> getJson("/api/get-following/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'following'
      ]);
  }

  public function test_follow_self_not_allowed() {
    $user = User::factory() -> create();

    $response = $this -> actingAs($user) -> postJson("/api/follow/{$user -> id}");

    $response -> assertStatus(Response::HTTP_BAD_REQUEST)
      -> assertJson([
        'error' => 'you cannot follow yourself'
      ]);
  }

  public function test_unfollow_not_following_user() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $response = $this -> actingAs($user) -> deleteJson("/api/unfollow/{$anotherUser -> id}");

    $response -> assertStatus(Response::HTTP_BAD_REQUEST)
      -> assertJson([
        'error' => 'you are not following this user'
      ]);
  }
}
