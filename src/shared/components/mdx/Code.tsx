import { FC } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { Pre, Line, LineNo, LineContent } from './LineNumbers';

interface CodeProps {
  className?: string;
  children?: string;
}
const Code: FC<CodeProps> = (props) => {

  const { children = '', className } = props;

  if (!className) {
    return (
      <code>{ children }</code>
    );
  }

  const lang = (/^language-(\S+)/.exec(className)?.[1] || 'markup') as Language;  

  return (
    <Highlight {...defaultProps} code={children} language={lang} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
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
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export { Code };
