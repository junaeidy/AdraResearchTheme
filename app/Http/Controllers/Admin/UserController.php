<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::withCount(['orders', 'licenses'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => $user->load([
                'orders.items.product',
                'licenses.product',
                'reviews.product',
            ]),
        ]);
    }

    public function toggleRole(User $user)
    {
        $newRole = $user->role === 'admin' ? 'customer' : 'admin';
        $user->update(['role' => $newRole]);

        return back()->with('success', 'User role updated.');
    }
}
