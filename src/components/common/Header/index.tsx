import Head from "next/head";

interface BaseHeaderProps {
  title: string;
}

const BaseHeader = ({ title }: BaseHeaderProps) => {
  return (
    <Head>
      <title>{title}</title>

      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
    </Head>
  );
};

export default BaseHeader;
