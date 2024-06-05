<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model {
  use HasFactory;

  protected $fillable = [
    'title',
    'synopsis',
    'release_date',

    'poster',

    'type'
  ];

  public function reviews() {
    return $this -> hasMany(Review::class);
  }
}
