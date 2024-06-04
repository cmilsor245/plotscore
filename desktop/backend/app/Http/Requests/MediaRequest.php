<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MediaRequest extends FormRequest {
  public function authorize(): bool {
    return true;
  }

  public function rules(): array {
    return [
      'title' => 'required|string|min:1|max:255',
      'synopsis' => 'required|string|min:1|max:65535',
      'release_date' => 'required|date',

      'type' => 'required|in:movie,series',
    ];
  }
}
