import { auth } from "@clerk/nextjs/server";
import ProfilePage from "./profile";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "@/lib/consts";

const fetchData = async (userId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/resumes/user/${userId}`);
    let data;
    if (response.ok) {
      data = await response.json();
      return data;
    } else {
      console.log("Error fetching data:", response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default async function Profile() {
  const userId = await auth();

  if (!userId.userId) {
    redirect("/sign-in");
  }

  const userData = await fetchData(userId.userId);
  let method;
  if (userData) {
    method = "PUT";
  } else {
    method = "POST";
  }

  const url =
    method === "PUT"
      ? `${BACKEND_URL}/api/resumes/${userData.id}`
      : `${BACKEND_URL}/api/resumes`;

  return (
    <ProfilePage
      user={userId.userId}
      data={userData}
      method={method}
      url={url}
    />
  );
}
