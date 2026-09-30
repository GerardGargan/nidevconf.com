import sessions from "../../../_data/sessions.json";
import { image } from "../../render";

export const dynamic = "force-static";
export const generateStaticParams = () => sessions.map(({ slug }) => ({ slug }));

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  return image((await params).slug, "og");
}
