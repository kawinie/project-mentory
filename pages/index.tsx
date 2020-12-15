import Head from "next/head";
import Link from "next/link";

import { UnitExample } from "components/units/UnitExample";
import { ReactElement } from "react";

import tw from "twin.macro";

const HomeContainer = tw.div`flex items-center justify-center w-full h-screen text-5xl text-gray-700 bg-gray-200`;

export default function Home(): ReactElement {
    return (
        <>
            <Head>
                <title>Mentory ({process.env.NODE_ENV == "development" && "development"})</title>
            </Head>
            <HomeContainer>
                <UnitExample title="Mentory" />
                <Link href="CreateAccount" as="create-account">
                    Create Account
                </Link>
            </HomeContainer>
        </>
    );
}
