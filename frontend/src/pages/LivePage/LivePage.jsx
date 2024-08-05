import { LiveRoom } from '../../components/LiveRoom';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import instance from '../../utils/axios/instance';
import { API_URL, ROOM_URL } from '../../constants';
import '@livekit/components-styles';
import LoadingIndicator from '../../components/LoadingIndicator.jsx/LoadingIndicator';

export default function LivePage() {
  const { roomId } = useParams();
  const [liveToken, setLiveToken] = useState(null);
  const generateToken = useCallback(async () => {
    await instance.post(`${API_URL}/video/makeroom/${roomId}`);
    const { data } = await instance.post(`${API_URL}/video/joinroom/${roomId}`).catch(() => {
      alert('방에 입장할 수 없습니다.');
    });

    return data.token;
  }, [roomId]);

  useEffect(() => {
    generateToken().then((token) => {
      setLiveToken(token);
    });
  }, [generateToken]);

  return liveToken ? (
    <LiveKitRoom
      token={liveToken}
      serverUrl={ROOM_URL}
      connect={true}
      data-lk-theme="default"
      onDisconnected={() => {
        instance.post(`${API_URL}/video/deleteroom/${roomId}`).catch(() => {});
      }}
    >
      <LiveRoom />
    </LiveKitRoom>
  ) : (
    <LoadingIndicator fill />
  );
}
