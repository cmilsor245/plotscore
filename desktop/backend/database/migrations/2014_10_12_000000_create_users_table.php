<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('users', function (Blueprint $table) {
      $table -> id();
      $table -> string('role') -> default('user');

      $table -> string('username', 100) -> unique();
      $table -> string('given_name', 100) -> nullable();
      $table -> string('family_name', 100) -> nullable();

      $table -> string('email', 255) -> unique();
      $table -> string('password', 255);

      $table -> string('avatar') -> default('/storage/avatars/default.png');
      $table -> integer('follower_count') -> default(0);
      $table -> text('bio') -> nullable();

      $table -> string('location' , 255) -> nullable();
      $table -> string('website', 255) -> nullable();
      $table -> enum('pronouns', ['he/him', 'she/her', 'they/them']) -> nullable();

      $table -> timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('users');
  }
};
