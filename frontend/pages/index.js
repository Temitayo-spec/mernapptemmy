import Head from "next/head";
import Frontpage from "../comps/Frontpage";

export default function Home() {
  if (typeof window !== "undefined") {
    return (
      <div className="container">
        <Head>
          <title>Goalsetter App || MERN Stack</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="A mern stack app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {window.location.pathname === "/" && <Frontpage />}
      </div>
    );
  } else return null;
}
