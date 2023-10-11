import { Button, HStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React from 'react'

import { DocumentType } from '@/enums'

interface ServicesButtonProps {
  documentType: DocumentType
  onGenerate: (type: DocumentType, inputValue: string) => void
}

const ServicesButton = ({ documentType, onGenerate }: ServicesButtonProps) => {
  const [inputValue, setInputValue] = React.useState("1");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleGenerate = () => {
    onGenerate(documentType, inputValue);
  };

  return (
    <HStack style={{ justifyContent: "center" }}>
      <Button
        isActive={documentType === DocumentType.CPF}
        onClick={() => onGenerate(DocumentType.CPF, inputValue)}
      >
        CPF
      </Button>
      <Button
        isActive={documentType === DocumentType.CNPJ}
        onClick={() => onGenerate(DocumentType.CNPJ, inputValue)}
      >
        CNPJ
      </Button>
      <Button
        isActive={documentType === DocumentType.RG}
        onClick={() => onGenerate(DocumentType.RG, inputValue)}
      >
        RG
      </Button>
      <Input
        placeholder='QTD'
        variant='filled'
        type='text'
        style={{ width: "18%" }}
        value={inputValue}
        onChange={handleInputChange}
      />
    </HStack>
  )
}

export default ServicesButton
