// lib/fonts.ts
import { Font } from "@react-pdf/renderer";

export function registerFonts() {
  Font.register({
    family: "Heading",
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/heading.woff2`,
  });

  Font.register({
    family: "Sans",
    src: `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Figtree-VariableFont_wght.ttf`,
  });
}
