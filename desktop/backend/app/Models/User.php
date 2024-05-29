<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
  use HasFactory, Notifiable, HasApiTokens;

  protected $fillable = [
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
    'pronouns'
  ];

  protected $hidden = [
    'password'
  ];
}
