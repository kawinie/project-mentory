import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, TButtonProps } from "components/units/Button";
import tw from "twin.macro";

import { ImFacebook, ImGoogle, ImLinkedin } from "react-icons/im";

const iconList: Record<string, React.ElementType> = { ImFacebook, ImGoogle, ImLinkedin };

export default {
    title: "Units/MyButton",
    component: Button,
    argTypes: {
        icon: {
            control: {
                type: "select",
                options: Object.keys(iconList),
            },
        },
    },
} as Meta;

// This basically disables typechecking to make this work with storybook
const ButtonElement: React.ElementType = Button;
const Template: Story<TButtonProps> = ({ icon, ...args }) => {
    const Icon = iconList[(icon as unknown) as string];
    return <ButtonElement icon={Icon} {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
    text: "My Button",
    style: tw`bg-teal-500`,
};

export const Secondary = Template.bind({});
Secondary.args = {
    tw: "text-xl font-bold bg-teal-500",
    css: tw`text-xl font-bold bg-teal-500`,
    text: "My Button",
};
