<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('likes', function (Blueprint $table) {
      $table -> id();

      $table -> foreignId('user_id') -> constrained('users') -> onDelete('cascade');
      $table -> foreignId('review_id') -> constrained('reviews') -> onDelete('cascade');

      $table -> unique(['user_id', 'review_id']);

      $table -> timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('likes');
  }
};
