import { useState, useRef, ChangeEvent } from 'react';
import InputError from '@/Components/InputError';

interface PaymentProofUploaderProps {
    value?: File | null;
    onChange: (file: File | null) => void;
    error?: string;
}

export default function PaymentProofUploader({ value, onChange, error }: PaymentProofUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        // Validate file type
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            alert('Only JPEG, JPG, and PNG images are allowed');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        onChange(file);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-[14px] font-bold text-gray-900">
                Payment Proof Image *
            </label>

            {!preview ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
                        relative border-2 border-dashed rounded-2xl p-10
                        transition-all duration-200
                        ${dragActive 
                            ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 scale-[1.02]' 
                            : 'border-gray-300 hover:border-blue-400 bg-white'
                        }
                    `}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="mt-4 text-[15px] text-gray-700">
                            <span className="font-bold text-blue-600 hover:text-blue-700">
                                Click to upload
                            </span>
                            {' '}or drag and drop
                        </div>
                        <p className="mt-2 text-[13px] text-gray-500 font-medium">
                            JPEG, JPG, PNG up to 5MB
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Payment proof preview"
                        className="w-full max-h-96 object-contain rounded-2xl border-2 border-gray-300 shadow-md"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-3 right-3 p-2.5 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-xl hover:scale-110 transition-all shadow-lg"
                        title="Remove image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {error && <InputError message={error} />}
            
            <p className="text-[13px] text-gray-500 font-medium">
                Please upload a clear photo or screenshot of your bank transfer receipt
            </p>
        </div>
    );
}
