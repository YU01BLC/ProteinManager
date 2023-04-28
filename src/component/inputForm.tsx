import {
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { InputContext } from '../../src/App';

interface FormProps {
  initialValue: number;
  onChange?: (valueAsString: string, valueAsNumber: number) => void;
}

interface InputProps {
  name: string;
  gram: number;
}

export default function InputForm({ initialValue, onChange }: FormProps) {
  const [name, setName] = useState<string>('');
  const [gram, setGram] = useState<number>(initialValue);
  const [invalidFlg, setInvalidFlg] = useState<boolean>(false);
  const { inputValues, setInputValues } = useContext(InputContext);

  const handleSubmit = () => {
    if (name === '' || gram === 0) {
      setInvalidFlg(true);
      return;
    }
    const newInputValues = [
      ...inputValues,
      {
        name,
        gram,
      },
    ];
    setInputValues(newInputValues);
    localStorage.setItem('inputHistory', JSON.stringify(newInputValues));
    console.log('newInputValues', newInputValues);
    setName('');
    setGram(0);
    setInvalidFlg(false);
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
