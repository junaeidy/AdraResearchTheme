<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LicenseActivation extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_id',
        'domain',
        'journal_path',
        'full_identifier',
        'ip_address',
        'ojs_version',
        'user_agent',
        'activated_at',
        'last_check_at',
    ];

    protected $casts = [
        'activated_at' => 'datetime',
        'last_check_at' => 'datetime',
    ];

    /**
     * Relationships
     */
    public function license()
    {
        return $this->belongsTo(License::class);
    }
}
