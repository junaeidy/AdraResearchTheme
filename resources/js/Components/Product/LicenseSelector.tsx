import { LicenseType, LicenseTypeOption } from '@/types/models';

interface LicenseSelectorProps {
    licenseTypes: LicenseTypeOption[];
    selectedType: LicenseType;
    onTypeChange: (type: LicenseType) => void;
}

export default function LicenseSelector({
    licenseTypes,
    selectedType,
    onTypeChange,
}: LicenseSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
                Select License Type
            </label>
            <div className="space-y-2">
                {licenseTypes.map((license) => (
                    <button
                        key={license.value}
                        onClick={() => onTypeChange(license.value)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedType === license.value
                                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                            selectedType === license.value
                                                ? 'border-blue-600'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        {selectedType === license.value && (
                                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-gray-900">
                                        {license.label}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 ml-7">
                                    {license.description}
                                </p>
                                {license.max_activations && (
                                    <p className="text-xs text-gray-500 mt-1 ml-7">
                                        Up to {license.max_activations} activation{license.max_activations > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
