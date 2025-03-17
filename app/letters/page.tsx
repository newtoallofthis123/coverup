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

  const letters = await fetchCoverLetters(userId.userId);

  return <CoverLettersPage userId={userId.userId} letters={letters} />;
}
