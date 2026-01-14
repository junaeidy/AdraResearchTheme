import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import ReviewSummary from './ReviewSummary';
import PrimaryButton from '@/Components/PrimaryButton';
import { Review } from '@/types/models';

interface Product {
    id: number;
    slug: string;
    rating_average: number;
    rating_count: number;
}

interface ReviewListProps {
    reviews: Review[];
    product: Product;
    canReview: boolean;
    currentUserId?: number;
    isAdmin?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
    reviews, 
    product, 
    canReview,
    currentUserId,
    isAdmin = false
}) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
    const [filterRating, setFilterRating] = useState<number | null>(null);

    // Calculate rating distribution
    const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });

    // Filter and sort reviews
    let filteredReviews = filterRating 
        ? reviews.filter(r => r.rating === filterRating)
        : reviews;

    const sortedReviews = [...filteredReviews].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'highest':
                return b.rating - a.rating;
            case 'lowest':
                return a.rating - b.rating;
            default:
                return 0;
        }
    });

    // Check if user already reviewed
    const userReview = currentUserId 
        ? reviews.find(r => r.user?.id === currentUserId)
        : null;

    return (
        <div className="space-y-6">
            {/* Review Summary */}
            <ReviewSummary
                averageRating={product.rating_average}
                totalReviews={product.rating_count}
                ratingDistribution={ratingDistribution}
                onFilterByRating={setFilterRating}
            />

            {/* Write Review Button */}
            {canReview && !userReview && !showReviewForm && (
                <div className="text-center">
                    <PrimaryButton onClick={() => setShowReviewForm(true)}>
                        Write a Review
                    </PrimaryButton>
                </div>
            )}

            {/* Review Form */}
            {showReviewForm && (
                <ReviewForm
                    product={product}
                    onCancel={() => setShowReviewForm(false)}
                />
            )}

            {/* Sort and Filter Controls */}
            {reviews.length > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs sm:text-sm text-gray-600">
                        Showing {sortedReviews.length} of {reviews.length} reviews
                        {filterRating && ` (${filterRating} stars)`}
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full sm:w-auto text-xs sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                    </select>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {sortedReviews.length > 0 ? (
                    sortedReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            canEdit={review.user?.id === currentUserId}
                            canDelete={review.user?.id === currentUserId || isAdmin}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                            {filterRating 
                                ? `No ${filterRating}-star reviews yet` 
                                : 'No reviews yet. Be the first to review this product!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
