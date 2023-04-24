import {
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState } from 'react';

interface FormProps {
  initialValue: number;
  onChange?: (valueAsString: string, valueAsNumber: number) => void;
}

export default function InputForm({ initialValue, onChange }: FormProps) {
  const [name, setName] = useState<string>('');
  const [gram, setGram] = useState<number>(initialValue);
  const [invalidFlg, setInvalidFlg] = useState<boolean>(false);

  const handleSubmit = () => {
    if (name === '' || gram === 0) {
      setInvalidFlg(true);
    } else {
      setName('');
      setGram(0);
      setInvalidFlg(false);
    }
  };

  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    setGram(valueAsNumber);
    if (onChange) {
      onChange(valueAsString, valueAsNumber);
    }
  };

  return (
    <VStack mb={10}>
      <HStack alignItems={'end'} mb={10}>
        <FormControl>
          <FormLabel htmlFor='name'>食品名</FormLabel>
          <Input
            id='name'
            placeholder='プロテイン'
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {name === '' && invalidFlg && <Text color={'red'}>食品名は必須です。</Text>}
        </FormControl>

        <FormControl isInvalid={invalidFlg}>
          <FormLabel htmlFor='gram'>摂取量</FormLabel>
          <NumberInput
            size='md'
            isInvalid={false}
            maxW={100}
            min={0}
            value={isNaN(gram) ? 0 : gram}
            onChange={handleChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {gram === 0 && invalidFlg && <Text color={'red'}>摂取量は必須です。</Text>}
        </FormControl>
        <Button px={10} colorScheme='teal' onClick={handleSubmit}>
          登録
        </Button>
      </HStack>
    </VStack>
  );
}
