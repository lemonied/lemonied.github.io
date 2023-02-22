import { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  & > div{
    overflow: hidden;
    position: relative;
    height: 0;
    img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

interface PictureProps {
  ratio?: number;
  className?: string;
  src: string;
  alt?: string;
}
const Picture: FC<PictureProps> = (props) => {

  const { ratio = 3 / 4, alt = 'image', src } = props;
  const [imgStyle, setImgStyle] = useState<CSSProperties>({ width: '100%' });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const containerStyle: CSSProperties = useMemo(() => {
    return { padding: `${ratio / 2 * 100}% 0` };
  }, [ratio]);
  
  const resize = useCallback(() => {
    const container = containerRef.current?.getBoundingClientRect();
    const image = imgRef.current?.getBoundingClientRect();
    if (container && image) {
      setImgStyle(container.height / container.width > image.height / image.width ? { height: '100%' } : { width: '100%' });
    }
  }, []);
  
  const onLoad = useCallback(() => {
    resize();
  }, [resize]);
  
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);
  
  return (
    <Wrapper>
      <div style={containerStyle} ref={containerRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={imgStyle} src={src} alt={alt} ref={imgRef} onLoad={onLoad} />
      </div>
    </Wrapper>
  );
};

export { Picture };
