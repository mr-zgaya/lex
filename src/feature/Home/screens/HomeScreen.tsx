import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { UploadIcon } from "@/components/icons";
import useNavigation from "@/navigation/use-navigation";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const appHeaderChildren = (
    <Button onClick={() => navigation.navigate("/video-upload/movie")} startIcon={<UploadIcon />}>
      {t("Feature.Home.HomeScreen.uploadMovie")}
    </Button>
  );

  return (
    <Page>
      <LayoutAppBar />
      <LayoutAppHeader children={appHeaderChildren} />
      <LayoutSideBar />
    </Page>
  );
}
