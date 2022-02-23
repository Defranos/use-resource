import { Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import { RotatedWrapper } from "../styles/HomePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    style={{ minHeight: "calc(100vh - 64px)" }}
  >
    <Grid item container xs={12} alignItems="center" justifyContent="center">
      <RotatedWrapper>
        <Image src="/alithya-logo.png" alt="logo" layout="fill" />
      </RotatedWrapper>
    </Grid>
    <Grid item container xs={12} alignItems="center" justifyContent="center">
      <Typography variant="h3">
        This is a playground generated react app
      </Typography>
      <Grid item container justifyContent="center" xs={12}>
        <Typography variant="body1" style={{ marginTop: "1em" }}>
          Check the documentation to start using it
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <Typography>
          <Link
            href="https://r3d-conseil.atlassian.net/wiki/spaces/SCD/pages/3578462209/Front-end"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit feedback
          </Link>
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home"])),
  },
});
