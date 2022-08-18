import React, {
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import { Token } from '@shared/helpers/utils';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { Icon } from '../icons';

export interface ModalInstance {
  show(): Promise<string>;
  hide(): Promise<string>;
  toggle(): Promise<string>;
  state(): boolean;
}
type ModalProps = PropsWithChildren<{
  header?: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  maskStyle?: CSSProperties;
  afterClose?: () => void;
  maskClosable?: boolean;
}>;
export const Modal = forwardRef<ModalInstance, ModalProps>((props, ref) => {

  const { children, header, style, contentStyle, footer, maskStyle, afterClose, maskClosable = true } = props;

  const [show, setShow] = useState(false);
  const entered = useRef<Token<string>>();
  const exited = useRef<Token<string>>();

  const onEntered = useCallback(() => {
    entered.current?.resolve('entered');
  }, []);
  const onExited = useCallback(() => {
    exited.current?.resolve('exited');
  }, []);
  const instance = useMemo<ModalInstance>(() => {
    return {
      state: () => show,
      show() {
        setShow(true);
        entered.current = new Token();
        return entered.current.promise;
      },
      hide() {
        setShow(false);
        exited.current = new Token();
        return exited.current.promise;
      },
      toggle() {
        const result = !show;
        setShow(result);
        if (result) {
          entered.current = new Token();
          return entered.current.promise;
        }
        exited.current = new Token();
        return exited.current.promise;
      },
    };
  }, [show]);
  const preventClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);
  const handleClose = useCallback(() => {
    instance.hide().then(afterClose);
  }, [afterClose, instance]);

  useImperativeHandle(ref, () => {
    return instance;
  });

  return (
    <CSSTransition
      in={show}
      classNames={{
        enter: styles['lemon-modal-enter'],
        enterActive: styles['lemon-modal-enter-active'],
        exit: styles['lemon-modal-exit'],
        exitActive: styles['lemon-modal-exit-active'],
        exitDone: styles['lemon-modal-exit-done'],
      }}
      timeout={300}
      onEntered={onEntered}
      onExited={onExited}
      unmountOnExit
    >
      <div className={styles['lemon-modal-wrapper']} style={maskStyle} onClick={() => maskClosable ? handleClose() : null}>
        <div className={styles['lemon-modal']} style={style} onClick={preventClick}>
          {
            header !== null && (
              <div className={styles['lemon-modal-header']}>
                <div className={styles['header-content']}>{header}</div>
                <Icon className={styles['close']} type={'close'} onClick={handleClose} />
              </div>
            )
          }
          <div className={styles['lemon-modal-content']} style={contentStyle}>{children}</div>
          <div className={styles['lemon-modal-footer']}>{footer}</div>
        </div>
      </div>
    </CSSTransition>
  );
});

Modal.displayName = 'Modal';

export const PortalModal = forwardRef<ModalInstance, ModalProps>((props, ref) => {

  const [container, setContainer] = useState<HTMLDivElement | undefined>();

  useEffect(() => {
    const dom = document.createElement('div');
    dom.className = 'lemon-portal-modal-container';
    document.body.appendChild(dom);
    setContainer(dom);
    return () => {
      document.body.removeChild(dom);
    };
  }, []);

  if (container) {
    return createPortal(
      <Modal { ...props } ref={ref} />,
      container,
    );
  }
  
  return null;
});

PortalModal.displayName = 'PortalModal';
