import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NewCoverLetterPage from './cover-letter';

export default async function NewCoverLetter() {
  const userId = await auth();
  if (!userId.userId) redirect('/sign-in');

  return <NewCoverLetterPage userId={userId.userId} />;
}
