import { cloneElement, FC, ReactElement, useMemo, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import { SwitchTransitionProps } from 'react-transition-group/SwitchTransition';
import { randomStr } from '@shared/helpers/utils';

interface FadeProps {
  show: boolean;
  children: ReactElement;
}
const Fade: FC<FadeProps> = (props) => {

  const { show, children } = props;
  const ref = useRef<HTMLElement>(null);

  return (
    <CSSTransition
      in={show}
      classNames={{
        enter: styles['fade-enter'],
        enterActive: styles['fade-enter-active'],
        exit: styles['fade-exit'],
        exitActive: styles['fade-exit-active'],
        exitDone: styles['fade-exit-done'],
      }}
      timeout={300}
      unmountOnExit
      nodeRef={ref}
    >
      {
        cloneElement(children, { ref })
      }
    </CSSTransition>
  );
};

export { Fade };

interface FadeSwitchProps {
  mode?: SwitchTransitionProps['mode'];
  children: ReactElement;
  uniqueKey: string | number;
}
const FadeSwitch: FC<FadeSwitchProps> = (props) => {

  const { mode = 'out-in', children, uniqueKey } = props;

  return (
    <SwitchTransition
      mode={mode}
    >
      <CSSTransition
        classNames={{
          enter: styles['fade-enter'],
          enterActive: styles['fade-enter-active'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active'],
          exitDone: styles['fade-exit-done'],
        }}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        key={uniqueKey}
      >{ children }</CSSTransition>
    </SwitchTransition>
  );
};

export { FadeSwitch };
