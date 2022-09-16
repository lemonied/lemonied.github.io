import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDebounce } from '@shared/utils';

export const DebounceExample: FC = () => {

  const [result, setResult] = useState('');
  const [handleChange] = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setResult(e.target.value);
  }, 500);

  return (
    <div>
      <input onChange={handleChange} type="text"/>
      <p>results: { result }</p>
    </div>
  );
};
