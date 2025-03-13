import { auth } from '@clerk/nextjs/server';
import ProfilePage from './profile';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const userId = await auth();

  if (!userId.userId) {
    redirect('/sign-in');
  }

  return <ProfilePage user={userId.userId} />;
}
