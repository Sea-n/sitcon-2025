import type { Metadata } from "next";
import data from "@/public/sessions.json";
// import AgendaPage from "@/app/(website)/(pages)/_components/AgendaPage";
import SessionPopup from "../../_components/SessionPopup";
import { AnimatePresence } from "framer-motion";

export function generateStaticParams() {
  const ids = data.sessions
    .filter((x) => x.zh.description !== "")
    .map((session) => session.id);
  return ids.map((x) => ({ id: x }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = data.sessions.find((x) => x.id === params.id)!;
  const image = `https://sitcon.org/2025/sessions/${session.id}.png`;
  const title = session.zh.title;
  const description = session.zh.description;
  const metadata: Metadata = {
    title,
    authors: [{ name: "SITCON" }],
    keywords: "SITCON, SITCON 2025",
    description,
    metadataBase: new URL("https://sitcon.org/2025/"),
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url: `https://sitcon.org/2025/agenda/${session.id}`,
      title,
      description,
      siteName: "SITCON 2025",
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      creator: "@sitcontw",
      site: "@sitcontw",
      card: "summary_large_image",
      images: image,
      title,
      description,
    },
  };
  return metadata;
}
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <AnimatePresence>
      <SessionPopup openSessionId={id} />
    </AnimatePresence>
  );
}
