import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
      } ${
        type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="p-1 hover:bg-white/20 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

type ToastType = 'success' | 'error';

interface ToastOptions {
  message: string;
  type: ToastType;
}

interface ToastManager {
  success: (message: string) => void;
  error: (message: string) => void;
}

let toastQueue: Array<() => void> = [];

export const toast: ToastManager = {
  success: (message: string) => showToast({ message, type: 'success' }),
  error: (message: string) => showToast({ message, type: 'error' })
};

function showToast(options: ToastOptions) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const removeToast = () => {
    document.body.removeChild(container);
    toastQueue = toastQueue.filter(t => t !== removeToast);
    if (toastQueue.length > 0) {
      toastQueue[0]();
    }
  };

  const render = () => {
    const root = createRoot(container);
    root.render(
      <Toast
        message={options.message}
        type={options.type}
        onClose={removeToast}
      />
    );
  };

  if (toastQueue.length === 0) {
    render();
  }
  
  toastQueue.push(render);
}

import { createRoot } from 'react-dom/client';
