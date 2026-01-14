import { License } from '@/types';
import ActivationList from './ActivationList';

interface Props {
    license: License;
}

export default function ActivationManager({ license }: Props) {
    const remainingSlots = license.max_activations - license.activated_count;

    return (
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Activation Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 text-center">
                    <div>
                        <div className="text-xl sm:text-2xl font-bold text-blue-900">{license.max_activations}</div>
                        <div className="text-xs sm:text-sm text-blue-700 mt-1">Max Activations</div>
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold text-blue-900">{license.activated_count}</div>
                        <div className="text-xs sm:text-sm text-blue-700 mt-1">Currently Active</div>
                    </div>
                    <div>
                        <div className={`text-xl sm:text-2xl font-bold ${remainingSlots > 0 ? 'text-green-900' : 'text-red-900'}`}>
                            {remainingSlots}
                        </div>
                        <div className={`text-xs sm:text-sm mt-1 ${remainingSlots > 0 ? 'text-green-700' : 'text-red-700'}`}>
                            Slots Remaining
                        </div>
                    </div>
                </div>
            </div>

            {/* Activations List */}
            <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
                <div className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Active Installations</h3>
                </div>
                <ActivationList activations={license.activations || []} productSlug={license.product?.slug || ''} />
            </div>

            {/* Manual Activation Instructions */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">How to Activate</h3>
                <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                    <li className="flex gap-2 sm:gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">1</span>
                        <span>Install the plugin/theme on your OJS installation</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">2</span>
                        <span>Go to Settings → Plugin/Theme Settings</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">3</span>
                        <span>Enter your license key and click "Activate"</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold">4</span>
                        <span>The license will be validated automatically</span>
                    </li>
                </ol>
            </div>
        </div>
    );
}
