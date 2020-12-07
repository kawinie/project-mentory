import Head from "next/head";

import { UnitExample } from "components/units/UnitExample";
import { ReactElement } from "react";

export default function Home(): ReactElement {
    return (
        <>
            <Head>
                <title>Mentory</title>
            </Head>
            <div className="flex items-center justify-center w-full h-screen text-5xl text-gray-700 bg-gray-200 ">
                <UnitExample title="Mentory" />
            </div>
        </>
    );
}
