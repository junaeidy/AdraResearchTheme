import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import RatingStars from './RatingStars';
import ReviewForm from './ReviewForm';
import { UserCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Review } from '@/types/models';

interface ReviewCardProps {
    review: Review;
    canEdit: boolean;
    canDelete: boolean;
    product?: {
        id: number;
        slug: string;
    };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, canEdit, canDelete, product }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        setIsDeleting(true);
        router.delete(`/reviews/${review.id}`, {
            onSuccess: () => {
                toast.success('Review deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete review. Please try again.');
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    if (isEditing && product) {
        return (
            <ReviewForm
                product={product}
                existingReview={review}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <UserCircleIcon className="w-10 h-10 text-gray-400" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.user?.name || 'Anonymous'}</span>
                            {review.is_verified_purchase && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckBadgeIcon className="w-3 h-3" />
                                    Verified Purchase
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
                <RatingStars rating={review.rating} size="sm" />
            </div>

            {review.comment && (
                <p className="text-gray-700 mt-3">{review.comment}</p>
            )}

            {(canEdit || canDelete) && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                    {canEdit && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Edit
                        </button>
                    )}
                    {canDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
