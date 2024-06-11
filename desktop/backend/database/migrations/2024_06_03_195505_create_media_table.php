<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('media', function (Blueprint $table) {
      $table -> id();

      $table -> string('title', 255);
      $table -> string('synopsis', 255);
      $table -> date('release_date');

      $table -> string('poster') -> default('/storage/posters/default.png');

      $table -> enum('type', ['movie', 'series']);

      $table -> timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('media');
  }
};
