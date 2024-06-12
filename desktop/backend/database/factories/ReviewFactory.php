<?php
namespace Database\Factories;

use App\Models\Media;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory {
  protected $model = Review::class;

  public function definition(): array {
    $user = User::factory() -> create();
    $media = Media::factory() -> create();

    return [
      'user_id' => $user -> id,
      'user_username' => $user -> username,
      'user_avatar' => $user -> avatar,

      'media_id' => $media -> id,
      'media_title' => $media -> title,
      'media_release_date' => $media -> release_date,
      'media_poster' => $media -> poster,

      'watched_on' => $this -> faker -> date(),
      'watched_before' => $this -> faker -> boolean(),

      'rating' => $this -> faker -> randomElement([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
      'liked_media' => $this -> faker -> boolean(),

      'review_text' => $this -> faker -> optional() -> text(),
      'contains_spoilers' => $this -> faker -> boolean()
    ];
  }
}
