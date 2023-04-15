import { Box } from '@chakra-ui/react';
import ProteinCount from './component/proteinCount';
import ProteinMeter from './component/protainMeter';

export default function App() {
  return (
    <Box>
      <ProteinCount />
      <ProteinMeter />
    </Box>
  );
}
