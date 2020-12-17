import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, TButtonProps } from "../components/units/Button";

import { theme } from "twin.macro";

export default {
    title: "Units/MyButton",
    component: Button,
    argTypes: {
        color: {
            control: { type: "select", options: Object.keys(theme`colors.red`) },
        },
    },
} as Meta;

// This basically disables typechecking to make this work with storybook
const StyledButton: React.ElementType = Button;
const Template: Story<TButtonProps> = ({ style, ...args }) => {
    return <StyledButton {...args} style={style} />;
};

export const Primary = Template.bind({});
Primary.args = {
    text: "My Button",
    style: {
        background: "teal",
    },
};
