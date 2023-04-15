import BatteryGauge from 'react-battery-gauge';
import { Box, Flex } from '@chakra-ui/react';

export default function ProteinMeter() {
  return (
    <Box>
      <Flex justifyContent={'center'} mx={2}>
        <BatteryGauge
          value={80}
          size={500}
          animated={true}
          aspectRatio={0.23}
          customization={{
            batteryBody: {
              strokeWidth: 2,
              cornerRadius: 4,
            },
            batteryMeter: {
              fill: 'green',
              lowBatteryValue: 20,
              lowBatteryFill: 'red',
            },
          }}
        />
      </Flex>
    </Box>
  );
}
