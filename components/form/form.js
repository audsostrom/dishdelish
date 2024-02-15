import './form.css'

export function Form({action,children}) {
  return (
    <form
      action={action}
      className=""
    >
      <div className="email-input-wrapper">
        <label
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          autoComplete="email"
          required
          className="input-box"
        />
      </div>
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
      </div>
      {children}
    </form>
  );
}
