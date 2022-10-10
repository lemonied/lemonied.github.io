import {
  forwardRef,
  DOMAttributes,
} from 'react';
import styles from './styles.module.scss';
import { combineClass } from '@shared/utils';

export interface ButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  outline?: boolean;
  type?: 'default' | 'success' | 'primary';
  disabled?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const { className, outline = false, type = 'default', disabled, ...extra } = props;

  return (
    <button
      className={
        combineClass(
          styles['button'],
          className,
          { [styles['outline']]: outline },
          styles[type],
        )
      }
      disabled={disabled}
      ref={ref}
      { ...extra }
    />
  );
});

Button.displayName = 'Button';

export { Button };
