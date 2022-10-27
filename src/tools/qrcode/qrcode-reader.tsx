import styled from 'styled-components';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { ImageReader } from '@shared/utils';
import { Button } from '@shared/components/button';
import { ShadowCard } from '@shared/components/card';
import { useRouter } from 'next/router';
import { Copy } from '@shared/components/copy';
import jsQR from 'jsqr';

const Wrapper = styled(ShadowCard)`
  padding: 20px;
  margin-bottom: 20px;
  .result{
    position: relative;
  }
  .copy{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .file-wrapper{
    position: relative;
    input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
  }
`;
const QrcodeReader: FC = () => {

  const fileRef = useRef<HTMLInputElement>(null);
  const imageReader = useRef<ImageReader>();
  const router = useRouter();
  const [result, setResult] = useState<string | null | undefined>((router.query.result as string) ?? '');
  const [full, setFull] = useState(false);

  const handleOnChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await imageReader.current?.getQRResult(file);
      setResult(result?.data);
    }
  }, []);

  const onFinish = useCallback((result?: string) => {
    setFull(false);
    if (result) {
      setResult(result);
    }
  }, []);

  useEffect(() => {
    imageReader.current = new ImageReader();
  }, []);

  return (
    <Wrapper>
      <div className={'file-wrapper'}>
        <input onChange={handleOnChange} type="file" accept={'image/*'} ref={fileRef} />
        <Button onClick={() => fileRef.current?.click()}>选择图片</Button>
      </div>
      <Button onClick={() => setFull(true)}>扫描二维码</Button>
      {
        result ?
          <div className={'result'}>
            <pre>
              <code>{ result }</code>
              <Copy content={result} className={'copy'} />
            </pre>
          </div> :
          null
      }
      {
        full ? <Scanner onFinish={onFinish} /> : null
      }
    </Wrapper>
  );
};

export { QrcodeReader };

const ScannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 10;
  background: #fff;
  .cancel{
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

interface ScannerProps {
  onFinish?: (result?: string) => void;
}
const Scanner: FC<ScannerProps> = (props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cancelId = useRef<number>();
  const { onFinish } = props;

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const cancel = useCallback((result?: string) => {
    onFinishRef.current?.(result);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const video = document.createElement('video');
    video.setAttribute('playsinline', 'true');
    let mediaStream: MediaStream;
    window.navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
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
    <ScannerWrapper>
      <Button className={'cancel'} onClick={() => cancel()}>取消</Button>
      <canvas ref={canvasRef} />
    </ScannerWrapper>
  );
};