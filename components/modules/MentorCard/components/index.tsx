import "twin.macro";
import { Tag } from "@chakra-ui/react";

export { ProfileImage } from "./ProfileImage";
export { StatGroup } from "./StatGroup";
export { AutoScrollText } from "./AutoScrollText";
export { LikeButton } from "./LikeButton";

/* -------------------------------------------------------------------------- */
/*                                    Badge                                   */
/* -------------------------------------------------------------------------- */

export function Badge({ text }: { text: string }) {
    return (
        <Tag size="sm" variant="badge">
            {text}
        </Tag>
    );
}
