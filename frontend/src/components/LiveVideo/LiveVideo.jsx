import styles from './LiveVideo.module.css';
import { useEffect, useRef } from 'react';

export default function LiveVideo({ track }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      track.attach(videoRef.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return (
    <video
      ref={videoRef}
      id={track?.sid}
      className={styles.video}
    />
  );
}
