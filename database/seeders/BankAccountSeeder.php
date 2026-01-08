<?php

namespace Database\Seeders;

use App\Models\BankAccount;
use Illuminate\Database\Seeder;

class BankAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            [
                'bank_name' => 'Bank Central Asia (BCA)',
                'account_number' => '1234567890',
                'account_name' => 'PT Adra Research Indonesia',
                'branch' => 'Jakarta Pusat',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'bank_name' => 'Bank Mandiri',
                'account_number' => '9876543210',
                'account_name' => 'PT Adra Research Indonesia',
                'branch' => 'Tangerang',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'bank_name' => 'Bank Negara Indonesia (BNI)',
                'account_number' => '4567891230',
                'account_name' => 'PT Adra Research Indonesia',
                'branch' => 'Bandung',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($accounts as $account) {
            BankAccount::create($account);
        }
    }
}
