<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest {
  public function authorize(): bool {
    return true;
  }

  public function rules(): array {
    return [
      'user_id' => 'required|exists:users,id',
      'media_id' => 'required|exists:media,id',

      'watched_on' => 'required|date',
      'watched_before' => 'required|boolean',

      'rating' => [
        'nullable',
        'numeric',
        function ($attribute, $value, $fail) {
          if (!in_array($value, [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])) {
            $fail('the ' . $attribute . ' must be one of the following values: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5');
          }
        }
      ],
      'liked_media' => 'boolean',

      'review_text' => 'nullable|string|min:1|max:65535',
      'contains_spoilers' => 'boolean'
    ];
  }
}
