<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory {
  protected $model = User::class;

  public function definition(): array {
    return [
      'username' => $this -> faker -> userName,
      'given_name' => $this -> faker -> firstName,
      'family_name' => $this -> faker -> lastName,

      'email' => $this -> faker -> email,
      'password' => Hash::make('password1234'),

      'avatar' => '/storage/avatars/default.png',
      'bio' => $this -> faker -> sentence,

      'location' => $this -> faker -> city . ', ' . $this -> faker -> country,
      'website' => $this -> faker -> url,
      'pronouns' => ['he/him', 'she/her', 'they/them'][array_rand(['he/him', 'she/her', 'they/them'])]
    ];
  }
}
