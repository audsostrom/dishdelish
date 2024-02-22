import Link from 'next/link';
import { Form } from '../../components/form/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '../db';
import { SubmitButton } from '../../components/submit-button/submit-button';
import './register.css';

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
    <div className="register-container">
      <div className='register-wrapper'>
        <div className='register-header'>
          Create Your Account
          <div className="register-subheader">
            {"Already have an account? "}
            <Link href="/login">
              Sign in
            </Link>
          </div>
        </div>
        <Form action={register}>
          <div className="register-button">
            <SubmitButton>Sign Up</SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
