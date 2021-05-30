import fs from "fs";
import path from "path";
import remarkMdxImages from "remark-mdx-images";
import { bundleMDX } from "mdx-bundler";

const root = process.cwd();

export async function getMDX(filepath) {
  const source = fs.readFileSync(
    path.join(root, "posts", `${filepath}.md`),
    "utf8"
  );
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const result = await bundleMDX(source, {
    cwd: path.join(process.cwd(), "/posts"),
    // xdmOptions: (options) => {
    //   options.rehypePlugins = [...(options.rehypePlugins ?? [])];
    //   options.remarkPlugins = [
    //     ...(options.remarkPlugins ?? []),
    //     remarkMdxImages,
    //   ];

    //   return options;
    // },

    esbuildOptions: (options) => {
      // options.outdir = path.join(process.cwd(), `/public/generated`);
      options.outdir = path.join(process.cwd(), `/public/generated`, filepath);
      options.loader = {
        ...options.loader,
        ".png": "file",
      };

      // options.publicPath = "/generated/";
      options.publicPath = filepath;

      options.write = true;

      return options;
    },
  });

  return result;
}
