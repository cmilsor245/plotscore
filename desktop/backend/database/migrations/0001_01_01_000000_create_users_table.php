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

      $table -> binary('avatar') -> nullable();
      $table -> integer('follower_count') -> default(0);
      $table -> text('bio') -> nullable();

      $table -> string('location' , 255) -> nullable();
      $table -> string('website', 255) -> nullable();
      $table -> enum('pronouns', ['he/him', 'she/her', 'they/them']) -> nullable();

      $table -> timestamps();
    });

    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table -> string('email') -> primary();
      $table -> string('token');
      $table -> timestamp('created_at') -> nullable();
    });

    Schema::create('sessions', function (Blueprint $table) {
      $table -> string('id') -> primary();
      $table -> foreignId('user_id') -> nullable() -> index();
      $table -> string('ip_address', 45) -> nullable();
      $table -> text('user_agent') -> nullable();
      $table -> longText('payload');
      $table -> integer('last_activity') -> index();
    });
  }

  public function down(): void {
    Schema::dropIfExists('users');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('sessions');
  }
};
