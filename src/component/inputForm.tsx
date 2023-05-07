import {
  FormLabel,
  Input,
  VStack,
  HStack,
  Box,
  Flex,
  Text,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { CountUpProps } from 'react-countup';
import RegisterButton from './uiParts/registerButton';
import useProteinCount from '../logic/proteinCount';
import { InputContext } from '../page/mainFunction';

interface FormProps {
  initialValue: number;
  onChange?: (valueAsString: string, valueAsNumber: number) => void;
}

interface UseProteinCountUpProps extends Omit<CountUpProps, 'end'> {
  end?: number;
}

type CombinedProps = FormProps & UseProteinCountUpProps;

export default function InputForm({ initialValue, onChange, end, ...options }: CombinedProps) {
  const [name, setName] = useState<string>('');
  const [gram, setGram] = useState<number>(initialValue);
  const [invalidFlg, setInvalidFlg] = useState<boolean>(false);
  const { inputValues, gramTotal, setInputValues, setGramTotal } = useContext(InputContext);
  const { countUpRef, update } = useProteinCount({
    end: gramTotal,
    ...options,
  });
  const handleSubmit = (): void => {
    if (name === '' || gram === 0) {
      setInvalidFlg(true);
      return;
    }
    const newInputValues: { name: string; gram: number }[] = [
      ...inputValues,
      {
        name,
        gram,
      },
    ];
    const result: number = gramTotal - gram;
    update(result);
    setGramTotal(result);
    setInputValues(newInputValues);
    localStorage.setItem('inputHistory', JSON.stringify(newInputValues));
    localStorage.setItem('gramTotal', result.toString());
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
    <VStack>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Box fontSize={100} pr={3} ref={countUpRef} />
        <Text fontSize={60} pt={2}>
          g
        </Text>
      </Flex>
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
        <RegisterButton px={10} colorScheme='teal' label={'登録'} onClick={handleSubmit} />
      </HStack>
    </VStack>
  );
}
