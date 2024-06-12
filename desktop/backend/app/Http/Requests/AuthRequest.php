<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest {
  public function authorize(): bool {
    return true;
  }

  public function rules(): array {
    return [
      'secret_key' => 'nullable|string',

      'username' => 'required|string|min:3|max:100|unique:users,username',
      'given_name' => 'nullable|string|min:1|max:100',
      'family_name' => 'nullable|string|min:1|max:100',

      'email' => 'required|string|email|min:3|max:255|unique:users,email',
      'password' => 'required|string|min:8|max:255',

      'avatar' => 'nullable|file|mimes:jpeg,png,jpg,webp|max:4096',
      'bio' => 'nullable|string|min:1|max:255',

      'location' => 'nullable|string|min:1|max:255',
      'website' => 'nullable|string|max:255',
      'pronouns' => 'nullable|in:he/him,she/her,they/them',

      'posters_config' => 'nullable|in:any,only their,only your,no',
      'replies' => 'nullable|in:anyone,friends,you',
      'include_in_members' => 'nullable|boolean',
      'adult_content' => 'nullable|boolean'
    ];
  }
}
