import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, TButtonProps } from "../components/units/Button";

import { theme } from "twin.macro";

import { ImFacebook, ImGoogle, ImLinkedin } from "react-icons/im";

export default {
    title: "Units/MyButton",
    component: Button,
    argTypes: {},
} as Meta;

// This basically disables typechecking to make this work with storybook
const ButtonElement: React.ElementType = Button;
const Template: Story<TButtonProps> = ({ style, ...args }) => {
    return <ButtonElement {...args} style={style} />;
};

export const Primary = Template.bind({});
Primary.args = {
    text: "My Button",
    style: {
        background: "teal",
    },
    icon: <ImFacebook />,
};
