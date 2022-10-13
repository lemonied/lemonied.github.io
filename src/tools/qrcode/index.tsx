import { FC, useCallback, useRef } from 'react';
import { ShadowCard } from '@shared/components/card';
import * as QRCode from 'qrcode';
import { Input, InputInstance } from '@shared/components/input';
import styled from 'styled-components';
import { Button } from '@shared/components/button';

const Wrapper = styled(ShadowCard)`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-bottom: 20px;
  .canvas-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const QrcodeGenerator: FC = () => {

  const inputRef = useRef<InputInstance>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onSubmit = useCallback(() => {
    const value = inputRef.current?.value;
    if (value) {
      QRCode.toCanvas(canvasRef.current!, value, {
        margin: 0,
        width: 300,
      });
    }
  }, []);

  return (
    <Wrapper>
      <div>
        <Input
          textarea
          label={'文本内容'}
          maxLength={100}
          ref={inputRef}
        />
        <Button onClick={onSubmit}>生成</Button>
      </div>
      <div className={'canvas-wrapper'}>
        <canvas ref={canvasRef} />
      </div>
    </Wrapper>
  );
};

export { QrcodeGenerator };

const FileWrapper = styled.div`
  position: relative;
  input {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }
`;
const QrcodeReader: FC = () => {

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <div>
        <FileWrapper>
          <input type="file" accept={'image/*'} ref={fileRef} />
          <Button onClick={() => fileRef.current?.click()}>选择图片</Button>
        </FileWrapper>
      </div>
    </Wrapper>
  );
};

export { QrcodeReader };
