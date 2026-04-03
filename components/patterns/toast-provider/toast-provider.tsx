// Dependencies: react-hot-toast
// Source: dirt-to-keys

import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  /** Toast position (default: top-right) */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Duration in ms (default: 4000) */
  duration?: number;
  /** CSS color for success icon/border */
  successColor?: string;
  /** CSS color for error icon/border */
  errorColor?: string;
  /** CSS color for loading icon/border */
  loadingColor?: string;
}

export default function ToastProvider({
  position = 'top-right',
  duration = 4000,
  successColor = '#6b8a6b',
  errorColor = '#ef4444',
  loadingColor = '#c2994e',
}: ToastProviderProps) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration,
        style: {
          background: 'white',
          color: '#1a1a1a',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: successColor,
            secondary: 'white',
          },
          style: {
            borderLeft: `4px solid ${successColor}`,
          },
        },
        error: {
          iconTheme: {
            primary: errorColor,
            secondary: 'white',
          },
          style: {
            borderLeft: `4px solid ${errorColor}`,
          },
        },
        loading: {
          iconTheme: {
            primary: loadingColor,
            secondary: 'white',
          },
          style: {
            borderLeft: `4px solid ${loadingColor}`,
          },
        },
      }}
    />
  );
}
