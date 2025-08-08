import { toast } from 'sonner';

interface CopyToClipboardOptions {
    successMessage?: string;
    errorMessage?: string;
    showToast?: boolean;
}

export const copyToClipboard = async (
    text: string,
    options: CopyToClipboardOptions = {}
): Promise<boolean> => {
    const {
        successMessage = 'คัดลอกไปยังคลิปบอร์ดแล้ว',
        errorMessage = 'ไม่สามารถคัดลอกได้ กรุณาลองใหม่',
        showToast = true
    } = options;

    try {
    // Check if clipboard API is available
    if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
            throw new Error('Fallback copy failed');
        }
    }

    if (showToast) {
      toast.success(successMessage);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    
    if (showToast) {
      toast.error(errorMessage);
    }
    
    return false;
  }
};
export const copyToClipboardWithCallback = async (
    text: string,
    onSuccess?: () => void,
    onError?: (error: Error) => void
): Promise<boolean> => {
  try {
    if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
            throw new Error('Fallback copy failed');
        }
    }

    onSuccess?.();
    return true;
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Failed to copy to clipboard:', err);
    onError?.(err);
    return false;
  }
};
export const useCopyToClipboard = () => {
  const copy = (text: string, options?: CopyToClipboardOptions) => {
    return copyToClipboard(text, options);
  };

  return { copy };
};

// Example usage:
/*
// Basic usage
await copyToClipboard('Hello World');

// With custom messages
await copyToClipboard('Hello World', {
  successMessage: 'คัดลอกสำเร็จ!',
  errorMessage: 'เกิดข้อผิดพลาด'
});

// Without toast notifications
await copyToClipboard('Hello World', { showToast: false });

// With callbacks
await copyToClipboardWithCallback(
  'Hello World',
  () => console.log('Copy successful'),
  (error) => console.error('Copy failed:', error)
);

// Using as hook in component
const { copy } = useCopyToClipboard();
const handleCopy = () => copy('Hello World');
*/