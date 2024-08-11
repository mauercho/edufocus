import { useEffect, useRef } from 'react';

export default function IntersectionArea({ onObserve, once = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onObserve();
          if (once) {
            observer.disconnect();
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onObserve, once]);

  return <div ref={ref} />;
}
