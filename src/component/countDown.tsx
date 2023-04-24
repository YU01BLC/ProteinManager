import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Text fontSize={20}>{formatTime(timeLeft)}</Text>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </Box>
  );
}
