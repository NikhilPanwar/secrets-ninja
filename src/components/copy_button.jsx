import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaRegClipboard, FaCheck } from 'react-icons/fa';

const CopyButton = ({ textToCopy }) => {
  const [buttonText, setButtonText] = useState('Copy');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setButtonText('Copied');
        setIsCopied(true);
        setTimeout(() => {
          setButtonText('Copy');
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <Button color="gray" size="xs" onClick={copyToClipboard}>
      {isCopied ? (
        <FaCheck className="mr-2 h-3 w-3" />
      ) : (
        <FaRegClipboard className="mr-2 h-3 w-3" />
      )}
      {buttonText}
    </Button>
  );
};

export default CopyButton;
