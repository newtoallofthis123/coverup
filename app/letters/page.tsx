import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoverLettersPage from "./history";
import { BACKEND_URL } from "@/lib/consts";

const fetchCoverLetters = async (userId: string) => {
  const res = await fetch(`${BACKEND_URL}/api/letters/user/${userId}`);
  if (!res.ok) {
    console.error(res);
    return null;
  } else {
    const data = await res.json();
    return data;
  }
};
export default async function CoverLetters() {
  const userId = await auth();
  if (!userId.userId) redirect("/sign-in");

  let letters = await fetchCoverLetters(userId.userId);
  letters = letters.sort(
    (a: any, b: any) =>
      new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime(),
  );

  return <CoverLettersPage letters={letters} />;
}
