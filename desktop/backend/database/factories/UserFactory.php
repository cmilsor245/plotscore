<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory {
  protected $model = User::class;

  public function definition(): array {
    $uniqueId = uniqid();

    return [
      'username' => 'user--' . $uniqueId,
      'given_name' => 'given_name--' . random_int(0, 10000),
      'family_name' => 'family_name--' . random_int(0, 10000),

      'email' => 'user--' . $uniqueId . '@example.com',
      'password' => Hash::make('password1234'),

      'bio' => 'this is a generated bio for user--' . $uniqueId,

      'location' => 'location--' . random_int(0, 10000),
      'website' => 'https://website--' . random_int(0, 10000) . '.com',
      'pronouns' => ['he/him', 'she/her', 'they/them'][array_rand(['he/him', 'she/her', 'they/them'])]
    ];
  }
}
