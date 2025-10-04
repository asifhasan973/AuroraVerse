import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const Toast = ({
    message,
    duration = 5000,
    onClose,
    type = 'info',
    position = 'top-right',
    clickToDismiss = false
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    // Add click anywhere to dismiss functionality
    useEffect(() => {
        if (!clickToDismiss) return;

        const handleClickOutside = (event) => {
            // Don't close if clicking on the toast itself
            if (event.target.closest('[data-toast-container]')) return;
            handleClose();
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [clickToDismiss]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300); // Match animation duration
    };

    if (!isVisible) return null;

    const positionClasses = {
        'top-right': 'top-20 right-4 sm:top-24 sm:right-6',
        'top-left': 'top-20 left-4 sm:top-24 sm:left-6',
        'top-center': 'top-20 left-1/2 transform -translate-x-1/2 sm:top-24',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };

    const typeClasses = {
        info: 'bg-blue-500/90 text-white border-blue-400',
        success: 'bg-green-500/90 text-white border-green-400',
        warning: 'bg-yellow-500/90 text-white border-yellow-400',
        error: 'bg-red-500/90 text-white border-red-400'
    };

    return (
        <div
            data-toast-container
            className={`fixed z-50 w-full max-w-xs sm:max-w-sm p-3 sm:p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${positionClasses[position]
                } ${typeClasses[type]} ${isExiting
                    ? 'opacity-0 scale-95 translate-x-full'
                    : 'opacity-100 scale-100 translate-x-0 animate-slide-in-right'
                }`}
        >
            <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {message}
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close notification"
                >
                    <X size={14} className="sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;