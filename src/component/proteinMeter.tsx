import { useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import BatteryGauge from 'react-battery-gauge';
import { InputContext } from '../page/mainFunction';

export default function ProteinMeter() {
  const { meterCount } = useContext(InputContext);

  return (
    <Box>
      <Flex justifyContent={'center'}>
        <BatteryGauge
          value={meterCount}
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

// 1gあたり7.5分が消化時間目安
