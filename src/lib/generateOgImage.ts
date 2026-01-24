import satori from "satori";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

export async function generateOgImage(title: string) {
  const regularFont = await fs.readFile(
    path.resolve("src/assets/fonts/Inter_18pt-Regular.ttf")
  );

  const boldFont = await fs.readFile(
    path.resolve("src/assets/fonts/Inter_24pt-Bold.ttf")
  );

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0f172a, #020617)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          boxSizing: "border-box",
        },
        children: [
          // Top brand
          {
            type: "div",
            props: {
              style: {
                color: "#38bdf8",
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
              },
              children: "Boomger",
            },
          },

          // Main title
          {
            type: "div",
            props: {
              style: {
                color: "#f8fafc",
                fontSize: "64px",
                fontWeight: "700",
                lineHeight: "1.1",
                maxWidth: "900px",
                wordWrap: "break-word",
              },
              children: title,
            },
          },

          // Footer bar
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#94a3b8",
                fontSize: "22px",
              },
              children: [
                {
                  type: "div",
                  props: { children: "boomger.com" },
                },
                {
                  type: "div",
                  props: { children: "Real connections, real proximity." },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: regularFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: boldFont,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
