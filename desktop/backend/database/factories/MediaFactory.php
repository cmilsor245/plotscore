<?php
namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory {
  protected $model = Media::class;

  public function definition() {
    $type = $this -> faker -> randomElement(['movie', 'series']);
    $title = $type === 'movie' ? $this -> faker -> unique() -> catchPhrase : $this -> faker -> unique() -> sentence(4);
    $synopsis = $this -> faker -> sentence;
    $releaseDate = $this -> faker -> dateTimeThisCentury -> format('Y-m-d');

    return [
      'title' => $title,
      'synopsis' => $synopsis,
      'release_date' => $releaseDate,

      'poster' => '/storage/posters/default.png',

      'type' => $type
    ];
  }
}
