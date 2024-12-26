import { Theme } from '../types';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  theme: Theme;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  theme
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } p-6 max-w-sm w-full shadow-xl`}>
        <h3 className={`text-lg font-medium mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};
