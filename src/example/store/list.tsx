import { FC, useEffect, useMemo } from 'react';
import { Map } from 'immutable';
import { fromFetch } from 'rxjs/fetch';
import { concatMap, of, switchMap } from 'rxjs';
import { useStore } from '@shared/stores';
import { useSubject } from '@shared/hooks/observable';

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
  const page = useMemo(() => data.get('page') as number, [data]);

  const getList = useSubject<string | void>(action => action.pipe(
    switchMap(data => {
      if (data === 'cancel') {
        return of(store.state);
      }
      return of(store.state).pipe(
        store.map(state => state.withMutations(m => {
          m.set('loading', true);
          m.set('error', false);
        })),
        concatMap(state => fromFetch(`https://randomuser.me/api?page=${page}&results=10&inc=id,name,email,phone,cell,gender`).pipe(
          switchMap(res => res.json()),
          store.map(res => state.set('list', res.results)),
        )),
      );
    }),
    store.always(data => data.set('loading', false)),
    store.capture((err, data) => data.set('error', true)),
  ), [page, store]);
  const previousPage = useSubject(action => action.pipe(
    store.map(() => store.state.set('page', (store.state.get('page') as number) - 1)),
  ), [store]);
  const nextPage = useSubject(action => action.pipe(
    store.map(() => store.state.set('page', (store.state.get('page') as number) + 1)),
  ), [store]);

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
        <button style={{ marginLeft: 10 }} onClick={() => getList?.next('cancel')}>取消请求</button>
      </p>
      <p>
        <button onClick={() => previousPage?.next()}>上一页</button>
        <span>{ data.get('page') }</span>
        <button onClick={() => nextPage?.next()}>下一页</button>
      </p>
      {
        data.get('error') ? (
          <p style={{ color: 'red' }}>出错了，点击刷新按钮重新加载</p>
        ) : null
      }
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
