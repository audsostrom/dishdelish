import Link from 'next/link';
import { Form } from '../../components/form/form';
import { signIn } from '../auth';
import { SubmitButton } from '../../components/submit-button/submit-button';

export default function Login() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <h3 className="">Sign In</h3>
          <p className="">
            Use your email and password to sign in
          </p>
        </div>
        <Form
          action={async (formData) => {
            'use server';
            await signIn('credentials', {
              redirectTo: '/protected',
              email: formData.get('email'),
              password: formData.get('password'),
            });
          }}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="">
            {"Don't have an account? "}
            <Link href="/register" className="">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}