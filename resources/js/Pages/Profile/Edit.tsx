import { PageProps } from '@/types';
import AccountLayout from '@/Layouts/AccountLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AccountLayout title="Profile" auth={auth}>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 shadow-md">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 shadow-md">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 shadow-md">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AccountLayout>
    );
}
