import { FC, useEffect } from 'react';
import { fromJS } from 'immutable';
import { from } from 'rxjs';

const getList = () => {
  // https://randomuser.me/documentation#howto
  return from(
    fetch('https://randomuser.me/api?page=1&results=10&size=5')
      .then(res => res.json())
      .then(res => fromJS(res)),
  );
};

const ListExample: FC = () => {

  useEffect(() => {
    getList().subscribe(res => {
      console.log(res.toJS());
    });
  }, []);

  return (
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
  );
};

export { ListExample };
