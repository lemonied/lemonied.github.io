import { ChangeEvent, FC, useRef, useState } from 'react';
import algoliasearch from 'algoliasearch';
import { from, Subscription, tap, finalize } from 'rxjs';
import styles from './search.module.scss';
import { Input } from '@shared/components/input';
import { ShadowCard } from '@shared/components/card';
import { useDebounce, combineClass } from '@shared/utils';

const client = algoliasearch(process.env.APP_KEY!, process.env.SEARCH_API_KEY!);
const index = client.initIndex(process.env.INDEX_KEY!);

interface Hierarchy {
  lvl0: string | null;
  lvl1: string | null;
  lvl2: string | null;
  lvl3: string | null;
  lvl4: string | null;
  lvl5: string | null;
  lvl6: string | null;
}

type HierarchyHighlight = {
  [P in keyof Hierarchy]: {
    fullyHighlighted: boolean;
    matchLevel: string;
    matchedWords: Array<string>;
    value: string;
  };
};
interface HitItem {
  anchor: string | null;
  content: string | null;
  hierarchy: Hierarchy;
  objectID: string;
  url: string;
  _highlightResult: {
    hierarchy: HierarchyHighlight;
  };
  _snippetResult?: {
    content: {
      matchLevel: string;
      value: string;
    };
  };
}

interface SearchProps {
  className?: string;
}
export const Search: FC<SearchProps> = (props) => {

  const { className } = props;

  const subscription = useRef<Subscription>();
  const paramsRef = useRef({
    value: '',
    page: 0,
    hitsPerPage: 10,
  });
  const [hits, setHits] = useState<HitItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [onSubmit] = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    paramsRef.current.value = value;
    if (value) {
      subscription.current?.unsubscribe();
      setLoading(true);
      subscription.current = from(
        index.search<HitItem>(value, {
          page: paramsRef.current.page,
          hitsPerPage: paramsRef.current.hitsPerPage,
        }),
      ).pipe(
        tap(results => {
          setHits(results.hits);
        }),
        finalize(() => setLoading(false)),
      ).subscribe();
    } else {
      setHits(null);
    }
  }, 800);

  return (
    <div className={combineClass(styles['search-box'], className)}>
      <Input onChange={onSubmit} placeholder='搜索...' />
      {
        hits || loading ?
          <ShadowCard className={styles.hits}>
            {
              hits?.length ?
                hits.map(v => {
                  const hierarchy = v._highlightResult.hierarchy || {};
                  const title = hierarchy[Object.keys(hierarchy).reverse()[0] as keyof typeof hierarchy].value;
                  const content = v._snippetResult?.content.value;
                  return (
                    <a href={v.url} rel="noreferrer" key={v.objectID} className={styles['item']}>
                      {
                        title ?
                          <div className={styles.tit} dangerouslySetInnerHTML={{ __html: title }} /> :
                          null
                      }
                      {
                        content ?
                          <div className={styles.con} dangerouslySetInnerHTML={{ __html: content }} /> :
                          null
                      }
                    </a>
                  );
                }) :
                loading ?
                  <div>搜索中。。。</div> :
                  <div>无搜索结果</div>
            }
          </ShadowCard> :
          null
      }
    </div>
  );
};
