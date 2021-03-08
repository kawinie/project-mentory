import { FunctionComponent, ReactElement } from "react";

export type LayoutComponent<LayoutProps, DataRequirement> = FunctionComponent<LayoutProps> & {
    blockingDataRequirement?: DataRequirement;
};

export type ComponentWithLayout<
    LayoutProps = any,
    DataRequirement = any,
    Props = any
> = FunctionComponent<Props> & {
    mergeWithLayout?: (page: ReactElement, layoutProps: LayoutProps) => ReactElement;
    requiredLayoutData?: DataRequirement;
};

export const withLayout = <LayoutProps, DataRequirement, Props>(
    Layout: LayoutComponent<LayoutProps, DataRequirement>,
    component: ComponentWithLayout<LayoutProps, DataRequirement, Props>
): ComponentWithLayout<LayoutProps, DataRequirement> => {
    component.mergeWithLayout = (page, layoutProps) => <Layout {...layoutProps}>{page}</Layout>;
    component.requiredLayoutData = Layout.blockingDataRequirement;
    return component;
};
