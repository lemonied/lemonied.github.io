import { FC, useRef } from 'react';
import { ModalInstance, PortalModal } from '.';

const ModalExample: FC = () => {

  const modalRef = useRef<ModalInstance>(null);

  return (
    <>
      <button onClick={() => modalRef.current?.show()}>弹出Modal</button>
      <PortalModal
        ref={modalRef}
        header={
          <h2 style={{ margin: 0 }}>Modal 标题</h2>
        }
        footer={
          <button onClick={() => modalRef.current?.hide()}>关闭</button>
        }
      >
        {
          new Array(10).fill(1).map((_, k) => {
            return (
              <p key={k}>Modal 内容</p>
            );
          })
        }
      </PortalModal>
    </>
  );
};

export { ModalExample };
