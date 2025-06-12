import React from 'react';
import styled from 'styled-components';
import { LeInput, LeInputInstance, LeInputProps } from './LeInput';

const Border = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  transition: all ease 0.3s;
  border-radius: 12px;
  border-color: #d9d9d9;
  border-width: 0;
  border-style: solid;

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: border-color 0.3s;
    border-radius: inherit;
    border-style: inherit;
    border-color: inherit;
    border-width: 1px;
  }

  &:focus-within {
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    border-color: #1677ff;

    &:after {
      border-width: 2px;
    }
  }
`;

const TextEditor = React.forwardRef<LeInputInstance, LeInputProps>((props, ref) => {
  return (
    <Border>
      <LeInput
        {...props}
        ref={ref}
      />
    </Border>
  );
});
TextEditor.displayName = 'TextEditor';

export { TextEditor };
