//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: T W I N   M A C R O   T Y P E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
//
// ─── MODULE AGUMENTATION IN TYPESCRIPT TO EXTEND EXISTING TYPES WITH ADDITIONAL PROPERTIES
//

import "twin.macro";
import styledImport, { CSSProp, css as cssImport } from "styled-components";

declare module "twin.macro" {
    // The styled and css imports
    const styled: typeof styledImport;
    const css: typeof cssImport;
}

declare module "react" {
    // The css prop
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: CSSProp;
    }
    // The inline svg css prop
    interface SVGProps<T> extends SVGProps<SVGSVGElement> {
        css?: CSSProp;
    }
}

// The 'as' prop on styled components
declare global {
    namespace JSX {
        interface IntrinsicAttributes<T> extends DOMAttributes<T> {
            as?: string;
        }
    }
}
