//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: T W I N   M A C R O   T Y P E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
//
// ─── MODULE AGUMENTATION IN TYPESCRIPT TO EXTEND EXISTING TYPES WITH ADDITIONAL PROPERTIES
//

// twin.d.ts
import "twin.macro";
import styledImport from "@emotion/styled";
import { css as cssImport } from "@emotion/react";

// The css prop
// https://emotion.sh/docs/typescript#css-prop
import {} from "@emotion/react/types/css-prop";

declare module "twin.macro" {
    // The styled and css imports
    const styled: typeof styledImport;
    const css: typeof cssImport;
}
