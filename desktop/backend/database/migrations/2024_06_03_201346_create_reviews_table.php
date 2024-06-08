<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('reviews', function (Blueprint $table) {
      $table -> id();

      $table -> foreignId('user_id') -> constrained() -> onDelete('cascade');
      $table -> foreignId('media_id') -> constrained() -> onDelete('cascade');

      $table -> float('rating', 2, 1) -> default(0);
      $table -> text('review_text') -> nullable();
      $table -> boolean('spoilers_free') -> default(true);

      $dateTodayWithoutTime = date('Y-m-d');

      $table -> date('watched_on') -> default($dateTodayWithoutTime);
      $table -> boolean('watched_before') -> default(false);

      $table -> timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('reviews');
  }
};
