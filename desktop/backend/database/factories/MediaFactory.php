<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory {
  public function generateValidReleaseDate() {
    $year = random_int(1900, 2024);
    $month = random_int(1, 12);

    switch ($month) {
      case 2:
        $day = random_int(1, 28);
        break;
      case 4 || 6 || 9 || 11:
        $day = random_int(1, 30);
        break;
      default:
        $day = random_int(1, 31);
        break;
    }

    return $year . '-' . $month . '-' . $day;
  }

  public function definition(): array {
    $sameTitle = 'title--' . random_int(0, 10000);

    return [
      'title' => $sameTitle,
      'synopsis' => 'this is a generated synopsis for ' . $sameTitle,
      'release_date' => $this -> generateValidReleaseDate(),

      'type' => ['movie', 'series'][array_rand(['movie', 'series'])]
    ];
  }
}
