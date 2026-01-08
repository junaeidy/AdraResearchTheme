<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@adraresearch.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'organization' => 'Adra Research',
            'country' => 'Indonesia',
            'phone' => '+62123456789',
            'email_verified_at' => now(),
        ]);

        // Create test customers
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'organization' => 'University of Example',
            'country' => 'United States',
            'phone' => '+1234567890',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'organization' => 'Institute of Technology',
            'country' => 'United Kingdom',
            'phone' => '+441234567890',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Ahmad Hassan',
            'email' => 'ahmad@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'organization' => 'Universitas Indonesia',
            'country' => 'Indonesia',
            'phone' => '+62811223344',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Maria Garcia',
            'email' => 'maria@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'organization' => 'Universidad de Madrid',
            'country' => 'Spain',
            'phone' => '+34123456789',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Li Wei',
            'email' => 'li@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'organization' => 'Beijing University',
            'country' => 'China',
            'phone' => '+86123456789',
            'email_verified_at' => now(),
        ]);
    }
}
