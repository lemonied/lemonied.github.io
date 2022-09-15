import { cloneElement, CSSProperties, FC, ReactNode, useCallback, useState } from 'react';
import { Field, FieldProps } from './Field';
import { Status } from './interface';
import styled from 'styled-components';
import { combineClass } from '@shared/utils';

const Wrapper = styled.div`
  &:not(:last-child){
    margin-bottom: 8px;
  }
  .error-tip{
    margin: 3px 0 0 0;
    font-size: .8em;
    color: var(--color-error);
  }
`;

interface FormItemProps extends FieldProps {
  className?: string;
  style?: CSSProperties;
  prefix?: ReactNode;
}
const FormItem: FC<FormItemProps> = (props) => {

  const { onStatusChange, children, className, style, prefix, ...extra } = props;

  const [status, setStatus] = useState<Status>();

  const handleStatusChange = useCallback((status: Status) => {
    onStatusChange?.(status);
    setStatus(status);
  }, [onStatusChange]);

  return (
    <Wrapper className={className} style={style}>
      <div className={'form-control'}>
        { prefix }
        <Field {...extra} onStatusChange={handleStatusChange}>
          {
            cloneElement(children, {
              className: combineClass(children.props.className, {
                'status-error': status?.state === 'invalid',
              }),
            })
          }
        </Field>
      </div>
      {
        typeof status?.message === 'string' ?
          <p className={'error-tip'}>{ status.message }</p> :
          null
      }
    </Wrapper>
  );
};

export { FormItem };
