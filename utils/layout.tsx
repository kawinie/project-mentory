import { ParsedUrlQuery } from "querystring";

import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticProps,
    GetStaticPropsContext,
} from "next";
import { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { [key: string]: any };
type LayoutProps = Props;

type DataRequirement<
    L extends LayoutProps = LayoutProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = GetStaticProps<L, Q> | GetServerSideProps<L, Q>;

export type LayoutComponent<
    L extends LayoutProps = LayoutProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = ComponentType<L> & {
    blockingDataRequirement?: DataRequirement<L, Q>;
};

export type ComponentWithLayout<
    P extends Props = Props,
    L extends LayoutProps = LayoutProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery
> = ComponentType<P> & {
    layout: LayoutComponent<L, Q>;
    retrievePropsFromLayoutDataRequirement: (
        context: GetStaticPropsContext<Q> | GetServerSidePropsContext<Q>
    ) => Promise<L | undefined>;
};

export function withLayout<
    P extends Props = Props,
    L extends LayoutProps = LayoutProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(layoutComponent: LayoutComponent<L, Q>, component: ComponentType<P>) {
    const componentWithLayout = component as ComponentWithLayout<P, L, Q>;
    componentWithLayout.layout = layoutComponent;
    componentWithLayout.retrievePropsFromLayoutDataRequirement = async (context) => {
        if (layoutComponent.blockingDataRequirement) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await layoutComponent.blockingDataRequirement(context as any);
            if ("props" in result) {
                return result.props;
            }
        }

        return undefined;
    };

    return componentWithLayout;
}
