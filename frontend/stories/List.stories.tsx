import { Meta, Story } from "@storybook/react/types-6-0";
import "twin.macro";
import { Button } from "@chakra-ui/react";

import { List, TListProps } from "components/units";

//
// ──────────────────────────────────────────────── I ──────────
//   :::::: D A T A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//

const items = ["Item 1", "Item 2", "Item 3"];

//
// ────────────────────────────────────────────────────── II ─────────
//   :::::: S T O R I E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

type TTemplateListString = Omit<TListProps<string>, "containerElement" | "items">;
const TemplateListString: Story<TTemplateListString> = (props) => (
    <List tw="grid grid-flow-col gap-4" items={items} renderItem={props.renderItem} />
);

export const TextList = TemplateListString.bind({});
TextList.args = {
    renderItem: (item) => <li key={item}>{item}</li>,
};

export const ButtonList = TemplateListString.bind({});
ButtonList.args = {
    renderItem: (item) => (
        <li key={item}>
            <Button text={item} />
        </li>
    ),
};

export default {
    title: "Units/List",
    component: List,
    argTypes: {},
} as Meta;
