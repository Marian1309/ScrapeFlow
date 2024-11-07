import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

const NotFound: NextPage = () => redirect('/');

export default NotFound;
