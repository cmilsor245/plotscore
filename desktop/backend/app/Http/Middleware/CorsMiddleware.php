<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware {
  public function handle(Request $request, Closure $next) {
    $response = $next($request);

    $response -> headers -> set('Access-Control-Allow-Origin', '*');
    $response -> headers -> set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response -> headers -> set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    $response -> headers -> set('Access-Control-Allow-Credentials', 'true');

    return $response;
  }
}
