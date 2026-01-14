import React, { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import RatingStars from './RatingStars';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface ReviewFormProps {
    product: {
        id: number;
        slug: string;
    };
    existingReview?: {
        id: number;
        rating: number;
        comment: string | null;
    };
    onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ product, existingReview, onCancel }) => {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (rating === 0) {
            setErrors({ rating: 'Please select a rating' });
            return;
        }

        setProcessing(true);
        setErrors({});

        const data = { rating, comment };

        if (existingReview) {
            // Update existing review
            router.patch(`/reviews/${existingReview.id}`, data, {
                onSuccess: () => {
                    setProcessing(false);
                    toast.success('Review updated successfully!');
                    if (onCancel) onCancel();
                },
                onError: (errors) => {
                    setProcessing(false);
                    setErrors(errors as any);
                    toast.error('Failed to update review. Please try again.');
                },
            });
        } else {
            // Create new review
            router.post(`/products/${product.slug}/reviews`, data, {
                onSuccess: () => {
                    setProcessing(false);
                    setRating(0);
                    setComment('');
                    toast.success('Review submitted successfully!');
                    if (onCancel) onCancel();
                },
                onError: (errors) => {
                    setProcessing(false);
                    setErrors(errors as any);
                    toast.error('Failed to submit review. Please try again.');
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                {existingReview ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            {/* Rating */}
            <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Your Rating *
                </label>
                <RatingStars 
                    rating={rating} 
                    size="lg" 
                    interactive 
                    onChange={setRating} 
                />
                {errors.rating && (
                    <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                )}
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label htmlFor="comment" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Your Review (Optional)
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    maxLength={1000}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your experience with this product..."
                />
                <div className="mt-1 text-xs sm:text-sm text-gray-500 text-right">
                    {comment.length}/1000 characters
                </div>
                {errors.comment && (
                    <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <PrimaryButton type="submit" disabled={processing}>
                    {processing ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
                </PrimaryButton>
                {onCancel && (
                    <SecondaryButton type="button" onClick={onCancel}>
                        Cancel
                    </SecondaryButton>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
