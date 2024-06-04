<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory {
  public function definition() {
    $type = $this -> faker -> randomElement(['movie', 'series']);
    $title = $type === 'movie' ? $this -> faker -> unique() -> catchPhrase : $this -> faker -> unique() -> sentence(4);
    $synopsis = $this -> faker -> paragraphs(3, true);
    $releaseDate = $this -> faker -> dateTimeBetween('-100 years', 'now');

    return [
      'title' => $title,
      'synopsis' => $synopsis,
      'release_date' => $releaseDate,

      'type' => $type,
    ];
  }
}
