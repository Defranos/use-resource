import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Toolbar } from "@mui/material";
import { AppBar, AppTitle, Button } from "./styles";

const Nav = React.memo(() => {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  return (
    <AppBar>
      <Toolbar>
        <AppTitle variant="h6" color="inherit">
          {t("appTitle")}
        </AppTitle>
        <NextLink href="/" locale={router.locale === "en" ? "fr" : "en"}>
          <Button variant="text">{i18n.language}</Button>
        </NextLink>

        <NextLink href="/home">
          <Button variant="text">{t("home")}</Button>
        </NextLink>
        <NextLink href="/todo">
          <Button variant="text">{t("todo")}</Button>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
});

export default Nav;
