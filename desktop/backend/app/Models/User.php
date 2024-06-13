<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
  use HasFactory, Notifiable, HasApiTokens;

  protected $fillable = [
    'secret_key',

    'role',

    'username',
    'given_name',
    'family_name',

    'email',
    'password',

    'avatar',
    'bio',

    'location',
    'website',
    'pronouns',

    'posters_config',
    'replies',
    'include_in_members',
    'adult_content'
  ];

  protected $hidden = [
    'password'
  ];

  public function reviews() {
    return $this -> hasMany(Review::class);
  }

  public function likedReviews() {
    return $this -> belongsToMany(Review::class, 'likes', 'user_id', 'review_id') -> withTimestamps();
  }

  public function followers() {
    return $this -> belongsToMany(User::class, 'followers', 'followed_id', 'follower_id') -> withTimestamps();
  }

  public function following() {
    return $this -> belongsToMany(User::class, 'followers', 'follower_id', 'followed_id') -> withTimestamps();
  }
}
