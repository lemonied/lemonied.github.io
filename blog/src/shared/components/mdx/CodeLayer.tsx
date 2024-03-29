import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import { Copy } from '@shared/components/copy';
import { Fade } from '@shared/components/fade';
import { useDebounce } from '@shared/utils/debounce';

const Wrapper = styled.div`
  position: relative;
  .copy-action{
    position: absolute;
    top: .6em;
    right: .8em;
  }
`;

interface CodeLayerProps {
  content: string;
  children?: ReactNode;
}
const CodeLayer: FC<CodeLayerProps> = (props) => {

  const { children, content } = props;
  const selecting = useRef(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onMouseUp = () => {
      selecting.current = false;
    };
    document.body.addEventListener('mouseup', onMouseUp);
    return () => document.body.removeEventListener('mouseup', onMouseUp);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMouseEnter = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setShow(true);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setShow(false);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [onMouseDown, cancel] = useDebounce((e: MouseEvent<HTMLDivElement>) => {
    setShow(false);
  }, 500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMouseUp = useCallback((e: MouseEvent<HTMLDivElement>) => {
    cancel();
    setShow(true);
  }, [cancel]);
  const prevent = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      { children }
      <Fade show={show}>
        <Copy
          className={'copy-action'}
          onMouseDown={prevent}
          onMouseUp={prevent}
          content={content}
        />
      </Fade>
    </Wrapper>
  );
};

export { CodeLayer };
