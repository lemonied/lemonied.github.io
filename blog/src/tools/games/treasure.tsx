import { FC, useCallback, useRef, useState } from 'react';
import { Form, FormInstance } from '@shared/components/form';
import styled from 'styled-components';
import Image from 'next/image';

const { Item } = Form;

const Wrapper = styled(Form)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 230px);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
  .form-control{
    display: flex;
    align-items: center;
  }
`;

const everyRound = 3400;

const Treasure: FC = () => {

  const formRef = useRef<FormInstance>();

  const onlyNumber = useCallback((value: string) => {
    return /^\d+$/.test(value) || !value ? null : '只能输入数字';
  }, []);

  const [total, setTotal] = useState(0);
  const [round, setRound] = useState(0);
  const [next, setNext] = useState(0);

  const onChange = useCallback(() => {
    formRef.current?.validate().subscribe((values: Record<string, string>) => {
      const t1 = Number(values.t1 || 0);
      const t2 = Number(values.t2 || 0);
      const t3 = Number(values.t3 || 0);
      const t4 = Number(values.t4 || 0);
      const total = t1 + t2 * 10 + t3 * 20 + t4 * 50;
      const round = Math.floor(total / everyRound);
      const next = everyRound - (total % everyRound);
      setTotal(total);
      setRound(round);
      setNext(next);
    });
  }, []);

  return (
    <>
      <Wrapper
        onChange={onChange}
        ref={formRef}
      >
        <Item
          name={'t1'}
          prefix={
            <ImageFactory
              src={'https://lemonied-1258997133.cos.ap-nanjing.myqcloud.com/games%2Fsalted-fish%2F%E6%9C%A8%E5%88%B6%E5%AE%9D%E7%AE%B1.png'}
              alt={'木制宝箱'}
            />
          }
          rules={[onlyNumber]}
        >
          <input placeholder={'木制宝箱数量'} type="text"/>
        </Item>
        <Item
          name={'t2'}
          prefix={
            <ImageFactory
              src={'https://lemonied-1258997133.cos.ap-nanjing.myqcloud.com/games%2Fsalted-fish%2F%E9%9D%92%E9%93%9C%E5%AE%9D%E7%AE%B1.png'}
              alt={'青铜宝箱'}
            />
          }
          rules={[onlyNumber]}
        >
          <input placeholder={'青铜宝箱数量'} type="text"/>
        </Item>
        <Item
          name={'t3'}
          prefix={
            <ImageFactory
              src={'https://lemonied-1258997133.cos.ap-nanjing.myqcloud.com/games%2Fsalted-fish%2F%E9%BB%84%E9%87%91%E5%AE%9D%E7%AE%B1.png'}
              alt={'黄金宝箱'}
            />
          }
          rules={[onlyNumber]}
        >
          <input placeholder={'黄金宝箱数量'} type="text"/>
        </Item>
        <Item
          name={'t4'}
          prefix={
            <ImageFactory
              src={'https://lemonied-1258997133.cos.ap-nanjing.myqcloud.com/games%2Fsalted-fish%2F%E7%99%BD%E9%87%91%E5%AE%9D%E7%AE%B1.png'}
              alt={'白金宝箱'}
            />
          }
          rules={[onlyNumber]}
        >
          <input placeholder={'白金宝箱数量'} type="text"/>
        </Item>
      </Wrapper>
      <div>
        <p>总积分：{total}</p>
        <p>可完成：{round} 轮</p>
        <p>距离下一轮：{next}</p>
      </div>
    </>
  );
};

interface ImageFactoryProps {
  src: string;
  alt: string;
}
const ImageFactory: FC<ImageFactoryProps> = (props) => {
  const { src, alt } = props;
  return (
    <Image title={alt} width={50} height={50} src={src} alt={alt} priority />
  );
};

export { Treasure };
