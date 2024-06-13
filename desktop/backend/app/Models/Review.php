<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Review extends Model {
  use HasFactory, HasApiTokens;

  protected $fillable = [
    'user_id',
    'user_username',
    'user_avatar',

    'media_id',
    'media_title',
    'media_release_date',
    'media_poster',

    'watched_on',
    'watched_before',

    'rating',
    'liked_media',

    'review_text',
    'contains_spoilers'
  ];

  public function user() {
    return $this -> belongsTo(User::class) -> select(['id', 'username', 'avatar']);
  }

  public function media() {
    return $this -> belongsTo(Media::class) -> select(['id', 'title', 'release_date', 'poster']);
  }

  public function likedBy() {
    return $this -> belongsToMany(User::class, 'liked_reviews', 'review_id', 'user_id');
  }
}
