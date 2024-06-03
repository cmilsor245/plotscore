<?php
namespace App\Http\Controllers;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class FollowController extends Controller {
  public function followUser($id) {
    $userToFollow = User::find($id);

    if (!$userToFollow) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    auth() -> user() -> following() -> attach($userToFollow -> id);

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function unfollowUser($id) {
    $userToUnfollow = User::find($id);

    if (!$userToUnfollow) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    auth() -> user() -> following() -> detach($userToUnfollow -> id);

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }
}
