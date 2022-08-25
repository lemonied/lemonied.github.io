import React, {
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
import { combineClass, Token } from '@shared/helpers/utils';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { Icon } from '../icons';

const DURATION = 300;

export interface ModalInstance {
  show(): Promise<string>;
  hide(): Promise<string>;
  toggle(): Promise<string>;
  state(): boolean;
}
type ModalProps = PropsWithChildren<{
  header?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  afterClose?: () => void;
  maskClosable?: boolean;
}>;
export const Modal = forwardRef<ModalInstance, ModalProps>((props, ref) => {

  const { children, header, contentClassName, footer, afterClose, maskClosable = true } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (show) {
      document.body.classList.add(styles['disable-scroll']);
    } else {
      document.body.classList.remove(styles['disable-scroll']);
    }
    return () => document.body.classList.remove(styles['disable-scroll']);
  }, [show]);

  useImperativeHandle(ref, () => {
    return instance;
  });

  return (
    <>
      <CSSTransition
        in={show}
        classNames={{
          enter: styles['lemon-modal-fade-enter'],
          enterActive: styles['lemon-modal-fade-enter-active'],
          exit: styles['lemon-modal-fade-exit'],
          exitActive: styles['lemon-modal-fade-exit-active'],
          exitDone: styles['lemon-modal-fade-exit-done'],
        }}
        timeout={DURATION}
        onEntered={onEntered}
        onExited={onExited}
        unmountOnExit
        nodeRef={maskRef}
      >
        <div ref={maskRef} className={styles['lemon-modal-mask']} />
      </CSSTransition>
      <CSSTransition
        in={show}
        classNames={{
          enter: styles['lemon-modal-enter'],
          enterActive: styles['lemon-modal-enter-active'],
          exit: styles['lemon-modal-exit'],
          exitActive: styles['lemon-modal-exit-active'],
          exitDone: styles['lemon-modal-exit-done'],
        }}
        timeout={DURATION}
        onEntered={onEntered}
        onExited={onExited}
        unmountOnExit
        nodeRef={wrapperRef}
      >
        <div
          ref={wrapperRef}
          className={styles['lemon-modal-wrapper']}
          onClick={() => maskClosable ? handleClose() : null}
        >
          <div className={styles['lemon-modal']} onClick={preventClick}>
            {
              header !== null && (
                <div className={styles['lemon-modal-header']}>
                  <div className={styles['header-content']}>{header}</div>
                  <Icon className={styles['close']} type={'close'} onClick={handleClose} />
                </div>
              )
            }
            <div className={combineClass(styles['lemon-modal-content'], contentClassName)}>{children}</div>
            <div className={styles['lemon-modal-footer']}>{footer}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
});

Modal.displayName = 'Modal';

export const PortalModal = forwardRef<ModalInstance, ModalProps>((props, ref) => {

  const [container, setContainer] = useState<HTMLDivElement | undefined>();

  useEffect(() => {
    const dom = document.createElement('div');
    dom.className = 'lemon-portal-modal';
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
