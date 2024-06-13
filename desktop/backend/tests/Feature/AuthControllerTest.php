<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AuthControllerTest extends TestCase {
  use RefreshDatabase;

  public function test_create_admin_successful() {
    $response = $this -> postJson('/api/create-admin', [
      'username' => 'newadmin',
      'given_name' => 'admin',
      'family_name' => 'user',

      'email' => 'admin@example.com',
      'password' => 'password123',

      'bio' => 'admin bio',

      'location' => 'admin location',
      'website' => 'https://adminwebsite.com'
    ]);

    $response -> assertStatus(Response::HTTP_CREATED)
      -> assertJson([
        'role' => 'admin',
        'username' => 'newadmin',
        'email' => 'admin@example.com',
      ]);
  }

  public function test_create_admin_validation_error() {
    $response = $this -> postJson('/api/create-admin', []);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['username', 'email', 'password']);
  }

  public function test_create_admin_duplicate_email() {
    User::factory() -> create(['email' => 'admin@example.com']);

    $response = $this -> postJson('/api/create-admin', [
      'username' => 'newadmin',

      'email' => 'admin@example.com',
      'password' => 'password123'
    ]);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['email']);
  }

  public function test_signup_successful() {
    $response = $this -> postJson('/api/signup', [
      'username' => 'newuser',
      'given_name' => 'user',
      'family_name' => 'name',

      'email' => 'user@example.com',
      'password' => 'password123',

      'bio' => 'user bio',

      'location' => 'user location',
      'website' => 'https://userwebsite.com'
    ]);

    $response -> assertStatus(Response::HTTP_CREATED)
      -> assertJson([
        'role' => 'user',
        'username' => 'newuser',
        'email' => 'user@example.com'
      ]);
  }

  public function test_signup_validation_error() {
    $response = $this -> postJson('/api/signup', []);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['username', 'email', 'password']);
  }

  public function test_signup_duplicate_username() {
    User::factory() -> create(['username' => 'newuser']);

    $response = $this -> postJson('/api/signup', [
      'username' => 'newuser',

      'email' => 'unique@example.com',
      'password' => 'password123'
    ]);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['username']);
  }

  public function test_login_successful() {
    $user = User::factory() -> create([
      'email' => 'user@example.com',
      'password' => Hash::make('password123'),
    ]);

    $response = $this -> postJson('/api/login', [
      'email' => 'user@example.com',
      'password' => 'password123'
    ]);

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);
  }

  public function test_login_invalid_credentials() {
    $user = User::factory() -> create([
      'email' => 'user@example.com',
      'password' => Hash::make('password123')
    ]);

    $response = $this -> postJson('/api/login', [
      'email' => 'user@example.com',
      'password' => 'wrongpassword'
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED)
      -> assertJson([
        'message' => 'invalid credentials'
      ]);
  }

  public function test_login_non_existent_user() {
    $response = $this -> postJson('/api/login', [
      'email' => 'nonexistent@example.com',
      'password' => 'password123'
    ]);

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED)
      -> assertJson([
        'message' => 'invalid credentials'
      ]);
  }

  public function test_get_user_successful() {
    $user = User::factory() -> create();

    $response = $this -> getJson("/api/user/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'id' => $user -> id,
        'username' => $user -> username,
      ]);
  }

  public function test_get_user_not_found() {
    $response = $this -> getJson('/api/user/9999');

    $response -> assertStatus(Response::HTTP_NOT_FOUND)
      -> assertJson([
        'error' => 'user not found'
      ]);
  }

  public function test_update_user_successful() {
    $user = User::factory() -> create();
    $updatedUserData = [
      'username' => 'updateduser',
      'email' => 'updateduser@example.com'
    ];

    $response = $this -> actingAs($user) -> putJson("/api/update-user/{$user -> id}", $updatedUserData);

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);

    $this -> assertDatabaseHas('users', $updatedUserData);
  }

  public function test_update_user_not_allowed() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();
    $updatedUserData = [
      'username' => 'updateduser',
      'email' => 'updateduser@example.com'
    ];

    $response = $this -> actingAs($anotherUser) -> putJson("/api/update-user/{$user -> id}", $updatedUserData);

    $response -> assertStatus(Response::HTTP_FORBIDDEN)
      -> assertJson([
        'error' => 'cannot update other users'
      ]);
  }

  public function test_delete_user_successful() {
    $admin = User::factory() -> create(['role' => 'admin']);
    $user = User::factory() -> create();

    $response = $this -> actingAs($admin) -> deleteJson("/api/delete-user/{$user -> id}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);

    $this -> assertDatabaseMissing('users', ['id' => $user -> id]);
  }

  public function test_delete_user_not_allowed() {
    $user = User::factory() -> create();
    $anotherUser = User::factory() -> create();

    $response = $this -> actingAs($anotherUser) -> deleteJson("/api/delete-user/{$user -> id}");

    $response -> assertStatus(Response::HTTP_FORBIDDEN)
      -> assertJson([
        'error' => 'user deletion not allowed'
      ]);
  }

  public function test_get_all_users_as_admin() {
    $admin = User::factory() -> create(['role' => 'admin']);
    User::factory() -> count(15) -> create();

    $response = $this -> actingAs($admin) -> getJson('/api/all-users?page=1');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'users',
        'currentPage',
        'totalPages',
        'totalItems'
      ]);
  }

  public function test_get_all_users_as_non_admin() {
    $user = User::factory() -> create(['role' => 'user']);

    $response = $this -> actingAs($user) -> getJson('/api/all-users');

    $response -> assertStatus(Response::HTTP_FORBIDDEN)
      -> assertJson([
        'error' => 'cannot get all users'
      ]);
  }

  public function test_logout_successful() {
    $user = User::factory() -> create();

    $response = $this -> actingAs($user) -> postJson('/api/logout');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'message' => 'success'
      ]);
  }

  public function test_logout_without_login() {
    $response = $this -> postJson('/api/logout');

    $response -> assertStatus(Response::HTTP_UNAUTHORIZED)
      -> assertJson([
        'message' => 'Unauthenticated.'
      ]);
  }

  public function test_get_user_by_username() {
    $user = User::factory() -> create(['username' => 'testuser']);

    $response = $this -> getJson("/api/get-user-by-username/{$user -> username}");

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJson([
        'username' => $user -> username,
        'email' => $user -> email
      ]);
  }

  public function test_get_user_by_username_not_found() {
    $response = $this -> getJson('/api/get-user-by-username/nonexistentuser');

    $response -> assertStatus(Response::HTTP_NOT_FOUND)
      -> assertJson([
      'error' => 'user not found'
      ]);
  }


  public function test_get_all_users_pagination() {
    $admin = User::factory() -> create(['role' => 'admin']);
    User::factory() -> count(50) -> create();

    $response = $this -> actingAs($admin) -> getJson('/api/all-users?page=2');

    $response -> assertStatus(Response::HTTP_OK)
      -> assertJsonStructure([
        'users',
        'currentPage',
        'totalPages',
        'totalItems'
      ]);
  }

  public function test_create_admin_duplicate_username() {
    User::factory() -> create(['username' => 'newadmin']);

    $response = $this -> postJson('/api/create-admin', [
      'username' => 'newadmin',

      'email' => 'unique@example.com',
      'password' => 'password123'
    ]);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['username']);
  }

  public function test_create_admin_weak_password() {
    $response = $this -> postJson('/api/create-admin', [
      'username' => 'newadmin',

      'email' => 'admin@example.com',
      'password' => '123'
    ]);

    $response -> assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
      -> assertJsonValidationErrors(['password']);
  }
}
