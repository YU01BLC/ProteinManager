import { useRef } from 'react';
import { useCountUp, CountUpProps } from 'react-countup';

interface UseProteinCountUpProps extends Omit<CountUpProps, 'end'> {
  end?: number;
}

export default function useProteinCount({ end, ...options }: UseProteinCountUpProps) {
  const countUpRef = useRef(null);

  const { pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    end: end || 0,
    delay: 1,
    duration: 5,
    ...options,
  });

  return { countUpRef, pauseResume, reset, update };
}
