<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('reviews', function (Blueprint $table) {
      $table -> id();

      $table -> foreignId('user_id') -> constrained() -> onDelete('cascade');
      $table -> string('user_username');
      $table -> string('user_avatar');

      $table -> foreignId('media_id') -> constrained() -> onDelete('cascade');
      $table -> string('media_title');
      $table -> date('media_release_date') -> default(now());
      $table -> string('media_poster');

      $table -> date('watched_on');
      $table -> boolean('watched_before') -> default(false);

      $table -> text('review_text') -> nullable();
      $table -> boolean('contains_spoilers') -> default(false);

      $table -> float('rating', 2, 1) -> default(0);
      $table -> boolean('liked_media') -> default(false);

      $table -> integer('like_count') -> default(0);
      $table -> integer('comment_count') -> default(0);

      $table -> timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('reviews');
  }
};
