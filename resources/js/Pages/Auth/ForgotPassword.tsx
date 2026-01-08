import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        email: '',
    });

    const { getToken } = useRecaptcha();
    const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setRecaptchaError(null);

        try {
            const recaptcha_token = await getToken('forgot_password');

            // Transform data sebelum dikirim
            transform((data) => ({
                ...data,
                recaptcha_token,
            }));

            // Submit menggunakan post dari useForm
            post(route('password.email'), {
                preserveScroll: true,
                onFinish: () => {
                    // Reset transform
                    transform(() => data);
                },
            });
        } catch (error) {
            setRecaptchaError(error instanceof Error ? error.message : 'reCAPTCHA error occurred');
        }
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            {errors.throttle && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/50 dark:text-red-200">
                    {errors.throttle}
                </div>
            )}

            {errors.recaptcha_token && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/50 dark:text-red-200">
                    {errors.recaptcha_token}
                </div>
            )}

            {recaptchaError && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/50 dark:text-red-200">
                    {recaptchaError}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
