import React from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface RatingStarsProps {
    rating: number; // 0-5
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean; // can select rating
    onChange?: (rating: number) => void;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

const RatingStars: React.FC<RatingStarsProps> = ({ 
    rating, 
    size = 'md', 
    interactive = false, 
    onChange 
}) => {
    const [hoverRating, setHoverRating] = React.useState<number | null>(null);

    const handleClick = (value: number) => {
        if (interactive && onChange) {
            onChange(value);
        }
    };

    const handleMouseEnter = (value: number) => {
        if (interactive) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(null);
        }
    };

    const displayRating = hoverRating !== null ? hoverRating : rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => {
                const isFilled = value <= displayRating;
                const StarIcon = isFilled ? StarSolid : StarOutline;
                
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => handleMouseEnter(value)}
                        onMouseLeave={handleMouseLeave}
                        disabled={!interactive}
                        className={`
                            ${sizeClasses[size]}
                            ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
                            ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
                        `}
                    >
                        <StarIcon className="w-full h-full" />
                    </button>
                );
            })}
        </div>
    );
};

export default RatingStars;
