<?php
namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder {
  public function run(): void{
    Media::factory() -> count(100) -> create();
  }
}
