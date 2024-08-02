import { LiveRoom } from '../../components/LiveRoom';
import { useParams } from 'react-router-dom';
import useRoom from '../../hooks/live/useRoom';
import { useEffect } from 'react';

export default function LivePage() {
  const { roomId } = useParams();
  const { room, joinRoom, localTrack, remoteTracks, mainTrack, leaveRoom } = useRoom(roomId);

  useEffect(() => {
    if (!room) {
      joinRoom();
    }
  }, [joinRoom, room]);

  return (
    <LiveRoom
      room={room}
      localTrack={localTrack}
      remoteTracks={remoteTracks}
      leaveRoom={leaveRoom}
      mainTrack={mainTrack}
    />
  );
}
