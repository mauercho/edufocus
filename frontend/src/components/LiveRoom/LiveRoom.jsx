import styles from './LiveRoom.module.css';
import ChatRoom from '../ChatRoom/ChatRoom';
import { LiveAudio } from '../LiveAudio';
import { LiveVideo } from '../LiveVideo';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';

export default function LiveRoom({ room, localTrack, remoteTracks, leaveRoom, mainTrack }) {
  return (
    <>
      <main>
        {room ? (
          <>
            <div className={styles.videoWrapper}>
              {localTrack && (
                <LiveVideo
                  track={localTrack}
                  identity="나"
                />
              )}
              {remoteTracks.map((track) =>
                track.trackPublication.kind === 'video' ? (
                  <LiveVideo
                    key={track.trackPublication.trackSid}
                    track={track.trackPublication.videoTrack}
                  />
                ) : (
                  <LiveAudio
                    key={track.trackPublication.trackSid}
                    track={track.trackPublication.audioTrack}
                  />
                )
              )}
            </div>
            {mainTrack && <LiveVideo track={mainTrack} />}
          </>
        ) : (
          <LoadingIndicator fill />
        )}
      </main>
      <aside>
        <ChatRoom />
        <button onClick={leaveRoom}>나가기</button>
      </aside>
    </>
  );
}
