import Container from "./components/layout/Container";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("home");
  return (
    <Container>
      <div className="flex justify-center items-center h-full w-full">
        <div className="border-2 px-12 py-4 rounded-2xl">
          <h1 className="md:text-2xl  font-bold">{t("title")}</h1>
        </div>
      </div>
    </Container>
  );
}
