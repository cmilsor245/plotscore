<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller {
  public function createAdmin(Request $request) {
    if ($request -> input('secret_key') !== env('ADMIN_SECRET_KEY')) {
        return response() -> json([
            'message' => 'unauthorized'
        ], Response::HTTP_UNAUTHORIZED);
    }

    $pronouns = $request -> input('pronouns', 'they/them');

    return User::create([
        'role' => 'admin',

        'username' => $request -> input('username'),
        'given_name' => $request -> input('given_name'),
        'family_name' => $request -> input('family_name'),

        'email' => $request -> input('email'),
        'password' => Hash::make($request -> input('password')),

        'avatar' => $request -> input('avatar'),
        'bio' => $request -> input('bio'),
        'pronouns' => $pronouns,

        'location' => $request -> input('location'),
        'website' => $request -> input('website')
    ]);
}

  public function signup(Request $request) {
    $pronouns = $request -> input('pronouns', 'they/them');

    return User::create([
      'role' => 'user',

      'username' => $request -> input('username'),
      'given_name' => $request -> input('given_name'),
      'family_name' => $request -> input('family_name'),

      'email' => $request -> input('email'),
      'password' => Hash::make($request -> input('password')),

      'avatar' => $request -> input('avatar'),
      'bio' => $request -> input('bio'),
      'pronouns' => $pronouns,

      'location' => $request -> input('location'),
      'website' => $request -> input('website')
    ]);
  }

  public function login(Request $request) {
    if (!Auth::attempt([$request -> only('email', 'password')])) {
      return response() -> json([
        'message' => 'invalid credentials'
      ], Response::HTTP_UNAUTHORIZED);
    }

    return Auth::user();
  }

  public function user() {
    return 'test';
  }
}
