import Link from 'next/link';
import { SubmitButton } from '../../../components/submit-button/submit-button';
import './reset-password.css'
import { redirect } from 'next/navigation';
import { resetPassword } from '@/app/db';
import { getToken } from '@/app/db';

export default async function ForgotPassword({ params }) {

  const token = params['id'];
  const tokenDoc = await getToken(token);
  const email = tokenDoc['email']
  const expirationDate = tokenDoc['expireAt']
  const isExpired = (Date.now() > expirationDate);
  console.log('tokenDoc', tokenDoc, token, typeof token)


  return (

    <div className="forgot-password-container">
      {
      isExpired ?
      <div className="forgot-password-wrapper">
        <div className='forgot-password-header'>
          Reset Your Password
        </div>
        <form
         action={async (formData) => {
            'use server';
            const response = await resetPassword(email, formData.get('password'), formData.get('confirm-password'));
            console.log('response was', response)
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
          type="password"
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

      :

      <div className="forgot-password-wrapper">
        <div className='forgot-password-header'>
          Reset Your Password
        </div>
        <div>Link is expired</div>
      </div>

      
      }
    </div>
  );
}