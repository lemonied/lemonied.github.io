import styled from 'styled-components';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { ImageReader } from '@shared/utils';
import { Button } from '@shared/components/button';
import { ShadowCard } from '@shared/components/card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Copy } from '@shared/components/copy';

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
`;

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
  const imageReader = useRef<ImageReader>();
  const router = useRouter();
  const [result, setResult] = useState<string | null | undefined>((router.query.result as string) ?? '');

  const handleOnChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await imageReader.current?.getQRResult(file);
      setResult(result?.data);
    }
  }, []);

  useEffect(() => {
    imageReader.current = new ImageReader();
  }, []);

  return (
    <Wrapper>
      <FileWrapper>
        <input onChange={handleOnChange} type="file" accept={'image/*'} ref={fileRef} />
        <Button onClick={() => fileRef.current?.click()}>选择图片</Button>
      </FileWrapper>
      <Link href={`/scan-qrcode?back=${router.route}`} replace>
        <a>
          <Button>扫描二维码</Button>
        </a>
      </Link>
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
    </Wrapper>
  );
};

export { QrcodeReader };