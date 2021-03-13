import "twin.macro";
import Image from "next/image";
import { AspectRatio } from "@chakra-ui/react";
import { UserRectangle } from "phosphor-react";

/* -------------------------------------------------------------------------- */
/*                                Profile Image                               */
/* -------------------------------------------------------------------------- */

/**
 * Conditionally render a placeholder profile image
 *
 */
export function ProfileImage({ url }: { url?: string }) {
    if (url == undefined) return <UserRectangle />;

    return (
        <AspectRatio w="full" ratio={1} rounded="md" overflow="hidden">
            <Image src={url} sizes="100%" layout="fill" objectFit="cover" />
        </AspectRatio>
    );
}
