import { Order } from '@/types';

interface OrderStatusTimelineProps {
    order: Order;
}

export default function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
    const steps = [
        {
            id: 'created',
            label: 'Order Created',
            completed: true,
            timestamp: order.created_at,
        },
        {
            id: 'payment',
            label: 'Payment Submitted',
            completed: ['awaiting_verification', 'processing', 'completed'].includes(order.status),
            timestamp: order.payment_proof?.created_at,
        },
        {
            id: 'verification',
            label: 'Payment Verified',
            completed: ['processing', 'completed'].includes(order.status),
            timestamp: order.payment_proof?.verified_at,
        },
        {
            id: 'completed',
            label: 'Order Completed',
            completed: order.status === 'completed',
            timestamp: order.status === 'completed' ? order.updated_at : undefined,
        },
    ];

    const currentStepIndex = steps.findIndex(step => !step.completed);
    const isRejected = order.status === 'payment_rejected';

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
            
            <div className="relative">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative pb-8 last:pb-0">
                        {index < steps.length - 1 && (
                            <div className={`
                                absolute left-4 top-8 bottom-0 w-0.5
                                ${step.completed ? 'bg-blue-600' : 'bg-gray-300'}
                            `} />
                        )}
                        
                        <div className="relative flex items-start gap-4">
                            <div className={`
                                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                ${step.completed 
                                    ? 'bg-blue-600 text-white' 
                                    : currentStepIndex === index && !isRejected
                                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                                        : 'bg-gray-200 text-gray-400'
                                }
                            `}>
                                {step.completed ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : currentStepIndex === index && !isRejected ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-current" />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <p className={`
                                    font-medium
                                    ${step.completed 
                                        ? 'text-gray-900' 
                                        : currentStepIndex === index 
                                            ? 'text-blue-600' 
                                            : 'text-gray-500'
                                    }
                                `}>
                                    {step.label}
                                </p>
                                
                                {step.timestamp && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(step.timestamp).toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                )}
                                
                                {currentStepIndex === index && !isRejected && (
                                    <p className="text-sm text-blue-600 mt-1">In Progress</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isRejected && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-red-900">Payment Rejected</h4>
                            {order.payment_proof?.rejection_reason && (
                                <p className="text-sm text-red-700 mt-1">
                                    {order.payment_proof.rejection_reason}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
