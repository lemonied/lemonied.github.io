import { FC, useCallback, useRef } from 'react';
import { Form, FormInstance } from '@shared/components/form';
import { sleep } from '@shared/utils';
import { map, timer } from 'rxjs';
import { Button, Space } from 'antd';

const { Item } = Form;

export const FormExample: FC = () => {

  const formRef = useRef<FormInstance>();

  const onSubmit = useCallback(() => {
    formRef.current?.validate().subscribe(res => {
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }, []);

  const onChange = useCallback((values: any) => {
    // eslint-disable-next-line no-console
    console.log(values);
  }, []);

  return (
    <Form
      ref={formRef}
      onChange={onChange}
    >
      <Item
        name={'username'}
        defaultValue={'default'}
        rules={[
          { required: true, message: '必填项' },
          (value) => /^\d+$/.test(value) ? null : '只能输入数字',
        ]}
      >
        <input />
      </Item>
      <Item
        name={'email'}
        rules={[
          (value) => sleep(2000).then(() => /^[a-z]+$/i.test(value) ? null : '只能输入英文字母'),
          (value) => timer(1000).pipe(
            map(() => value.length > 10 ? '最大长度为10' : null),
          ),
        ]}
      >
        <input />
      </Item>
      <p>
        <Space>
          <Button onClick={onSubmit}>提交</Button>
          <Button onClick={() => formRef.current?.reset()}>重置</Button>
          <Button onClick={() => formRef.current?.clearValidity()}>清除错误验证</Button>
        </Space>
      </p>
    </Form>
  );
};
