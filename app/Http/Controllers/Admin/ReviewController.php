<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['product', 'user'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }

    public function destroy(Review $review)
    {
        $product = $review->product;
        $review->delete();

        // Update product rating
        $avg = $product->reviews()->avg('rating');
        $count = $product->reviews()->count();
        $product->update([
            'rating_average' => $avg ? round($avg, 1) : 0,
            'rating_count' => $count,
        ]);

        return back()->with('success', 'Review deleted.');
    }
}
