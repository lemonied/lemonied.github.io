import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Icon } from '@shared/components/icons';
import { copyText, combineClass } from '@shared/utils';
import { Button, ButtonProps } from '@shared/components/button';
import { FadeSwitch } from '@shared/components/fade';

interface CopyProps extends ButtonProps {
  content: string;
}
const Copy = forwardRef<HTMLButtonElement, CopyProps>((props, ref) => {

  const { className, content, ...extra } = props;
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => window.clearTimeout(timer.current);
  }, []);

  const onCopy = useCallback(() => {
    copyText(content).then(() => {
      setSuccess(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setSuccess(false);
      }, 2000);
    });
  }, [content]);

  return (
    <Button
      onClick={onCopy}
      className={combineClass(styles['copy'], className, { [styles['success']]: success })}
      type={success ? 'success' : 'default'}
      outline
      ref={ref}
      { ...extra }
    >
      <FadeSwitch
        uniqueKey={success ? 'success' : 'check'}
      >
        {
          success ?
            <Icon className={styles['icon']} type={'check'} /> :
            <Icon className={styles['icon']} type={'copy'} />
        }
      </FadeSwitch>
    </Button>
  );
});

Copy.displayName = 'Copy';

export { Copy };
