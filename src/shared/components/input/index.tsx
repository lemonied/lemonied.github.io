import {
  ChangeEventHandler,
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { MDCTextField } from '@material/textfield';
import { combineClass } from '@shared/utils';

export type InputInstance = MDCTextField | null;
interface InputProps {
  label?: string;
  outline?: boolean;
  textarea?: boolean;
  leading?: ReactElement;
  trailing?: ReactElement;
  className?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  maxLength?: number,
}
const Input = forwardRef<InputInstance, InputProps>((props, ref) => {

  const {
    className,
    outline = true,
    textarea = false,
    leading,
    trailing,
    label,
    disabled,
    onChange,
    value,
    maxLength,
  } = props;

  const domRef = useRef<HTMLLabelElement>(null);
  const textFieldRef = useRef<MDCTextField | null>(null);

  useEffect(() => {
    const textField = textFieldRef.current = new MDCTextField(domRef.current!);
    return () => textField.destroy();
  }, []);

  useImperativeHandle(ref, () => {
    return textFieldRef.current!;
  });

  return (
    <div className={'inline-text-field-container'}>
      <label
        className={
          combineClass('mdc-text-field', {
            'mdc-text-field--filled': !outline,
            'mdc-text-field--outlined': outline,
            'mdc-text-field--no-label	': !label,
            'mdc-text-field--textarea': textarea,
            'mdc-text-field--disabled	': disabled,
            'mdc-text-field--with-internal-counter': typeof maxLength === 'number',
          }, className)
        }
        ref={domRef}
      >
        {
          outline ?
            <span className="mdc-notched-outline">
              <span className="mdc-notched-outline__leading">{ leading }</span>
              {
                label ?
                  <span className="mdc-notched-outline__notch">
                    <span className="mdc-floating-label">{ label }</span>
                  </span> :
                  null
              }
              <span className="mdc-notched-outline__trailing">{ trailing }</span>
            </span> :
            <>
              <span className="mdc-text-field__ripple"></span>
              {
                label ?
                  <span className="mdc-floating-label">{ label }</span> :
                  null
              }
              {
                leading ?
                  <span className="mdc-text-field__affix mdc-text-field__affix--prefix">{ leading }</span> :
                  null
              }
            </>
        }
        {
          textarea ?
            <span className="mdc-text-field__resizer">
              <textarea
                rows={8}
                cols={40}
                className={'mdc-text-field__input'}
                disabled={disabled}
                onChange={onChange}
                value={value}
                maxLength={maxLength}
              />
            </span> :
            <input
              className={'mdc-text-field__input'}
              disabled={disabled}
              onChange={onChange}
              value={value}
              maxLength={maxLength}
            />
        }
        {
          outline ?
            null :
            <>
              {
                trailing ?
                  <span className="mdc-text-field__affix mdc-text-field__affix--suffix">{ trailing }</span> :
                  null
              }
              <span className="mdc-line-ripple"></span>
            </>
        }
      </label>
      <div className={'mdc-text-field-helper-line'}>
        <div className={'mdc-text-field-helper-text'} />
        <div className={'mdc-text-field-character-counter'} />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
