import { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';
import styled from 'styled-components';

const Wrapper = styled.div`
  a{
    color: var(--color-link);
    &:hover{
      color: var(--color-link-hover);
    }
    &:active{
      color: var(--color-link-active);
    }
  }
`;

const AboutPage: NextPage = () => {
  return (
    <>
      <SEO title={'关于我们'} description={'本网站的作者信息'} />
      <Layout>
        <Wrapper>
          <span>本项目地址：</span>
          <a href="https://github.com/lemonied/lemonied.github.io" rel={'noreferrer'} target='_blank'>https://github.com/lemonied/lemonied.github.io</a>
        </Wrapper>
      </Layout>
    </>
  );
};

export default AboutPage;
