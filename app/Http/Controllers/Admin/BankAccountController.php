<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BankAccountController extends Controller
{
    /**
     * Display a listing of bank accounts.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $bankAccounts = BankAccount::orderBy('sort_order')->get();
        
        return Inertia::render('Admin/BankAccounts/Index', [
            'bankAccounts' => $bankAccounts,
        ]);
    }
    
    /**
     * Store a newly created bank account.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'branch' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:1024', // 1MB
        ]);
        
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('bank-logos', 'public');
        }
        
        // Get the next sort order
        $maxOrder = BankAccount::max('sort_order') ?? 0;
        $validated['sort_order'] = $maxOrder + 1;
        
        BankAccount::create($validated);
        
        return back()->with('success', 'Bank account added successfully.');
    }
    
    /**
     * Update the specified bank account.
     *
     * @param Request $request
     * @param BankAccount $bankAccount
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, BankAccount $bankAccount)
    {
        $validated = $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'branch' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:1024', // 1MB
        ]);
        
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($bankAccount->logo) {
                Storage::disk('public')->delete($bankAccount->logo);
            }
            $validated['logo'] = $request->file('logo')->store('bank-logos', 'public');
        }
        
        $bankAccount->update($validated);
        
        return back()->with('success', 'Bank account updated successfully.');
    }
    
    /**
     * Toggle active status of bank account.
     *
     * @param BankAccount $bankAccount
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggleActive(BankAccount $bankAccount)
    {
        $bankAccount->update([
            'is_active' => !$bankAccount->is_active
        ]);
        
        $status = $bankAccount->is_active ? 'activated' : 'deactivated';
        return back()->with('success', "Bank account {$status} successfully.");
    }
    
    /**
     * Remove the specified bank account.
     *
     * @param BankAccount $bankAccount
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(BankAccount $bankAccount)
    {
        // Delete logo if exists
        if ($bankAccount->logo) {
            Storage::disk('public')->delete($bankAccount->logo);
        }
        
        $bankAccount->delete();
        
        return back()->with('success', 'Bank account deleted successfully.');
    }
}
