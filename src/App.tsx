import { Box } from '@chakra-ui/react';
import Header from './page/header';
import MainFunction from './page/mainFunction';

export default function App() {
  return (
    <Box>
      <Box textAlign={'right'}>
        <Header />
      </Box>
      <MainFunction />
    </Box>
  );
}
