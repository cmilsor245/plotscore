<?php
namespace Database\Seeders;

use App\Http\Controllers\AuthController;
use App\Http\Requests\AuthRequest;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder {
  public function run(): void {
    // ! not available in prod because of custom api middleware restriction
    // $authController = new AuthController();

    // $request = AuthRequest::create('createAdmin', 'POST', [
    //   'secret_key' => 'plotscore_christian_admin_secret_key',

    //   'username' => 'plotscore',

    //   'email' => 'hello@plotscore.com',
    //   'password' => 'password1234',

    //   'bio' => 'still not over dune: part two',

    //   'location' => 'la la land',
    //   'website' => 'plotscore--desktop.vercel.app'
    // ]);

    // $authController -> createAdmin($request);

    DB::table('users') -> insert([
      'role' => 'admin',

      'username' => 'plotscore',

      'email' => 'hello@plotscore.com',
      'password' => Hash::make('password1234'),

      'avatar' => '/storage/avatars/default.png',
      'bio' => 'still not over dune: part two',

      'location' => 'la la land',
      'website' => 'plotscore--desktop.vercel.app',
      'pronouns' => 'they/them'
    ]);
  }
}
