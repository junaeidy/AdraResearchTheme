import { Head, Link, router } from '@inertiajs/react';
import { PageProps, PaginatedData } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import RatingStars from '@/Components/Review/RatingStars';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import { CheckBadgeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    is_verified_purchase: boolean;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    product: {
        id: number;
        name: string;
        slug: string;
    };
}

interface ReviewsIndexProps extends PageProps {
    reviews: PaginatedData<Review>;
}

export default function ReviewsIndex({ auth, reviews }: ReviewsIndexProps) {
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

    const handleDelete = () => {
        if (!reviewToDelete) return;

        setDeleting(true);
        router.delete(`/admin/reviews/${reviewToDelete.id}`, {
            onSuccess: () => {
                toast.success('Review deleted successfully!');
                setReviewToDelete(null);
            },
            onError: () => {
                toast.error('Failed to delete review. Please try again.');
            },
            onFinish: () => setDeleting(false),
        });
    };

    const handleFilter = (rating: number | null) => {
        setFilterRating(rating);
        router.get('/admin/reviews', 
            { rating, search: searchTerm },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/reviews',
            { search: searchTerm, rating: filterRating },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Review Management</h2>
            }
        >
            <Head title="Manage Reviews" />

            <div className="max-w-7xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            All Reviews ({reviews.total})
                        </h3>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 min-w-[300px]">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by product or customer name..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </form>

                        {/* Rating Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilter(null)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filterRating === null
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleFilter(rating)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        filterRating === rating
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {rating}★
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {reviews.data.length > 0 ? (
                        <>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Comment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reviews.data.map((review) => (
                                        <tr key={review.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link 
                                                    href={`/shop/${review.product.slug}`}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                                >
                                                    {review.product.name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{review.user.name}</div>
                                                <div className="text-xs text-gray-500">{review.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <RatingStars rating={review.rating} size="sm" />
                                                    {review.is_verified_purchase && (
                                                        <CheckBadgeIcon 
                                                            className="w-4 h-4 text-green-500" 
                                                            title="Verified Purchase"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-md truncate">
                                                    {review.comment || <span className="text-gray-400 italic">No comment</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => setReviewToDelete(review)}
                                                    disabled={deleting}
                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50 inline-flex items-center gap-1"
                                                    title="Delete review"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {reviews.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{reviews.from}</span> to{' '}
                                            <span className="font-medium">{reviews.to}</span> of{' '}
                                            <span className="font-medium">{reviews.total}</span> results
                                        </div>
                                        <div className="flex gap-2">
                                            {reviews.links.map((link, index) => {
                                                if (!link.url) return null;
                                                
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        preserveState
                                                        preserveScroll
                                                        className={`px-3 py-1 rounded text-sm ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No reviews found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={reviewToDelete !== null}
                title="Delete Review"
                itemName={reviewToDelete ? `review by ${reviewToDelete.user.name}` : ''}
                message={reviewToDelete ? `This will permanently delete the review for "${reviewToDelete.product.name}".` : ''}
                onConfirm={handleDelete}
                onCancel={() => setReviewToDelete(null)}
                processing={deleting}
            />
        </AdminLayout>
    );
}
