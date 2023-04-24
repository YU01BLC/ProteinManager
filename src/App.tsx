import { VStack, Box, Heading } from '@chakra-ui/react';
import CountDown from './component/countDown';
import InputForm from './component/inputForm';
import ProteinCount from './component/proteinCount';
import ProteinMeter from './component/proteinMeter';
import Header from './page/header';

export default function App() {
  return (
    <Box>
      <Box textAlign={'right'}>
        <Header />
      </Box>
      <Box mx={3}>
        <VStack>
          <Heading>1日の摂取プロテイン目安</Heading>
          <ProteinCount />

          <InputForm initialValue={0} />
          <Heading as='h3' size='lg' pb={2}>
            体内プロテイン残量
          </Heading>
          <CountDown />
          <ProteinMeter />
        </VStack>
      </Box>
    </Box>
  );
}
