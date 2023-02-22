import { FC, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from '@shared/components/icons';

interface HeadingProps {
  id?: string;
  className?: string;
  children?: ReactNode;
  level?: number;
}
const Headings: FC<HeadingProps> = (props) => {

  const { children, level = 1, className, id } = props;

  const Tag = useMemo(() => `h${level}`, [level]) as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className} id={id}>
      { children }
      <a href={`#${id}`}>
        <Icon className={'anchor'} type={'anchor'} />
      </a>
    </Tag>
  );
};

const Heading = styled(Headings)`
  a{
    opacity: 0;
    transition: opacity .2s ease;
    svg{
      transition: opacity .2s ease;
      opacity: 0;
    }
  }
  .anchor{
    color: #333333;
  }
  &:hover{
    a, a > svg{
      opacity: 1;
    }
  }
`;

export { Heading };
