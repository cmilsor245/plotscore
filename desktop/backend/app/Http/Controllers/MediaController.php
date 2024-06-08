<?php
namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Models\Media;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends Controller {
  public function createMedia(MediaRequest $request) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'cannot create any media'
      ], Response::HTTP_FORBIDDEN);
    }

    if (!$request -> title || !$request -> synopsis || !$request -> release_date || !$request -> type) {
      return response() -> json([
        'error' => 'title, synopsis, release_date and type are required'
      ], Response::HTTP_BAD_REQUEST);
    }

    // $filename = '';

    // if ($request -> hasFile('poster')) {
    //   $filename = $request -> getSchemaAndHttpHost() . '/assets/posters/' . time() . '.' . $request -> poster -> extension();

    //   $request -> poster -> move(public_path('/assets/posters/'), $filename);
    // }

    // $media = Media::create([
    //   'title' => $request -> title,
    //   'synopsis' => $request -> synopsis,
    //   'release_date' => $request -> release_date,

    //   'poster' => $filename,

    //   'type' => $request -> type
    // ]);

    // return redirect() -> back();

    $request -> poster ?? '/storage/posters/default.png';

    $media = Media::create($request -> all());

    return response() -> json($media, Response::HTTP_CREATED);
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

  public function getMediaForReview() {
    $media = Media::all();

    return response() -> json($media, Response::HTTP_OK);
  }

  public function updateMedia(Request $request, $id) {
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'cannot update any media'
      ], Response::HTTP_FORBIDDEN);
    }

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
    if (!auth() -> check()) {
      return response() -> json([
        'error' => 'unauthorized'
      ], Response::HTTP_UNAUTHORIZED);
    }

    $authenticatedUser = auth() -> user();

    if ($authenticatedUser -> role !== 'admin') {
      return response() -> json([
        'error' => 'cannot delete any media'
      ], Response::HTTP_FORBIDDEN);
    }

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
}
