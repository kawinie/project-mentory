import Head from "next/head";
import Link from "next/link";
import tw from "twin.macro";

import { Button } from "components/units/Button";

const HomeContainer = tw.div`flex flex-col items-center justify-center w-full h-screen text-5xl text-gray-700`;

export default function Home() {
    const title = `Mentory ${process.env.NODE_ENV == "development" ? "(development)" : ""}`;
    return (
        <HomeContainer>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>Mentory</h1>
            <Link href="/login" passHref>
                <Button text="Login Here" tw="mt-8" />
            </Link>
        </HomeContainer>
    );
}
