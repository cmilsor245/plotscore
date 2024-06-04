<?php
namespace Database\Seeders;

use App\Http\Controllers\FollowController;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

class FollowsSeeder extends Seeder
{
    public function run(): void
    {
        $followController = new FollowController();

        $user = User::find(1);
        Auth::login($user);

        $followController -> followUser(2);

        $user = User::find(2);
        Auth::login($user);

        $followController -> followUser(1);
    }
}
