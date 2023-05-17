import { VStack, Heading, Box, Flex, Text } from '@chakra-ui/react';
import { useState, useEffect, createContext } from 'react';
import { CountUpProps } from 'react-countup';
import CountDown from '../component/countDown';
import InputForm from '../component/inputForm';
import InputHistory from '../component/inputHistory';
import ProteinMeter from '../component/proteinMeter';
import useProteinCount from '../logic/proteinCount';

interface InputProps {
  name: string;
  gram: number;
}

interface UseProteinCountUpProps extends Omit<CountUpProps, 'end'> {
  end?: number;
}

type InputContextProps = {
  inputValues: InputProps[];
  gramTotal: number;
  meterCount: number;
  setGramTotal: React.Dispatch<React.SetStateAction<number>>;
  setMeterCount: React.Dispatch<React.SetStateAction<number>>;
  setInputValues: React.Dispatch<React.SetStateAction<InputProps[]>>;
};

export const InputContext = createContext<InputContextProps>({
  inputValues: [],
  gramTotal: 0,
  meterCount: 0,
  setInputValues: () => {},
  setGramTotal: () => {},
  setMeterCount: () => {},
});

export default function MainFunction({ end, ...options }: UseProteinCountUpProps) {
  const initialNumber = 120;
  const [inputValues, setInputValues] = useState<InputProps[]>([]);
  const [gramTotal, setGramTotal] = useState<number>(initialNumber);
  const [meterCount, setMeterCount] = useState<number>(0);
  const { countUpRef, update } = useProteinCount({
    end: gramTotal,
    ...options,
  });
  useEffect(() => {
    const historyItem = localStorage.getItem('inputHistory');
    const historyGram = Number(localStorage.getItem('gramTotal'));
    if (historyItem) {
      setInputValues(JSON.parse(historyItem) as InputProps[]);
      setMeterCount(initialNumber - historyGram);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const historyGram = Number(localStorage.getItem('gramTotal'));
    if (historyGram) {
      setGramTotal(historyGram);
      update(gramTotal);
    }
    if (gramTotal === 0) {
      update(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gramTotal]);
  return (
    <VStack mx={3}>
      <Heading>1日の摂取プロテイン目安</Heading>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Box fontSize={100} pr={3} ref={countUpRef} />
        <Text fontSize={60} pt={2}>
          g
        </Text>
      </Flex>
      <InputContext.Provider
        value={{ inputValues, gramTotal, meterCount, setInputValues, setGramTotal, setMeterCount }}
      >
        <InputForm initialValue={0} />
        <Heading as='h3' size='lg' py={4}>
          体内プロテイン残量
        </Heading>
        <CountDown />
        <ProteinMeter />
        <InputHistory />
      </InputContext.Provider>
    </VStack>
  );
}
