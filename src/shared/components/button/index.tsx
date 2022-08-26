import {
  forwardRef,
  DOMAttributes,
} from 'react';
import styles from './styles.module.scss';
import { combineClass } from '@shared/helpers/utils';

export interface ButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  outline?: boolean;
  type?: 'default' | 'success';
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const { className, outline = false, type = 'default', ...extra } = props;

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
      ref={ref}
      { ...extra }
    />
  );
});

Button.displayName = 'Button';

export { Button };
