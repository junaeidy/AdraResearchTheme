import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Alert from '../Shared/Alert';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    onImageRemove?: () => void;
    currentImage?: string;
    maxSize?: number; // in MB
    accept?: Record<string, string[]>;
    label?: string;
    helperText?: string;
    error?: string;
}

export default function ImageUploader({
    onImageSelect,
    onImageRemove,
    currentImage,
    maxSize = 5,
    accept = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
    },
    label = 'Product Image',
    helperText = 'Upload JPG, PNG or WebP (max 5MB)',
    error,
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            setUploadError(null);

            if (rejectedFiles.length > 0) {
                const rejection = rejectedFiles[0];
                if (rejection.errors[0]?.code === 'file-too-large') {
                    setUploadError(`File is too large. Maximum size is ${maxSize}MB`);
                } else if (rejection.errors[0]?.code === 'file-invalid-type') {
                    setUploadError('Invalid file type. Please upload JPG, PNG or WebP');
                } else {
                    setUploadError('Error uploading file. Please try again');
                }
                return;
            }

            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                
                // Create preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);

                // Call parent callback
                onImageSelect(file);
            }
        },
        [maxSize, onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
        multiple: false,
    });

    const handleRemove = () => {
        setPreview(null);
        setUploadError(null);
        if (onImageRemove) {
            onImageRemove();
        }
    };

    const displayImage = preview || (currentImage ? `/storage/${currentImage}` : null);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            {displayImage ? (
                // Image preview
                <div className="relative">
                    <img
                        src={displayImage}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                // Upload area
                <div
                    {...getRootProps()}
                    className={`
                        border-2 border-dashed rounded-lg p-8
                        flex flex-col items-center justify-center
                        cursor-pointer transition
                        ${
                            isDragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                        }
                        ${error || uploadError ? 'border-red-500' : ''}
                    `}
                >
                    <input {...getInputProps()} />
                    <PhotoIcon className="w-12 h-12 text-gray-400 mb-3" />
                    
                    {isDragActive ? (
                        <p className="text-blue-600 font-medium">Drop the image here</p>
                    ) : (
                        <>
                            <p className="text-gray-700 font-medium mb-1">
                                Drag & drop an image here
                            </p>
                            <p className="text-gray-500 text-sm mb-2">or click to browse</p>
                            {helperText && (
                                <p className="text-xs text-gray-400">{helperText}</p>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Error message */}
            {(error || uploadError) && (
                <p className="mt-2 text-sm text-red-500">{error || uploadError}</p>
            )}
        </div>
    );
}

// Multiple images uploader for screenshots
interface MultipleImageUploaderProps {
    onImagesSelect: (files: File[]) => void;
    onImageRemove?: (index: number) => void;
    currentImages?: string[];
    maxSize?: number;
    maxFiles?: number;
    label?: string;
}

export function MultipleImageUploader({
    onImagesSelect,
    onImageRemove,
    currentImages = [],
    maxSize = 5,
    maxFiles = 5,
    label = 'Screenshots',
}: MultipleImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            setError(null);

            if (rejectedFiles.length > 0) {
                setError('Some files were rejected. Check file type and size.');
                return;
            }

            const totalFiles = currentImages.length + previews.length + acceptedFiles.length;
            if (totalFiles > maxFiles) {
                setError(`Maximum ${maxFiles} images allowed`);
                return;
            }

            // Create previews
            const newPreviews: string[] = [];
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    if (newPreviews.length === acceptedFiles.length) {
                        setPreviews([...previews, ...newPreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });

            onImagesSelect(acceptedFiles);
        },
        [currentImages.length, previews, maxFiles, onImagesSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        maxSize: maxSize * 1024 * 1024,
        multiple: true,
    });

    const handleRemove = (index: number, isExisting: boolean) => {
        if (isExisting && onImageRemove) {
            onImageRemove(index);
        } else {
            setPreviews(previews.filter((_, i) => i !== index));
        }
    };

    const allImages = [
        ...currentImages.map((img) => `/storage/${img}`),
        ...previews,
    ];

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} ({allImages.length}/{maxFiles})
                </label>
            )}

            {/* Image grid */}
            {allImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {allImages.map((img, index) => (
                        <div key={index} className="relative aspect-video">
                            <img
                                src={img}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemove(index, index < currentImages.length)
                                }
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload area */}
            {allImages.length < maxFiles && (
                <div
                    {...getRootProps()}
                    className={`
                        border-2 border-dashed rounded-lg p-6
                        flex flex-col items-center justify-center
                        cursor-pointer transition
                        ${
                            isDragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                        }
                    `}
                >
                    <input {...getInputProps()} />
                    <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                        {isDragActive
                            ? 'Drop images here'
                            : 'Click or drag to add more screenshots'}
                    </p>
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}
