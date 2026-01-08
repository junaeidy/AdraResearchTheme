import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const { getToken } = useRecaptcha();
    const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setRecaptchaError(null);

        try {
            const recaptcha_token = await getToken('reset_password');

            // Transform data sebelum dikirim
            transform((data) => ({
                ...data,
                recaptcha_token,
            }));

            // Submit menggunakan post dari useForm
            post(route('password.store'), {
                preserveScroll: true,
                onFinish: () => {
                    reset('password', 'password_confirmation');
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
            <Head title="Reset Password" />

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
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
