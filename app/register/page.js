import Link from 'next/link';
import { Form } from '../../components/form/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '../db';
import { SubmitButton } from '../../components/submit-button/submit-button';

export default function Register() {
  async function register(formData) {
    'use server';
    let email = formData.get('email');
    let password = formData.get('password');
    let user = await getUser(email);
    console.log('mu user', user);

    if (user) {
      console.log('User already exists'); 
    } else {
      await createUser(email, password);
      redirect('/login');
    }
  }

  return (
    <div className="">
      <div className="">
        <div className="">
          <h3 className="">Sign Up</h3>
          <p className="">
            Create an account with your email and password
          </p>
        </div>
        <Form action={register}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="">
            {'Already have an account? '}
            <Link href="/login" className="">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </Form>
      </div>
    </div>
  );
}
