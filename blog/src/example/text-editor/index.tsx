import React from 'react';
import { TextEditor } from './LeEditor';
import { LeInputInstance } from './LeInput';
import { $createParagraphNode, $createTextNode } from 'lexical';
import { InputNode } from './InputNode';
import { useMemoFn } from '@shared/hooks/use-memo-fn';
import { Button, Flex } from 'antd';

const TextEditorDemo = () => {

  const leInputRef = React.useRef<LeInputInstance>(null);

  const init = useMemoFn(() => {
    leInputRef.current?.run((root) => {
      root.clear();
      const paragraphNode = $createParagraphNode();
      paragraphNode.append(
        $createTextNode('我的姓名是'),
        new InputNode({
          placeholder: '请输入你的姓名',
        }),
        $createTextNode('，我今年'),
        new InputNode({
          placeholder: '请输入你的年龄',
        }),
        $createTextNode('岁了'),
      );
      root.append(paragraphNode);
    });
  });

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <Flex vertical gap={16}>
      <div>
        <Button
          onClick={() => init()}
        >重置</Button>
      </div>
      <TextEditor
        ref={leInputRef}
        onSubmit={(value) => {
          // eslint-disable-next-line no-console
          console.log(value);
          leInputRef.current?.clear();
        }}
      />
    </Flex>
  );
};

const TextEditorIndex = () => {

  /**
   * 异步显示，否则会报useLayoutEffect的ssr错误
   */
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <TextEditorDemo />
  );
};

export default TextEditorIndex;
