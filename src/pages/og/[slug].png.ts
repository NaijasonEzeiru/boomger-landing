import { ogPages } from "../../lib/ogPages";
import { generateOgImage } from "../../lib/generateOgImage";

export const prerender = true;

export async function getStaticPaths() {
  return ogPages.map((page) => ({
    params: { slug: page.slug },
    props: { title: page.title },
  }));
}

export async function GET({ props }) {
  const image = await generateOgImage(props.title);

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
