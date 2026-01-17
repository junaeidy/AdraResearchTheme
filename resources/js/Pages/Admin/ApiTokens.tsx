import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import toast from 'react-hot-toast';
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ApiTokensPageProps extends PageProps {
    tokens: {
        has_token: boolean;
        token: string | null;
        full_token: string | null;
        email: string;
        note: string | null;
    };
}

export default function ApiTokens({ auth, tokens }: ApiTokensPageProps) {
    const [showFullToken, setShowFullToken] = useState(false);
    const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
    
    const { processing: generating } = useForm({});
    const { processing: revoking } = useForm({});

    const handleGenerate: FormEventHandler = (e) => {
        e.preventDefault();
        
        router.post(route('admin.api-tokens.generate'), {}, {
            onSuccess: (page) => {
                setShowFullToken(true);
            },
            onError: () => {
            },
        });
    };

    const handleRevoke: FormEventHandler = (e) => {
        e.preventDefault();
        
        router.post(route('admin.api-tokens.revoke'), {}, {
            onSuccess: () => {
                setShowRevokeConfirm(false);
                setShowFullToken(false);
            },
            onError: () => {
            },
        });
    };

    const copyToClipboard = () => {
        if (tokens.full_token) {
            navigator.clipboard.writeText(tokens.full_token);
            toast.success('Token copied to clipboard!');
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="API Tokens - Admin Panel" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">API Tokens</h1>
                        <p className="text-gray-600 mt-2">Kelola API tokens untuk akses ke endpoint maintenance</p>
                    </div>

                    {/* Token Status Card */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Keadaan Token Saat Ini</CardTitle>
                        </CardHeader>
                        <div className="p-6 border-t">
                            {tokens.has_token ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div>
                                            <p className="text-sm font-medium text-green-800">✅ Token Aktif</p>
                                            <p className="text-xs text-green-600 mt-1">Token untuk API maintenance endpoint</p>
                                        </div>
                                    </div>

                                    {/* Token Display */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            API Token
                                        </label>
                                        
                                        {showFullToken && tokens.full_token ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={tokens.full_token}
                                                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono"
                                                    />
                                                    <button
                                                        onClick={copyToClipboard}
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                                        title="Copy to clipboard"
                                                    >
                                                        <DocumentDuplicateIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-red-600">
                                                    ⚠️ Catat token ini sekarang. Anda tidak akan bisa melihatnya lagi.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="password"
                                                    readOnly
                                                    value={tokens.token || ''}
                                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono"
                                                />
                                                <button
                                                    onClick={() => setShowFullToken(true)}
                                                    className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm"
                                                >
                                                    Tampilkan
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Usage Info */}
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <h3 className="text-sm font-medium text-blue-900 mb-2">📝 Cara Penggunaan</h3>
                                        <p className="text-sm text-blue-800 font-mono mb-2">
                                            POST /api/admin/maintenance/toggle?token=YOUR_TOKEN
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            Gunakan token ini untuk toggle maintenance mode tanpa perlu login.
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowRevokeConfirm(true)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                            Revoke Token
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-4">Anda belum memiliki API token</p>
                                    <form onSubmit={handleGenerate}>
                                        <Button type="submit" disabled={generating} isLoading={generating}>
                                            Generate Token Baru
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Generate New Token Card (if has token) */}
                    {tokens.has_token && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Generate Token Baru</CardTitle>
                            </CardHeader>
                            <div className="p-6 border-t">
                                <p className="text-sm text-gray-600 mb-4">
                                    Jika ingin mengganti token, generate token baru terlebih dahulu sebelum revoke token lama.
                                </p>
                                <form onSubmit={handleGenerate}>
                                    <Button type="submit" disabled={generating} isLoading={generating} variant="secondary">
                                        Generate Token Tambahan
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Revoke Confirmation Modal */}
            {showRevokeConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Revoke API Token?</h3>
                        <p className="text-gray-600 mb-6">
                            Token ini tidak akan bisa digunakan lagi setelah direvolke. Pastikan Anda memiliki backup token yang lain.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowRevokeConfirm(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                            >
                                Batal
                            </button>
                            <form onSubmit={handleRevoke} className="inline">
                                <Button type="submit" variant="danger" disabled={revoking} isLoading={revoking}>
                                    Revoke
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
