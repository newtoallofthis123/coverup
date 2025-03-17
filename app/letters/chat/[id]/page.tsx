import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/lib/consts";
import Chat from "./chat";

const fetchCoverLetter = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/api/letters/${id}`);
  if (!res.ok) {
    console.error(res);
    return null;
  } else {
    const data = await res.json();
    return data;
  }
};
export default async function CoverLetters({ params }: { params: any }) {
  const user = await currentUser();
  if (!user?.id) redirect("/sign-in");
  const { id } = await params;
  const imageUrl = user?.imageUrl;

  const letter = await fetchCoverLetter(id);

  const googleApikey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!googleApikey) {
    console.error("Google Generative AI API key not found");
    return null;
  }

  return (
    <Chat letter={letter} apiKey={googleApikey} imageUrl={imageUrl} id={id} />
  );
}
