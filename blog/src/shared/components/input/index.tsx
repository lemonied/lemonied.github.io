import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useEffect,
  useRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
} from 'react';
import { MDCTextField } from '@material/textfield';
import { combineClass } from '@shared/utils';

export type InputInstance = MDCTextField | null;
interface InputProps {
  label?: string;
  outline?: boolean;
  textarea?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  maxLength?: number;
  help?: ReactNode;
  placeholder?: string;
  instance?: RefObject<InputInstance>;
}
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {

  const {
    className,
    outline = true,
    textarea = false,
    leading,
    trailing,
    label,
    disabled,
    onChange,
    onFocus,
    onBlur,
    value,
    maxLength,
    help,
    placeholder,
    instance,
  } = props;

  const domRef = useRef<HTMLLabelElement>(null);
  const textFieldRef = useRef<MDCTextField | null>(null);

  useEffect(() => {
    const textField = textFieldRef.current = new MDCTextField(domRef.current!);
    return () => textField.destroy();
  }, []);

  useImperativeHandle(instance, () => {
    return textFieldRef.current;
  });

  return (
    <div className={'inline-text-field-container'}>
      <label
        className={
          combineClass('mdc-text-field', {
            'input-not-textarea': !textarea, 
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
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder}
                ref={ref as RefObject<HTMLTextAreaElement>}
              />
            </span> :
            <input
              className={'mdc-text-field__input'}
              disabled={disabled}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              maxLength={maxLength}
              placeholder={placeholder}
              ref={ref as RefObject<HTMLInputElement>}
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
      {
        help || typeof maxLength === 'number' ?
          <>
            <div className={'mdc-text-field-helper-line'}>
              {
                help ?
                  <div className={'mdc-text-field-helper-text'}>{ help }</div> :
                  null
              }
              {
                typeof maxLength === 'number' ?
                  <div className={'mdc-text-field-character-counter'} /> :
                  null
              }
            </div>
          </> :
          null
      }
      
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
