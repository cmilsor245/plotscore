<?php
namespace Database\Seeders;

use App\Http\Controllers\AuthController;
use App\Http\Requests\AuthRequest;
use App\Models\Media;
use App\Models\Review;
use App\Models\User;
use Faker\Factory as Faker;
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

    $factoryCount = 50;
    $users = User::factory() -> count($factoryCount) -> create();

    $mediaIds = Media::pluck('id') -> toArray();

    foreach ($users as $user) {
      if (rand(0, 1)) {
        $reviewCount = rand(1, 5);
        for ($i = 0; $i < $reviewCount; $i++) {
          Review::factory() -> create([
            'user_id' => $user -> id,
            'media_id' => Faker::create() -> randomElement($mediaIds)
          ]);
        }
      }
    }
  }
}
