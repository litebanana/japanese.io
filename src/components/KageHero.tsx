import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "../shaders/landing-pages/pageTypography";
import {
  LandingPageFrame,
  type LandingPageProps,
} from "../shaders/landing-pages/LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "../shaders/landing-pages/pageRecipes";

/**
 * Same contract as the exact ThreeUI KageLandingPage (same frame, same
 * KAGE_TYPOGRAPHY recipe, same props) except sourceUrl is relative so it
 * resolves under a subpath host like /japanese.io/ on GitHub Pages.
 * The exact component hardcodes "/landing-pages/kage.html", which 404s
 * anywhere but a domain root.
 */
export function KageHero(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Kage — Where stillness reveals the unseen"
      sourceUrl="landing-pages/kage.html"
    />
  );
}
