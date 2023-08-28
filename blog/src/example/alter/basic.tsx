/* eslint-disable no-console */
import { alter } from '@shared/utils';
import { useEffect } from 'react';

export const AlterBasic = () => {

  useEffect(() => {
    const data = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
        f: [0, 1, 2],
      },
    };
    console.log('data', data);

    const state1 = alter(data, draft => {
      draft.b.d.e = 4;
    });
    console.log('state1', state1);
    console.log('data === state1', data === state1);
    console.log('data.b === state1.b', data.b === state1.b);
    console.log('data.b.d === state1.b.d', data.b.d === state1.b.d);
    console.log('data.b.f === state1.b.f', data.b.f === state1.b.f);

    const state2 = alter(state1, draft => {
      draft.b.f.push(20);
    });
    console.log('state2', state2);
    console.log('state1 === state2', state1 === state2);
    console.log('state1.b === state2.b', state1.b === state2.b);
    console.log('state1.b.d === state2.b.d', state1.b.d === state2.b.d);
    console.log('state1.b.f === state2.b.f', state1.b.f === state2.b.f);

    const state3 = alter(state2, () => {
      //
    });
    console.log('state3 === state2', state3 === state2);

    const state4 = alter(state3, draft => {
      const f = draft.b.f;
      f.push(100);
      f.shift();
    });
    console.log('state4', state4);
    console.log('state3 === state4', state3 === state4);
    console.log('state3.b === state4.b', state3.b === state4.b);
    console.log('state3.b.d === state4.b.d', state3.b.d === state4.b.d);
    console.log('state3.b.f === state4.b.f', state3.b.f === state4.b.f);

    const state5 = alter(state4, draft => {
      const arr = [100, 200, 300];
      draft.b.f = arr;
      arr.push(400);
      console.log('JSON.stringify', draft, JSON.stringify(draft));
      /* @ts-ignore */
      delete draft.b.c;
    });
    console.log('state5', state5);

    try {
      alter(state4, draft => {
        const arr = draft.b.f;
        /* @ts-ignore */
        delete draft.b.f;
        draft.b.f = arr;
      });
    } catch (e) {
      console.error(e);
    }

    const state7 = alter(state4, (draft: any) => {
      const g = {
        h: 1,
        i: {
          j: 2,
          k: 3,
        },
      };
      draft.b.g = g;
      draft.b.g.i.j = 5;
      g.i.k = 6;
    });
    console.log('state7', state7);
  }, []);

  

  return (
    <></>
  );
};