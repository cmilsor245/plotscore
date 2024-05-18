<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory {
  protected $model = User::class;

  public function definition(): array {
    return [
      'username' => $this->faker->unique()->userName,
      'given_name' => $this->faker->optional()->firstName,
      'family_name' => $this->faker->optional()->lastName,

      'email' => $this->faker->unique()->email,
      'password' => Hash::make('password'),

      'bio' => $this->faker->optional()->text,

      'location' => $this->faker->optional()->city,
      'website' => $this->faker->optional()->url,
      'pronouns' => $this->faker->optional()->randomElement(['he/him', 'she/her', 'they/them'])
    ];
  }
}
