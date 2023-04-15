import { useRef } from 'react';
import { useCountUp } from 'react-countup';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function ProteinCount() {
  const countUpRef = useRef(null);
  const { pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    end: 120,
    delay: 1,
    duration: 5,
  });
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Box fontSize={100} pr={3} ref={countUpRef} />
      <Text fontSize={60} pt={2}>
        g
      </Text>
      {/*<button onClick={reset}>Reset</button>
       <button onClick={pauseResume}>Pause/Resume</button>
       <button onClick={() => update(80)}>Update to 2000</button>
      */}
    </Flex>
  );
}
