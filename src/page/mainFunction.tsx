import { VStack, Heading } from '@chakra-ui/react';
import { useState, useEffect, createContext } from 'react';
import CountDown from '../component/countDown';
import InputForm from '../component/inputForm';
import InputHistory from '../component/inputHistory';
import ProteinMeter from '../component/proteinMeter';

interface InputProps {
  name: string;
  gram: number;
}

type InputContextProps = {
  inputValues: InputProps[];
  gramTotal: number;
  setGramTotal: React.Dispatch<React.SetStateAction<number>>;
  setInputValues: React.Dispatch<React.SetStateAction<InputProps[]>>;
};

export const InputContext = createContext<InputContextProps>({
  inputValues: [],
  gramTotal: 0,
  setInputValues: () => {},
  setGramTotal: () => {},
});

export default function MainFunction() {
  const [inputValues, setInputValues] = useState<InputProps[]>([]);
  const [gramTotal, setGramTotal] = useState<number>(120);

  useEffect(() => {
    const historyItem = localStorage.getItem('inputHistory');
    if (historyItem) {
      setInputValues(JSON.parse(historyItem) as InputProps[]);
      console.log('storageItem', historyItem);
    }
  }, []);

  useEffect(() => {
    const historyGram = Number(localStorage.getItem('gramTotal'));
    if (historyGram) {
      setGramTotal(historyGram);
      console.log('gramTotal', gramTotal);
    }
  }, [gramTotal]);
  return (
    <VStack mx={3}>
      <Heading>1日の摂取プロテイン目安</Heading>
      <InputContext.Provider value={{ inputValues, gramTotal, setInputValues, setGramTotal }}>
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
