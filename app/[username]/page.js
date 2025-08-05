import PaymentsPage from '../components/PaymentsPage';
import connectDB from '@/db/connectDB';
import User from '@/app/models/User';

export default async function Username({ params }) {
  const { username } = params;

  await connectDB();
  const user = await User.findOne({ username });

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-155px)] sm:min-h-[calc(100vh-116px)] text-2xl font-bold'>
        404 | User Not Found
      </div>
    );
  }

  return (
    <>
      <PaymentsPage username={username} />
    </>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Supportify`,
  };
}
