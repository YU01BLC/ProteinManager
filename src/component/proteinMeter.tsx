import { Box, Flex } from '@chakra-ui/react';
import BatteryGauge from 'react-battery-gauge';

export default function ProteinMeter() {
  return (
    <Box>
      <Flex justifyContent={'center'}>
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
