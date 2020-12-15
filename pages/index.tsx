import { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";

import { UnitExample } from "components/units/UnitExample";
import tw, { styled } from "twin.macro";

const HomeContainer = tw.div`flex flex-col items-center justify-center w-full h-screen text-5xl text-gray-700`;

const CreateAccountButton = tw.a`text-gray-200 text-xl py-2 px-4 mt-8 bg-gray-700 rounded-full transition transform duration-200 hover:(cursor-pointer shadow-xl -translate-y-1)`;

export default function Home(): ReactElement {
    return (
        <HomeContainer>
            <Head>
                <title>Mentory ({process.env.NODE_ENV == "development" && "development"})</title>
            </Head>
            <UnitExample title="Mentory" />
            <Link href="/create-account" passHref>
                <CreateAccountButton>Create Account</CreateAccountButton>
            </Link>
        </HomeContainer>
    );
}
