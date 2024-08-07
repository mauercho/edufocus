import { useEffect, useState } from 'react';

export default function Countdown({ seconds }) {
  // eslint-disable-next-line no-undef
  const [remainedTime, setRemainedTime] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainedTime((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainedTime]);

  return <span>{remainedTime}</span>;
}
