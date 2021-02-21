import type { MentorCardProps } from "./variants/Base";
export type { MentorCardProps } from "./variants/Base";
import { Desktop } from "./variants/Desktop";
import { Mobile } from "./variants/Mobile";

export function MentorCard(props: MentorCardProps) {
    return props.variant === "desktop" ? <Desktop {...props} /> : <Mobile {...props} />;
}
