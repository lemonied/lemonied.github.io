import React from 'react';
import styled from 'styled-components';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createParagraphNode, $getRoot, COMMAND_PRIORITY_CRITICAL, createCommand, KEY_DOWN_COMMAND, LexicalEditor, RootNode } from 'lexical';
import { InputNode } from './InputNode';
import { useMemoFn } from '@shared/hooks/use-memo-fn';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';

const LeEditor = styled.div`
  width: 100%;
  color: #000;
  position: relative;
  font-size: 14px;

  .editor-inner {
    background: transparent;
    position: relative;
  }

  .editor-input {
    resize: none;
    position: relative;
    tab-size: 1;
    outline: 0;
    padding: 16px 48px 16px 16px;
    caret-color: #444;
    &[disabled] {
      background: rgba(0,0,0,0.04);
      color: rgba(0,0,0,0.25);
      &::after{
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: not-allowed;
      }
    }
  }
  .editor-placeholder {
    color: #999;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 16px;
    left: 16px;
    user-select: none;
    display: inline-block;
    pointer-events: none;
  }
`;

const runCommand = createCommand<() => void>('run');

const initConfig: InitialConfigType = {
  namespace: 'LeRichEditor',
  nodes: [
    InputNode,
  ],
  onError(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  },
};

export interface LeInputInstance {
  run(cb: (node: RootNode, editor: LexicalEditor) => void): void;
  submit(): Promise<void>;
  clear(): void;
}
export interface LeInputProps {
  onSubmit?: (value: string, rootNode: RootNode, editor?: LexicalEditor) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const LeInputContent = React.forwardRef<LeInputInstance, LeInputProps>((props, ref) => {

  const { onSubmit, className, children, disabled } = props;

  const [editor] = useLexicalComposerContext();

  const placeholder = 'Enter发送，⇧+Enter换行';

  const handleSubmit = useMemoFn(() => {
    onSubmit?.($getRoot().getTextContent(), $getRoot(), editor);
  });

  const submit = useMemoFn(async () => {
    editor.dispatchCommand(runCommand, handleSubmit);
  });

  React.useEffect(() => {
    if (editor) {
      const removeKeydownListener = editor.registerCommand(
        KEY_DOWN_COMMAND,
        (e) => {
          if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            submit();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );

      const removeRunListener = editor.registerCommand(
        runCommand,
        (cb) => {
          cb();
          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      );

      return () => {
        removeKeydownListener();
        removeRunListener();
      };
    }
  }, [editor, submit]);

  React.useImperativeHandle(ref, () => {
    return {
      run: (cb) => {
        if (editor) {
          editor.dispatchCommand(runCommand, () => {
            cb($getRoot(), editor);
          });
        }
      },
      submit,
      clear: () => {
        editor.dispatchCommand(runCommand, () => {
          $getRoot().clear().append($createParagraphNode());
        });
      },
    };
  });

  return (
    <LeEditor className={className}>
      <div className="editor-inner">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              disabled={disabled}
              contentEditable={!disabled}
              className="editor-input"
              aria-placeholder={placeholder}
              placeholder={<div className="editor-placeholder">{placeholder}</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {children}
      </div>
    </LeEditor>
  );
});
LeInputContent.displayName = 'LeInputContent';

const LeInput = React.forwardRef<LeInputInstance, LeInputProps>((props, ref) => {
  return (
    <LexicalComposer
      initialConfig={initConfig}
    >
      <LeInputContent
        {...props}
        ref={ref}
      />
    </LexicalComposer>
  );
});
LeInput.displayName = 'LeInput';

export { LeInput };
