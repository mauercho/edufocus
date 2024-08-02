import { useEffect, useRef } from 'react';

export default function LiveAudio({ track }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      track.attach(audioRef.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return (
    <audio
      ref={audioRef}
      id={track.sid}
    />
  );
}
