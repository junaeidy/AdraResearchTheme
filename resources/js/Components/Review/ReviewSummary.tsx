import React from 'react';
import RatingStars from './RatingStars';

interface ReviewSummaryProps {
    averageRating: number;
    totalReviews: number;
    ratingDistribution?: { [key: number]: number };
    onFilterByRating?: (rating: number | null) => void;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ 
    averageRating, 
    totalReviews,
    ratingDistribution,
    onFilterByRating
}) => {
    const distribution = ratingDistribution || {};
    const maxCount = Math.max(...Object.values(distribution), 1);
    
    // Convert to number and handle null/undefined
    const avgRating = Number(averageRating) || 0;
    const total = Number(totalReviews) || 0;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                {/* Average Rating */}
                <div className="text-center w-full sm:w-auto">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                        {avgRating.toFixed(1)}
                    </div>
                    <RatingStars rating={avgRating} size="md" />
                    <div className="text-xs sm:text-sm text-gray-500 mt-2">
                        {total} {total === 1 ? 'review' : 'reviews'}
                    </div>
                </div>

                {/* Rating Distribution */}
                {ratingDistribution && (
                    <div className="flex-1 w-full">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = distribution[rating] || 0;
                            const percentage = total > 0 ? (count / total) * 100 : 0;
                            
                            return (
                                <button
                                    key={rating}
                                    onClick={() => onFilterByRating?.(rating)}
                                    className="flex items-center gap-1 sm:gap-2 w-full group hover:bg-gray-50 py-1 px-1 sm:px-2 rounded transition"
                                >
                                    <span className="text-xs sm:text-sm font-medium text-gray-700 w-8 sm:w-12">
                                        {rating} ★
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-yellow-400 h-2 rounded-full group-hover:bg-yellow-500 transition"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-500 w-8 sm:w-12 text-right">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {onFilterByRating && totalReviews > 0 && (
                <button
                    onClick={() => onFilterByRating(null)}
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Show all reviews
                </button>
            )}
        </div>
    );
};

export default ReviewSummary;
