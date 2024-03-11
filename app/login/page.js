import Link from 'next/link';
import {Form} from '../../components/form/form';
import {signIn} from '../auth';
import {SubmitButton} from '../../components/submit-button/submit-button';
import './login.css';
import {redirect} from 'next/navigation';

/**
 * @return – Renders the Login Page
 */
export default function Login({searchParams}) {
	const found = searchParams['found'];
	const match = searchParams['match'];

	return (
		<div className="login-container">
			<div className="login-wrapper">
				<div className='login-header'>
          Login to Your Account

					<div className="login-subheader">
						{'Don\'t have an account? '}
						<Link href="/register">
                		Sign up
						</Link>
					</div>

				</div>
				<Form
					action={async (formData) => {
						'use server';
						const response = await signIn('credentials', {
							redirect: false,
							email: formData.get('email'),
							password: formData.get('password'),
						}).then().catch(() =>
							redirect(`/login/?match=false`)
						);
						if (response) {
							redirect(`/profile`);
						}
					}}
				>
					{match && <div className='wrong-password'>Password incorrect</div>}
					<div className="sign-in-button">
						<SubmitButton>Sign in</SubmitButton>
					</div>
				</Form>
				<Link href="/forgot-password">
               <div className='forgot-your-password'>Forgot your password?</div>
				</Link>
			</div>
		</div>
	);
}
