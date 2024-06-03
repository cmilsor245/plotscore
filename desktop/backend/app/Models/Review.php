<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model {
  use HasFactory;

  protected $fillable = [
    'user_id',
    'media_id',

    'rating',
    'review_text',
    'spoilers_free'
  ];

  public function user() {
    return $this -> belongsTo(User::class);
  }

  public function media() {
    return $this -> belongsTo(Media::class);
  }
}
