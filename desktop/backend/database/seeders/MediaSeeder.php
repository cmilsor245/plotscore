<?php
namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder {
  public function run(): void{
    $factoryCount = 100;

    for ($i = 0; $i < $factoryCount; $i++) {
      Media::factory() -> create();
    }
  }
}
