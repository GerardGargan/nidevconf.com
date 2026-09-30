import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { placement } from "../../_components/Schedule";
import SiteFooter from "../../_components/SiteFooter";
import SiteHeader from "../../_components/SiteHeader";
import sessions from "../../_data/sessions.json";
import { large } from "../photos";
import SessionBody from "../SessionBody";

type Params = { params: Promise<{ slug: string }> };

// static export: every session is prerendered, anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return sessions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = sessions.find((x) => x.slug === slug);
  if (!s) return {};
  const url = `https://nidevconf.com/sessions/${s.slug}`;
  const who = s.speakers.map((p) => p.name).join(" & ");
  const title = `${s.title} — ${who}`;
  const description = s.description.split("\n")[0];
  const image = `/sessions/${s.slug}/og.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // openGraph does not merge with the layout's, so everything is set again
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: `${who}: ${s.title}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function SessionPage({ params }: Params) {
  const { slug } = await params;
  const s = sessions.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="section session">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <Link href="/#agenda">
                <span className="prompt">{"<"}</span> Agenda
              </Link>
            </p>
            <SessionBody
              session={s}
              faces={s.speakers.map((p) => large(p.photo))}
              heading="h1"
              {...placement(s.id)}
            />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
