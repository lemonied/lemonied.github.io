import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, DecoratorNode, NodeKey } from 'lexical';
import styled from 'styled-components';
import { useSafeLayoutEffect } from '@shared/hooks/use-safe-layout-effect';

const InputWrap = styled.span`
  display: inline-block;
  font-size: 14px;
  margin: 0 3px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  .length-placeholder {
    display: inline-block;
    height: 0;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 2px;
  }
  input {
    transition: none;
  }
`;

const minWidth = 30;
interface InputProps extends Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'onChange' | 'placeholder'> {
  nodeKey: string;
}
const Input = (props: InputProps) => {
  const { nodeKey, ...restProps } = props;

  const [value, setValue] = React.useState(restProps.value);
  const [width, setWidth] = React.useState(minWidth);
  const [editor] = useLexicalComposerContext();

  const mergedValue = value || restProps.placeholder;

  const spanRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (restProps.value !== value) {
      setValue(restProps.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restProps.value]);

  useSafeLayoutEffect(() => {
    setWidth(Math.max(spanRef.current?.clientWidth || 0, minWidth));
  }, [mergedValue]);

  return (
    <InputWrap>
      <span
        className="length-placeholder"
        ref={spanRef}
      >{`${mergedValue}`}</span>
      <input
        {...restProps}
        autoComplete="off"
        style={{ width }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          editor.update(() => {
            const instance = ($getNodeByKey(nodeKey) as InputNode)?.getWritable();
            if (instance) {
              instance.setValue(e.target.value);
            }
          });
        }}
      />
    </InputWrap>
  );
};

interface InputNodeInit {
  value?: string;
  placeholder?: string;
}

export class InputNode extends DecoratorNode<React.ReactElement> {
  static importJSON(serializedNode: ReturnType<InputNode['exportJSON']>) {
    return new InputNode().updateFromJSON(serializedNode);
  }

  static getType() {
    return 'input';
  }

  static clone(node: InputNode) {
    return new InputNode({
      value: node.__value,
      placeholder: node.__placeholder,
    }, node.getKey());
  }

  __value: string;
  __placeholder: string;

  constructor(init?: InputNodeInit, key?: NodeKey) {
    super(key);
    const { value, placeholder } = init || {};
    this.__placeholder = placeholder || '';
    this.__value = value || '';
  }

  setValue(value: string) {
    this.__value = value;
    return this;
  }
  setPlaceholder(placeholder: string) {
    this.__placeholder = placeholder;
    return this;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      value: this.__value,
      placeholder: this.__placeholder,
    };
  }

  updateFromJSON(serializedNode: ReturnType<typeof this.exportJSON>): this {
    super.updateFromJSON(serializedNode)
      .setValue(serializedNode.value)
      .setPlaceholder(serializedNode.placeholder);
    return this;
  }

  createDOM() {
    return document.createElement('span');
  }

  isInline() {
    return true;
  }

  isKeyboardSelectable() {
    return false;
  }

  updateDOM() {
    return false;
  }

  getTextContent() {
    return this.__value;
  }

  decorate() {
    return (
      <Input
        value={this.__value}
        placeholder={this.__placeholder}
        nodeKey={this.getKey()}
      />
    );
  }
}
