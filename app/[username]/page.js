import React from 'react'
import PaymentsPage from '../components/PaymentsPage'
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/app/models/User';

export default async function Username({ params }) {
  await connectDB();
  let u = await User.findOne({name: params.username});
  if (!u) {
    return <div className='flex justify-center items-center min-h-[calc(100vh-155px)] sm:min-h-[calc(100vh-116px)] text-2xl font-bold'>404 | User Not Found</div>;
  }
  const { username } = await params;  

  return (
    <>
      <PaymentsPage username={username} />
    </>
  );
}

export async function generateMetadata({ params }) {
  return {
    title : `${params.username} - Supportify`,
  }
}
