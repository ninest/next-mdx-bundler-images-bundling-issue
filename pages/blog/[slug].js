import { getMDXComponent } from "mdx-bundler/client";
import { getMDX } from "../../lib/mdx";

export default function BlogPost({ code, title }) {
  const Component = getMDXComponent(code);

  return (
    <>
      <h1>{title}</h1>
      <main>
        <Component></Component>
      </main>
    </>
  );
}

export const getStaticPaths = (context) => {
  return {
    paths: [{ params: { slug: "first" } }, { params: { slug: "second" } }],
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const { code, frontmatter } = await getMDX(slug, slug);

  return {
    props: {
      code,
      title: frontmatter.title,
    },
  };
};
