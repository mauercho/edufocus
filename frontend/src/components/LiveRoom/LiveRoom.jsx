import styles from './LiveRoom.module.css';
import { isEqualTrackRef, isTrackReference } from '@livekit/components-core';
import {
  CarouselLayout,
  ConnectionStateToast,
  ControlBar,
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  useCreateLayoutContext,
  usePinnedTracks,
  useRoomInfo,
  useTracks,
  useParticipants,
  useLocalParticipant,
} from '@livekit/components-react';
import { RoomEvent, Track } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';
import ChatRoom from '../ChatRoom/ChatRoom';

export default function LiveRoom() {
  const lastAutoFocusedScreenShareTrack = useRef(null);
  const [role, setRole] = useState(null);

  const room = useRoomInfo();
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );
  const layoutContext = useCreateLayoutContext();

  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  useEffect(() => {
    try {
      const role = JSON.parse(localParticipant.identity).role;

      setRole(role);
    } catch (_) {
      return;
    }
  }, [localParticipant.identity]);

  useEffect(() => {
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) => track.publication.trackSid === lastAutoFocusedScreenShareTrack.current?.publication?.trackSid
      )
    ) {
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
    if (focusTrack && !isTrackReference(focusTrack)) {
      const updatedFocusTrack = tracks.find(
        (tr) => tr.participant.identity === focusTrack.participant.identity && tr.source === focusTrack.source
      );
      if (updatedFocusTrack !== focusTrack && isTrackReference(updatedFocusTrack)) {
        layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: updatedFocusTrack });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    screenShareTracks.map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`).join(),
    focusTrack?.publication?.trackSid,
    tracks,
  ]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{room.name}</h1>
        <div className={styles.roomInfo}>
          <span>참가자</span>
          <span>{participants.length}명</span>
        </div>
      </header>
      <div className="lk-video-conference">
        <LayoutContextProvider value={layoutContext}>
          <div className="lk-video-conference-inner">
            {!focusTrack ? (
              <div className="lk-grid-layout-wrapper">
                <GridLayout tracks={tracks}>
                  <ParticipantTile />
                </GridLayout>
              </div>
            ) : (
              <div className="lk-focus-layout-wrapper">
                <FocusLayoutContainer>
                  <CarouselLayout tracks={carouselTracks}>
                    <ParticipantTile />
                  </CarouselLayout>
                  {focusTrack && <FocusLayout trackRef={focusTrack} />}
                </FocusLayoutContainer>
              </div>
            )}
            <ControlBar
              variation="minimal"
              controls={{ chat: false, leave: true, screenShare: role === '강사' }}
            />
          </div>
          <ChatRoom />
        </LayoutContextProvider>
        <RoomAudioRenderer />
        <ConnectionStateToast />
      </div>
    </div>
  );
}
