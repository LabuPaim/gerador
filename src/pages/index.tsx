import React, { useState, useRef } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Textarea, HStack, VStack } from '@chakra-ui/react'
import { ArrowsClockwise, MaskHappy, MaskSad } from 'phosphor-react'

import {
  onGenerateCNPJ,
  onGenerateCPF,
  onGenerateRG,
  onSetMask,
} from '@/utils/document'
import { DocumentType } from '@/enums'

import AppIcon from '@/components/app-icon'
import AppButton from '@/components/app-button'
import ServicesButton from '@/components/services-button'
import CopyButton from '@/components/copy-button'

const Home: NextPage = () => {
  const [documentType, setDocumentType] = useState(DocumentType.CPF)
  const [documents, setDocuments] = useState<string[]>([])
  const [mask, setMask] = useState(true)
  const [inputValue, setInputValue] = useState("1")

  React.useEffect(() => {
    generateDocuments(documentType, inputValue)
  }, [documentType, inputValue])
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = documents.join('\n')
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [documents])

  const generateDocuments = (type: DocumentType, inputValue: string) => {
    setDocumentType(type)
    setInputValue(inputValue)
    const generatedDocuments: string[] = []

    for (let i = 0; i < parseInt(inputValue); i++) {
      let doc = ''

      if (type === DocumentType.CPF) {
        doc = onGenerateCPF(mask)
      } else if (type === DocumentType.CNPJ) {
        doc = onGenerateCNPJ(mask)
      } else if (type === DocumentType.RG) {
        doc = onGenerateRG(mask)
      }

      generatedDocuments.push(doc)
    }

    setDocuments(generatedDocuments)
  }

  const onToggleMask = (mask: boolean) => {
    setMask(mask)

    if (mask) {
      setDocuments((docs) => {
        return docs.map((doc) => onSetMask(doc, documentType))
      })
    } else {
      setDocuments((docs) => {
        return docs.map((doc) => doc.replace(/[^\d]/g, ''))
      })
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDocuments(event.target.value.split('\n'))
  }

  return (
    <>
      <Head>
        <title>Gerador | CPF/CNPJ e RG</title>
        <meta
          name="description"
          content="Gerador de CPF/CNPJ/RG válidos para testes de desenvolvimento."
        />
      </Head>

      <VStack
        style={{ alignItems: 'center', justifyContent: 'center' }}
        flex="1"
        spacing="10"
      >
        <ServicesButton
          documentType={documentType}
          onGenerate={generateDocuments}
        />

        <Textarea
          ref={textareaRef}
          size="sm"
          resize={'none'}
          // style={{ width: '20%', overflow: "hidden", border: "none"}}
          // style={{ width: '45%', overflow: "hidden", border: "none"}}
          style={{ width: '45%', overflow: "hidden"}}
          onChange={handleChange}
        />

        <HStack>
          <CopyButton text={documents.join('\n')} />
          <AppButton
            style={mask ? { backgroundColor: '#FBD38D', color: 'black' } : {}}
            motionKey={mask ? 'mask-happy' : 'mask-sad'}
            tooltip={mask ? 'Sem máscara' : 'Com máscara'}
            aria-label="Toggle Máscara"
            icon={<AppIcon icon={mask ? MaskHappy : MaskSad} />}
            onClick={() => onToggleMask(!mask)}
          />
          <AppButton
            motionKey={documents.join('\n')}
            tooltip="Gerar novo documento"
            aria-label="Re:Gerar"
            icon={<AppIcon icon={ArrowsClockwise} />}
            onClick={() => generateDocuments(documentType, inputValue)}
          />
        </HStack>
      </VStack>
    </>
  )
}

export default Home
