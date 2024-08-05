import { LiveRoom } from '../../components/LiveRoom';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import instance from '../../utils/axios/instance';
import { API_URL, ROOM_URL } from '../../constants';
import useBoundStore from '../../store';
import '@livekit/components-styles';

export default function LivePage() {
  const { roomId } = useParams();
  const generateToken = useCallback(async () => {
    await instance.post(`${API_URL}/video/makeroom/${roomId}`);
    const { data } = await instance.post(`${API_URL}/video/joinroom/${roomId}`);

    return data.token;
  }, [roomId]);

  const liveToken = useBoundStore((state) => state.liveToken);

  useEffect(() => {
    if (!liveToken) {
      generateToken().then((token) => {
        useBoundStore.setState({ liveToken: token });
      });
    }
  }, [generateToken, liveToken]);

  return (
    liveToken && (
      <LiveKitRoom
        token={liveToken}
        serverUrl={ROOM_URL}
        connect={true}
        data-lk-theme="default"
      >
        <LiveRoom />
      </LiveKitRoom>
    )
  );
}
