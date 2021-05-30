import fs from "fs";
import path from "path";
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

    esbuildOptions: (options) => {
      options.outdir = path.join(process.cwd(), `/public/notouchy`);
      // options.outdir = path.join(process.cwd(), `/public/notouchy`,filepath);
      options.loader = {
        ...options.loader,
        ".png": "file",
      };

      options.publicPath = "/notouchy/";
      // options.publicPath = filepath;

      options.write = true;

      return options;
    },
  });

  return result;
}
