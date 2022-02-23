import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const IndexPage = () => {};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/todo",
      permanent: true,
    },
  };
};

export default IndexPage;
