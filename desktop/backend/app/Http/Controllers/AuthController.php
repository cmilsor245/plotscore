<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller {
  public function createAdmin(AuthRequest $request) {
    if (!$request -> username  || !$request -> email || !$request -> password) {
      return response() -> json([
        'error' => 'username, email, and password are required'
      ], Response::HTTP_BAD_REQUEST);
    }

    $existingUsername = User::where('username', $request -> username) -> exists();
    $existingEmail = User::where('email', $request -> email) -> exists();

    if ($existingUsername || $existingEmail) {
      return response() -> json([
        'error' => 'username or email already in use'
      ], Response::HTTP_CONFLICT);
    }

    $pronouns = $request -> pronouns ?? 'they/them';
    $avatar = $request -> avatar ?? '/storage/avatars/default.png';

    $user = User::create([
      'role' => 'admin',
      'username' => $request -> username,
      'given_name' => $request -> given_name,
      'family_name' => $request -> family_name,
      'email' => $request -> email,
      'password' => Hash::make($request -> password),
      'avatar' => $avatar,
      'bio' => $request -> bio,
      'location' => $request -> location,
      'website' => $request -> website,
      'pronouns' => $pronouns
    ]);

    return response() -> json($user, Response::HTTP_CREATED);
  }

  public function signup(AuthRequest $request) {
    $existingUsername = User::where('username', $request -> username) -> exists();
    $existingEmail = User::where('email', $request -> email) -> exists();

    if (!$request -> username  || !$request -> email || !$request -> password) {
      return response() -> json([
        'error' => 'username, email, and password are required'
      ], Response::HTTP_BAD_REQUEST);
    }

    if ($existingUsername || $existingEmail) {
      return response() -> json([
        'error' => 'username or email already in use'
      ], Response::HTTP_CONFLICT);
    }

    $pronouns = $request -> pronouns ?? 'they/them';
    $avatar = $request -> avatar ?? '/storage/avatars/default.png';

    $user = User::create([
      'role' => 'user',
      'username' => $request -> username,
      'given_name' => $request -> given_name,
      'family_name' => $request -> family_name,
      'email' => $request -> email,
      'password' => Hash::make($request -> password),
      'avatar' => $avatar,
      'bio' => $request -> bio,
      'location' => $request -> location,
      'website' => $request -> website,
      'pronouns' => $pronouns
    ]);

    return response() -> json($user, Response::HTTP_CREATED);
  }

  public function login(Request $request) {
    if (!$request -> email || !$request -> password) {
      return response() -> json([
        'error' => 'email and password are required'
      ], Response::HTTP_BAD_REQUEST);
    }

    $credentials = $request -> only('email', 'password');

    if (!Auth::attempt($credentials)) {
      return response() -> json([
        'message' => 'invalid credentials'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $token = Auth::user() -> createToken('auth_token') -> plainTextToken;
    $cookie = cookie('jwt', $token, 60 * 24);

    return response([
      'message' => 'success'
    ], Response::HTTP_OK) -> withCookie($cookie);
  }

  public function getUser($id) {
    $user = User::find($id);

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    return response() -> json($user, Response::HTTP_OK);
  }

  public function getUserByUsername($username) {
    $user = User::where('username', $username) -> first();

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    return response() -> json($user, Response::HTTP_OK);
  }

  public function user() {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    return Auth::user();
  }

  public function logout() {
    $cookie = Cookie::forget('jwt');

    return response([
      'message' => 'success'
    ], Response::HTTP_OK) -> withCookie($cookie);
  }

  public function getAllUsers(Request $request) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'cannot get all users'
      ], Response::HTTP_FORBIDDEN);
    }

    $page = $request -> query('page', 1);
    $perPage = 10;

    $users = User::where('id', '!=', $authenticatedUser -> id)
      -> where('id', '!=', 1)
      -> paginate($perPage, ['*'], 'page', $page);

    return response() -> json([
      'users' => $users -> items(),
      'currentPage' => $users -> currentPage(),
      'totalPages' => $users -> lastPage(),
      'totalItems' => $users -> total()
    ], Response::HTTP_OK);
  }

  public function updateUser(Request $request, $id) {
    $authenticatedUser = auth() -> user();

    if (!$authenticatedUser) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    if ($authenticatedUser -> id !== (int)$id && $authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'cannot update other users'
      ], Response::HTTP_FORBIDDEN);
    }

    $user = User::find($id);

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $updateData = $request -> all();

    if (isset($updateData['role'])) {
      unset($updateData['role']);
    }

    $existingUsername = User::where('username', $request -> username)
      -> where('id', '!=', $id)
      -> exists();
    $existingEmail = User::where('email', $request -> email)
      -> where('id', '!=', $id)
      -> exists();

    if ($existingUsername || $existingEmail) {
      return response() -> json([
        'error' => 'username or email already in use'
      ], Response::HTTP_CONFLICT);
    }

    $user -> update($updateData);

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function deleteUser($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> role !== 'admin' && $id !== 1 && $authenticatedUser -> id !== (int)$id) {
      return response() -> json([
        'error' => 'user deletion not allowed'
      ], Response::HTTP_FORBIDDEN);
    }

    $user = User::find($id);

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if ($user -> id === $authenticatedUser -> id) {
      $authenticatedUser -> tokens() -> delete();
      $response = $this -> logout();
      $user -> delete();
      return $response;
    }

    $user -> delete();

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }
}
