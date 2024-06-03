<?php
namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends Controller {
  public function createMedia(Request $request) {
    $media = Media::create($request -> all());

    return response() -> json($media, Response::HTTP_CREATED);
  }

  public function updateMedia(Request $request, $id) {
    $media = Media::find($id);

    if (!$media) {
      return response() -> json([
        'error' => 'media not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $media -> update($request -> all());

    return response() -> json([
      'message' => 'success',
    ], Response::HTTP_OK);
  }

  public function deleteMedia($id) {
    $media = Media::find($id);

    if (!$media) {
      return response() -> json([
        'error' => 'media not found'
      ], Response::HTTP_NOT_FOUND);
    }

    $media -> delete();

    return response() -> json([
      'message' => 'success'
    ], Response::HTTP_OK);
  }

  public function getMedia($id) {
    $media = Media::find($id);

    if (!$media) {
      return response() -> json([
        'error' => 'media not found'
      ], Response::HTTP_NOT_FOUND);
    }

    return response() -> json($media, Response::HTTP_OK);
  }

  public function getAllMedia(Request $request) {
    $page = $request -> query('page', 1);
    $perPage = 10;

    $media = Media::paginate($perPage, ['*'], 'page', $page);

    return response() -> json([
      'media' => $media -> items(),
      'currentPage' => $media -> currentPage(),
      'totalPages' => $media -> lastPage(),
      'totalItems' => $media -> total()
    ], Response::HTTP_OK);
  }
}
