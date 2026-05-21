export const copyToClipboard = async (text: string): Promise<void> => {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, text.length);

        try {
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            success ? resolve() : reject(new Error('execCommand вернул false'));
        } catch (err) {
            document.body.removeChild(textarea);
            reject(err);
        }
    });
};
