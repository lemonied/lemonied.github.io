import { FC, ReactNode } from 'react';

interface PreProps {
  children?: ReactNode;
}
const Pre: FC<PreProps> = (props) => {
  const { children } = props;

  return (
    <>{ children }</>
  );
};

export { Pre };
