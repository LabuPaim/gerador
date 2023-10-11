import { useState, useRef } from 'react';
import { type ButtonProps } from '@chakra-ui/react';
import { Check, CopySimple } from 'phosphor-react';

import AppButton from './app-button';
import AppIcon from './app-icon';

interface CopyButtonProps extends ButtonProps {
  text: string;
}

const CopyButton = ({ text, ...props }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setHasCopied(true);
    }
  };

  return (
    <>
      <AppButton
        motionKey={hasCopied ? 'copied' : 'copy'}
        tooltip={hasCopied ? 'Copiado!' : 'Copiar'}
        aria-label="Copiar documento gerado"
        icon={<AppIcon icon={hasCopied ? Check : CopySimple} />}
        onClick={handleCopy}
        {...props}
      />
      <textarea
        ref={textAreaRef}
        value={text}
        style={{
          position: 'absolute',
          left: '-9999px',
        }}
        readOnly
      />
    </>
  );
};

export default CopyButton;
