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
    if ($request -> input('secret_key') !== env('ADMIN_SECRET_KEY')) {
      return response() -> json([
        'message' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $pronouns = $request -> input('pronouns') ?? 'they/them';

    $avatarPath = $request -> file('avatar')
      ? $request -> file('avatar') -> store('avatars', 'public')
      : 'avatars/default.png';

    $avatarUrl = env('PUBLIC_STORAGE_PATH') . $avatarPath;

    return User::create([
      'role' => 'admin',

      'username' => $request -> input('username'),
      'given_name' => $request -> input('given_name'),
      'family_name' => $request -> input('family_name'),

      'email' => $request -> input('email'),
      'password' => Hash::make($request -> input('password')),

      'avatar' => $avatarUrl,
      'bio' => $request -> input('bio'),

      'location' => $request -> input('location'),
      'website' => $request -> input('website'),
      'pronouns' => $pronouns
    ]);
  }

  public function signup(AuthRequest $request) {
    $pronouns = $request -> input('pronouns') ?? 'they/them';

    $avatarPath = $request -> file('avatar')
      ? $request -> file('avatar') -> store('avatars', 'public')
      : 'avatars/default.png';

    $avatarUrl = env('PUBLIC_STORAGE_PATH') . $avatarPath;

    return User::create([
      'role' => 'user',

      'username' => $request -> input('username'),
      'given_name' => $request -> input('given_name'),
      'family_name' => $request -> input('family_name'),

      'email' => $request -> input('email'),
      'password' => Hash::make($request -> input('password')),

      'avatar' => $avatarUrl,
      'bio' => $request -> input('bio'),

      'location' => $request -> input('location'),
      'website' => $request -> input('website'),
      'pronouns' => $pronouns
    ]);
  }

  public function login(Request $request) {
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
    ]) -> withCookie($cookie);
  }

  public function user() {
    return Auth::user();
  }

  public function logout() {
    $cookie = Cookie::forget('jwt');

    return response([
      'message' => 'success'
    ]) -> withCookie($cookie);
  }
}
