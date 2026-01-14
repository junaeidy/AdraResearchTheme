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
        <div className="space-y-2 sm:space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                Select License Type
            </label>
            <div className="space-y-1.5 sm:space-y-2">
                {licenseTypes.map((license) => (
                    <button
                        key={license.value}
                        onClick={() => onTypeChange(license.value)}
                        className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all active:scale-[0.98] ${
                            selectedType === license.value
                                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <div
                                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0 ${
                                            selectedType === license.value
                                                ? 'border-blue-600'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        {selectedType === license.value && (
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600"></div>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {license.label}
                                    </h4>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1 ml-5 sm:ml-7">
                                    {license.description}
                                </p>
                                {license.max_activations && (
                                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 ml-5 sm:ml-7">
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
