import { useState } from 'react';

export default function LoginPage({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await window.sccfs.auth.login({ username, password });
      if (!response.ok) {
        setStatus('error');
        setMessage(response.error?.message || 'Login failed');
        return;
      }

      onAuthSuccess(response.data);
      setStatus('success');
      setMessage('Login successful');
    } catch {
      setStatus('error');
      setMessage('Unexpected error during login');
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="form-stack">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      {message ? <p className="muted">{message}</p> : null}
    </section>
  );
}
