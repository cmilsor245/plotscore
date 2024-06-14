<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\User;

class SearchController extends Controller {
  public function getUserAndOrMedia($searchTerm) {
    $users = User::where('name', 'LIKE', '%' . $searchTerm . '%')
      -> orWhere('username', 'LIKE', '%' . $searchTerm . '%')
      -> get();

    if (preg_match('/^\d{4}$/', $searchTerm)) {
      $media = Media::whereYear('release_date', $searchTerm) -> get();
    } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $searchTerm)) {
      $media = Media::where('release_date', $searchTerm) -> get();
    } else {
      $media = Media::where('title', 'LIKE', '%' . $searchTerm . '%') -> get();
    }

    return response() -> json([
      'users' => $users,
      'media' => $media
    ]);
  }
}
