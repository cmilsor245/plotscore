<?php
namespace Database\Seeders;

use App\Http\Controllers\AuthController;
use App\Http\Requests\AuthRequest;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder {
  public function run(): void {
    $authController = new AuthController();

    $request = AuthRequest::create('createAdmin', 'POST', [
      'secret_key' => 'plotscore_christian_admin_secret_key',

      'username' => 'plotscore',

      'email' => 'hello@plotscore.com',
      'password' => 'password1234',

      'location' => 'hollywood',
      'website' => 'plotscore-desktop.vercel.app'
    ]);

    $authController -> createAdmin($request);
  }
}
