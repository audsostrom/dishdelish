import Link from 'next/link';
import { Form } from '../../components/form/form';
import { signIn } from '../auth';
import { sendEmail } from '../mail';
import { SubmitButton } from '../../components/submit-button/submit-button';
import './reset-password.css'
import { redirect } from 'next/navigation';

export default function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-wrapper">
        <div className='forgot-password-header'>
          Reset Your Password
        </div>
        <form
         action={async () => {
            'use server';
            redirect('/login');
         }}
    >
      <div>Enter your new password, and you'll be redirected to the login page after.</div>
      <div className='password-input-wrapper'>
        <label
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          required
          className="input-box"
        />
        <input
          id="confirm-password"
          name="confirm-password"
          type="confirm-password"
          placeholder="Confirm password"
          required
          className="input-box"
        />
      </div>
         <div className="sign-in-button">
            <SubmitButton>Go Back To Login</SubmitButton>
          </div>
      </form>
      </div>
    </div>
  );
}