<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Rules\SafeString;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        /** @var User $user */
        $user = Auth::user();
        
        // Check if user purchased this product
        $hasPurchased = $user->orders()
            ->where('status', 'completed')
            ->whereHas('items', fn($q) => $q->where('product_id', $product->id))
            ->exists();

        if (!$hasPurchased) {
            return back()->with('error', 'You must purchase this product before reviewing.');
        }

        // Check if already reviewed
        $existingReview = Review::where('product_id', $product->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => ['nullable', 'string', 'max:1000', new SafeString(true)],
        ]);

        Review::create([
            'product_id' => $product->id,
            'user_id' => Auth::id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_verified_purchase' => $hasPurchased,
        ]);

        // Update product rating cache
        $this->updateProductRating($product);

        return back()->with('success', 'Thank you for your review!');
    }

    public function update(Request $request, Review $review)
    {
        $this->authorize('update', $review);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => ['nullable', 'string', 'max:1000', new SafeString(true)],
        ]);

        $review->update($validated);

        $this->updateProductRating($review->product);

        return back()->with('success', 'Review updated.');
    }

    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        $product = $review->product;
        $review->delete();

        $this->updateProductRating($product);

        return back()->with('success', 'Review deleted.');
    }

    private function updateProductRating(Product $product)
    {
        $avg = $product->reviews()->avg('rating');
        $count = $product->reviews()->count();

        $product->update([
            'rating_average' => $avg ? round($avg, 1) : 0,
            'rating_count' => $count,
        ]);
    }
}
