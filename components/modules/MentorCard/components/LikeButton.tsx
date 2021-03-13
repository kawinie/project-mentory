import "twin.macro";
import { useState } from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { motion, Variant } from "framer-motion";
import { Heart } from "phosphor-react";

/* -------------------------------------------------------------------------- */
/*                                 Like Button                                */
/* -------------------------------------------------------------------------- */

const HeartIcon = ({ isLiked }: { isLiked: boolean }) => {
    type State = "liked" | "notLiked";
    const states: Record<State, Variant> = {
        liked: {
            scale: 1.2,
            rotateY: 180,
        },
        notLiked: {
            scale: 0.9,
            rotateY: 0,
        },
    };

    const likedState: State = isLiked ? "liked" : "notLiked";

    return (
        <motion.div animate={likedState} variants={states} transition={{ type: "spring" }}>
            <Heart color={isLiked ? "#F43F5E" : "black"} weight={isLiked ? "fill" : "regular"} />
        </motion.div>
    );
};

export function LikeButton({
    isLiked,
    ...props
}: Omit<IconButtonProps, "aria-label"> & { isLiked: boolean }) {
    const [liked, setLiked] = useState(isLiked);

    return (
        <IconButton
            {...props}
            position="absolute"
            size="md"
            rounded={0}
            borderBottomLeftRadius={4}
            aria-label="Like"
            fontSize={24}
            icon={<HeartIcon isLiked={liked} />}
            onClick={() => setLiked((like) => !like)}
            bg="transparent"
        />
    );
}
