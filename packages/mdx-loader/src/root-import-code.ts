import type { Code, Root } from 'mdast';
import type { VFile } from 'vfile';
import { visit } from 'unist-util-visit';

export function preCodeImport() {
  const fileSign = 'file=';
  const fileWithRoot = 'file=<rootDir>';
  return (tree: Root, file: VFile) => {
    visit(tree, ['code'], (_node, index, parent) => {
      const node = _node as Code;
      if (typeof node.meta === 'string') {
        node.meta = node.meta
          // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-negated-look-ahead
          .split(/(?<!\\) /g)
          .map(meta => {
            if (!meta.startsWith(fileWithRoot) && meta.startsWith(fileSign)) {
              return `${fileWithRoot}/${meta.substring(fileSign.length)}`;
            }
            return meta;
          })
          .join(' ');
      }
    });
  };
}
