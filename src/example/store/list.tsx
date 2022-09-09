import { FC, useEffect, useMemo } from 'react';
import { Map } from 'immutable';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs';
import { useAction, useStore } from '@shared/stores';

const ListExample: FC = () => {

  const [data, store] = useStore(
    Map({
      loading: false,
      error: false,
      page: 1,
      list: [] as any[],
    }),
  );

  const list = useMemo(() => data.get('list') as any[], [data]);

  const [getList] = useAction(action => action.pipe(
    store.map(() => store.state.set('loading', true)),
    switchMap(data => {
      return fromFetch(`https://randomuser.me/api?page=${data.get('page')}&results=10&inc=id,name,email,phone,cell,gender`).pipe(
        switchMap(res => res.json()),
        store.map(res => data.set('list', res.results)),
      );
    }),
    store.always(data => data.set('loading', false)),
    store.capture((err, data) => data.set('error', true)),
    store.map(data => data.set('error', false)),
  ).subscribe(), [store]);

  useEffect(() => {
    getList?.next();
  }, [getList]);

  return (
    <div>
      <p>
        <button onClick={() => getList?.next()}>
          <span>
            {
              data.get('loading') ? '刷新中...' : '刷新'
            }
          </span>
        </button>
        {
          data.get('error') ? (
            <span style={{ color: 'red' }}>出错了，点击刷新按钮重新加载</span>
          ) : null
        }
      </p>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>gender</th>
            <th>email</th>
            <th>cell</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((v, k) => (
              <tr key={k}>
                <td>{v.name.title}. {v.name.first} {v.name.last}</td>
                <td>{v.gender}</td>
                <td>{v.email}</td>
                <td>{v.cell}</td>
                <td>{v.phone}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export { ListExample };
