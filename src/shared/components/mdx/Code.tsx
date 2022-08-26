import { FC, useMemo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import styled from 'styled-components';
import { PreElement } from '@shared/components/mdx/PreElement';

interface CodeProps {
  className?: string;
  children?: string;
}
const Code: FC<CodeProps> = (props) => {

  const { children = '', className = '' } = props;

  const inline = useMemo(() => {
    return !/\n$/.test(children) && !className;
  }, [children, className]);
  
  const lang = useMemo(() => {
    return (/^language-(\S+)/.exec(className)?.[1] || 'markup') as Language;
  }, [className]);

  const content = useMemo(() => {
    return children.trim();
  }, [children]);

  if (inline) {
    return (
      <code>{ children }</code>
    );
  }

  return (
    <PreElement content={content}>
      <Highlight {...defaultProps} code={content} language={lang} theme={theme}>
        {
          ({ className, style, tokens, getLineProps, getTokenProps }) => {
            return (
              <Pre className={className} style={style}>
                {
                  tokens.map((line, i) => (
                    <Line key={i} {...getLineProps({ line, key: i })}>
                      <LineNo>{i + 1}</LineNo>
                      <LineContent>
                        {
                          line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} key={key} />
                          ))
                        }
                      </LineContent>
                    </Line>
                  ))
                }
              </Pre>
            );
          }
        }
      </Highlight>
    </PreElement>
  );
};

export { Code };

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;

  & .token-line {
    line-height: 1.5em;
    height: 1.5em;
  }
`;

export const Line = styled.div`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;
