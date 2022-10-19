import { NextPage } from 'next';
import styled from 'styled-components';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import jsQR from 'jsqr';
import { Button } from '@shared/components/button';

const Scanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .cancel{
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

const ScanQrcodePage: NextPage = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const cancelId = useRef<number>();
  
  const cancel = useCallback((result?: string) => {
    return router.replace({
      pathname: `${router.query.back || '/'}`,
      query: { result },
    });
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const video = document.createElement('video');
    video.setAttribute('playsinline', 'true');
    let mediaStream: MediaStream;
    window.navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
      mediaStream = stream;
      video.srcObject = stream;
      video.play();
      cancelId.current && cancelAnimationFrame(cancelId.current);
      cancelId.current = requestAnimationFrame(tick);
    });
    const tick = () => {
      if (ctx && video && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
        if (imageData) {
          const result = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });
          if (result && result.data) {
            cancel(result.data);
          }
        }
      }
      cancelId.current && cancelAnimationFrame(cancelId.current);
      cancelId.current = requestAnimationFrame(tick);
    };

    return () => {
      if (cancelId.current) {
        cancelAnimationFrame(cancelId.current);
        cancelId.current = undefined;
      }
      if (mediaStream) {
        mediaStream.getVideoTracks().forEach(v => v.stop());
      }
    };
  }, [cancel]);

  return (
    <Scanner>
      <Button className={'cancel'} onClick={() => cancel()}>取消</Button>
      <canvas ref={canvasRef} />
    </Scanner>
  );
};

export default ScanQrcodePage;
