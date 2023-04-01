import { useState } from 'react';
import { Copy, Files } from 'lucide-react';

type Props = {
  copyText: string;
};

const CopyToClipboard = ({ copyText }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ml-2">
      {/* <input type="text" value={copyText} readOnly /> */}
      {/* Bind our handler function to the onClick button property */}
      <button onClick={handleCopyClick} className="text-purple-400">
        {isCopied ? (
          <span className="text-xs">Copied!</span>
        ) : (
          <Files size={14} />
        )}
      </button>
    </div>
  );
};
export default CopyToClipboard;
