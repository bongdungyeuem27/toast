import { useCallback } from 'react';
import { eventEmitter } from '../components/ToastContainer';
import { STATUS } from '../constants/index';

/**
 * to useToast
 * @param message string to display
 * @param options has @param time: int miliseconds default is 3000
 * @param options has @param closeOnClick: bool close on click event
 * @param options has @param pauseOnHover: bool pause on hover event
 * @returns return cursor to use function
 */

type ToastMessage = string;
type ToastOptions = {
    time?: number;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
};

export default function useToast() {
    const success = useCallback((message?: ToastMessage, options?: ToastOptions) => {
        eventEmitter.emit('create', STATUS.SUCCESS, message, options);
    }, []);
    const info = useCallback((message?: ToastMessage, options?: ToastOptions) => {
        eventEmitter.emit('create', STATUS.INFO, message, options);
    }, []);
    const warning = useCallback((message?: ToastMessage, options?: ToastOptions) => {
        eventEmitter.emit('create', STATUS.WARNING, message, options);
    }, []);
    const error = useCallback((message?: ToastMessage, options?: ToastOptions) => {
        // console.log("A")
        eventEmitter.emit('create', STATUS.ERROR, message, options);
    }, []);
    const clear = () => {
        eventEmitter.emit('clear');
    };
    return { success, info, warning, error, clear };
}
