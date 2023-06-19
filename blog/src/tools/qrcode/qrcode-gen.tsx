import styled from 'styled-components';
import { ShadowCard } from '@shared/components/card';
import { FC, useCallback, useRef, useState } from 'react';
import * as QRCode from 'qrcode';
import { Button, Input, Typography, Space } from 'antd';

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState('');

  const onSubmit = useCallback(() => {
    if (value) {
      QRCode.toCanvas(canvasRef.current!, value, {
        margin: 0,
        width: 300,
      });
    }
  }, [value]);

  return (
    <Wrapper>
      <div>
        <Space direction={'vertical'}>
          <Typography.Text code>文本内容</Typography.Text>
          <Input.TextArea
            maxLength={100}
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={4}
            style={{ width: 350 }}
          />
          <Button onClick={onSubmit}>生成</Button>
        </Space>
      </div>
      <div className={'canvas-wrapper'}>
        <canvas ref={canvasRef} />
      </div>
    </Wrapper>
  );
};

export { QrcodeGenerator };