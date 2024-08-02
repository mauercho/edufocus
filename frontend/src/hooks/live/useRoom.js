import { Room, RoomEvent } from 'livekit-client';
import { useCallback, useState } from 'react';
import { API_URL, ROOM_URL } from '../../constants';
import instance from '../../utils/axios/instance';

export default function useRoom(roomId) {
  const [room, setRoom] = useState(null);
  const [localTrack, setLocalTrack] = useState(null);
  const [remoteTracks, setRemoteTracks] = useState([]);
  const [mainTrack, setMainTrack] = useState(null);

  const generateToken = useCallback(async () => {
    await instance.post(`${API_URL}/video/makeroom/${roomId}`);
    const { data } = await instance.post(`${API_URL}/video/joinroom/${roomId}`);

    return data.token;
  }, [roomId]);

  const leaveRoom = useCallback(async () => {
    console.log('leave room');
    await room?.disconnect();

    setRoom(null);
    setLocalTrack(null);
    setRemoteTracks([]);
  }, [room]);

  const joinRoom = useCallback(async () => {
    const token = await generateToken();
    const room = new Room();

    room.prepareConnection(ROOM_URL, token);
    room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
      try {
        const identity = JSON.parse(participant.identity);
        const isTeacher = identity.role.startsWith('강사');
        if (isTeacher) {
          setMainTrack(publication.videoTrack);
        }
      } catch (e) {
        console.log('not json');
      } finally {
        setRemoteTracks((prev) => [
          ...prev,
          {
            trackPublication: publication,
            participantIdentity: participant.identity,
          },
        ]);
      }
    });

    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      console.log('unsubscribe remote');
      setRemoteTracks((prev) => prev.filter((track) => track.trackPublication !== publication));
    });

    try {
      console.log(token);
      await room.connect(ROOM_URL, token);
      await room.localParticipant.enableCameraAndMicrophone();
      setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
      setRoom(room);
    } catch (error) {
      await leaveRoom();
    }
  }, [generateToken, leaveRoom]);

  return { room, joinRoom, leaveRoom, localTrack, remoteTracks, mainTrack };
}
