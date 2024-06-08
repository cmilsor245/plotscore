<?php
namespace Database\Factories;

use App\Models\Media;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory {
  protected $model = Review::class;

  public function definition(): array {
    return [
      'user_id' => User::factory(),
      'media_id' => Media::factory(),

      'rating' => $this -> faker -> randomElement([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
      'review_text' => $this -> faker -> optional() -> text(),
      'spoilers_free' => $this -> faker -> boolean(),

      'watched_on' => $this -> faker -> date(),
      'watched_before' => $this -> faker -> boolean()
    ];
  }
}
