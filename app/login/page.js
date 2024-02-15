import Link from 'next/link';
import { Form } from '../../components/form/form';
import { signIn } from '../auth';
import { SubmitButton } from '../../components/submit-button/submit-button';
import './login.css';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className='login-header'>
          Login to Your Account

          <div className="login-subheader">
              {"Don't have an account? "}
              <Link href="/register">
                Sign up
              </Link>
            </div>

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
          <div className="sign-in-button">
            <SubmitButton>Sign in</SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}