import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { DogService, factory } from './reflect';
import { test } from './controller';

const ReflectExample: FC = () => {

  const dog = useRef(useMemo(() => factory(DogService), []));

  return (
    <div>
      <pre>
        <div>const dog = factory(DogService);</div>
        <div>dog.speak();</div>
      </pre>
      <p>
        <span>output：</span><span>{dog.current.speak()}</span>
      </p>
    </div>
  );
};

export { ReflectExample };

const ControllerExample: FC = () => {

  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput(JSON.stringify(test, (key, value) => typeof value === 'function' ? value.toString() : value, 2));
  }, []);

  return (
    <div>
      <pre>{ output }</pre>
    </div>
  );
};

export { ControllerExample };
