import { FC, useEffect } from 'react';
import { Map } from 'immutable';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs';
import { useAction, useStore } from '@shared/stores';

const ListExample: FC = () => {

  const [data, store] = useStore(
    Map({
      loading: false,
      page: 1,
      list: [] as any[],
    }),
  );

  const [getList] = useAction<void>(action => action.pipe(
    store.map(() => store.state.set('loading', true)),
    switchMap(data => {
      return fromFetch(`https://randomuser.me/api?page=${data.get('page')}&results=10&inc=id,name,email,phone,cell,gender`).pipe(
        switchMap(res => res.json()),
        store.map(res => data.set('list', res.results)),
      );
    }),
    store.finalize(data => data.set('loading', false)),
  ).subscribe(), [store]);

  useEffect(() => {
    getList?.next();
  }, [getList]);

  return (
    <div>
      <p>{ `${data.get('loading')}` }</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>姓名</th>
            <th>年龄</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>111</td>
            <td>111</td>
            <td>111</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { ListExample };
