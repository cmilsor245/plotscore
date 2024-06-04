<?php
namespace Database\Seeders;

use App\Http\Controllers\AuthController;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
  public function run(): void {
    $authController = new AuthController();

    $request = AuthRequest::create('signup', 'POST', [
      'username' => 'christianms13',
      'given_name' => 'christian',
      'family_name' => 'millán soria',

      'email' => 'christianmillansoria13@gmail.com',
      'password' => 'password1234',

      'bio' => 'can you hear the music, robert?',

      'location' => 'spain',
      'website' => 'boxd.it/9yH3x',
      'pronouns' => 'he/him'
    ]);

    $authController -> signup($request);

    $factoryCount = 20;

    for ($i = 0; $i < $factoryCount; $i++) {
      User::factory() -> create();
    }
  }
}
