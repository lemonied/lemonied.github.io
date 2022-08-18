import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.details`
  margin-top: 0;
  margin-bottom: 16px;
  summary{
    cursor: pointer;
    display: list-item;
    &:focus{
      outline: none;
      box-shadow: none;
    }
  }
`;

interface CollapseProps {
  children?: ReactNode;
  title?: ReactNode;
  open?: boolean;
}
const Collapse: FC<CollapseProps> = (props) => {

  const { children, title, open = false } = props;

  return (
    <Wrapper open={open}>
      <summary>{ title }</summary>
      { children }
    </Wrapper>
  );
};

export { Collapse };
