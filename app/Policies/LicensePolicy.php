<?php

namespace App\Policies;

use App\Models\License;
use App\Models\User;

class LicensePolicy
{
    /**
     * Determine whether the user can view the license.
     */
    public function view(User $user, License $license): bool
    {
        return $user->id == $license->user_id || $user->is_admin;
    }

    /**
     * Determine whether the user can update the license.
     */
    public function update(User $user, License $license): bool
    {
        return $user->id == $license->user_id || $user->is_admin;
    }

    /**
     * Determine whether the user can delete the license.
     */
    public function delete(User $user, License $license): bool
    {
        return $user->is_admin;
    }
}
