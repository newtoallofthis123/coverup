import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CoverLettersPage from './history';

export default async function CoverLetters() {
  const userId = await auth();
  if (!userId.userId) redirect('/sign-in');

  return <CoverLettersPage userId={userId.userId} />;
}
