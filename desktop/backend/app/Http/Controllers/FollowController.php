<?php
namespace App\Http\Controllers;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class FollowController extends Controller {
  public function followUser($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $user = auth() -> user();

    if ($user -> id == $id) {
      return response() -> json([
        'error' => 'you cannot follow yourself'
      ], Response::HTTP_BAD_REQUEST);
    }

    $userToFollow = User::find($id);

    if (!$userToFollow) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if ($user -> following() -> where('followed_id', $id) -> exists()) {
      return response() -> json([
        'error' => 'you are already following this user'
      ], Response::HTTP_BAD_REQUEST);
    }

    $user -> following() -> attach($userToFollow -> id);

    $userToFollow -> follower_count++;

    $user -> following_count++;

    $userToFollow -> save();
    $user -> save();

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function unfollowUser($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $user = auth() -> user();

    if ($user -> id == $id) {
      return response() -> json([
        'error' => 'you cannot unfollow yourself'
      ], Response::HTTP_BAD_REQUEST);
    }

    $userToUnfollow = User::find($id);

    if (!$userToUnfollow) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    if (!$user -> following() -> where('followed_id', $id) -> exists()) {
      return response() -> json([
        'error' => 'you are not following this user'
      ], Response::HTTP_BAD_REQUEST);
    }

    $user -> following() -> detach($userToUnfollow -> id);

    $userToUnfollow -> follower_count--;

    $user -> following_count--;

    $userToUnfollow -> save();
    $user -> save();

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function checkIfFollowing($id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $user = auth() -> user();
    $isFollowing = $user -> following() -> where('followed_id', $id) -> exists();

    return response() -> json([
      'isFollowing' => $isFollowing
    ], Response::HTTP_OK);
  }

  public function getFollowers($id) {
    $user = User::find($id);

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $followers = $user -> followers;

    return response() -> json([
      'followers' => $followers
    ], Response::HTTP_OK);
  }

  public function getFollowing($id) {
    $user = User::find($id);

    if (!$user) {
      return response() -> json([
        'error' => 'user not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $following = $user -> following;

    return response() -> json([
      'following' => $following
    ], Response::HTTP_OK);
  }
}
