import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, MouseEventHandler } from 'react';
import { combineClass } from '@shared/utils';
import { MDCRipple } from '@material/ripple';

export interface ButtonProps {
  className?: string;
  type?: 'outline' | 'primary' | 'text';
  disabled?: boolean;
  children?: ReactNode;
  block?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leading?: ReactNode;
  trailing?: ReactNode;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const { className, type = 'text', disabled, children, onClick, leading, trailing, block = false } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttonRipple = new MDCRipple(buttonRef.current!);
    return () => buttonRipple.destroy();
  }, []);

  useImperativeHandle(ref, () => buttonRef.current!);

  return (
    <button
      className={
        combineClass(
          'mdc-button',
          'mdc-button--touch',
          {
            'mdc-button--outlined': type === 'outline',
            'mdc-button--raised': type === 'primary',
            'mdc-button--icon-trailing': !!trailing,
            'mdc-button--icon-leading': !!leading,
            'block': block,
          },
          className,
        )
      }
      disabled={disabled}
      ref={buttonRef}
      onClick={onClick}
    >
      <span className={'mdc-button__ripple'}></span>
      {
        leading ?
          <span className={'mdc-button__icon'}>{ leading }</span> :
          null
      }
      <span className={'mdc-button__touch'}></span>
      <span className={'mdc-button__label'}>{ children }</span>
      {
        trailing ?
          <span className={'mdc-button__icon'}>{ trailing }</span> :
          null
      }
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
