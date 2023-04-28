import { VStack, Box, Heading } from '@chakra-ui/react';
import CountDown from './component/countDown';
import InputForm from './component/inputForm';
import ProteinCount from './component/proteinCount';
import ProteinMeter from './component/proteinMeter';
import InputHistory from './component/inputHistory';
import Header from './page/header';
import { useState, useEffect, createContext } from 'react';

interface InputProps {
  name: string;
  gram: number;
}

type InputContextProps = {
  inputValues: InputProps[];
  setInputValues: React.Dispatch<React.SetStateAction<InputProps[]>>;
};

export const InputContext = createContext<InputContextProps>({
  inputValues: [],
  setInputValues: () => {},
});

export default function App() {
  const [inputValues, setInputValues] = useState<InputProps[]>([]);

  useEffect(() => {
    const historyItem = localStorage.getItem('inputHistory');
    if (historyItem) {
      setInputValues(JSON.parse(historyItem) as InputProps[]);
      console.log('storageItem', historyItem);
    }
  }, []);
  return (
    <Box>
      <Box textAlign={'right'}>
        <Header />
      </Box>
      <Box mx={3}>
        <VStack>
          <Heading>1日の摂取プロテイン目安</Heading>
          <ProteinCount />
          <InputContext.Provider value={{ inputValues, setInputValues }}>
            <InputForm initialValue={0} />
            <Heading as='h3' size='lg' pb={2}>
              体内プロテイン残量
            </Heading>
            <CountDown />
            <ProteinMeter />
            <InputHistory />
          </InputContext.Provider>
        </VStack>
      </Box>
    </Box>
  );
}
