<?php
namespace Database\Seeders;

use App\Http\Controllers\FollowController;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

class FollowsSeeder extends Seeder {
  public function run(): void {
      $followController = new FollowController();

      $user1 = User::find(1);
      $user2 = User::find(2);

      if ($user1 && $user2) {
        Auth::login($user1);
        $followController -> followUser($user2 -> id);

        Auth::login($user2);
        $followController -> followUser($user1 -> id);
      }

      $users = User::all();

      foreach ($users as $user) {
        if ($user -> id > 2) {
          $followCount = rand(0, 100);
          for ($i = 0; $i < $followCount; $i++) {
            $userToFollow = $users -> random();
            if ($user -> id !== $userToFollow -> id) {
              Auth::login($user);
              $followController -> followUser($userToFollow -> id);
            }
          }
        }
      }
  }
}
