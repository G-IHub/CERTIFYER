/**
 * Copy text to clipboard with fallback for browsers that block the Clipboard API
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first (only in secure contexts)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Silently fall through to fallback method
    }
  }

  // Fallback method using a temporary textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible and positioned off-screen
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // For mobile devices
    textArea.setSelectionRange(0, 99999);
    
    // Try to copy using execCommand
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    // Silently fail - the UI will show the error message
    return false;
  }
}
