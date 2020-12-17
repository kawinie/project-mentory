import Head from "next/head";
import Link from "next/link";
import tw from "twin.macro";

import { UnitExample } from "components/units/UnitExample";
import { Button } from "components/units/Button";

const HomeContainer = tw.div`flex flex-col items-center justify-center w-full h-screen text-5xl text-gray-700`;

export default function Home() {
    return (
        <HomeContainer>
            <Head>
                <title>Mentory {process.env.NODE_ENV == "development" && "(development)"}</title>
            </Head>
            <UnitExample title="Mentory" />
            <Link href="/login" passHref>
                <Button text="Login Here" tw="mt-8" />
            </Link>
        </HomeContainer>
    );
}
