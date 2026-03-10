import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username, SetUsername] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [phone, SetPhone] = useState('')
  const [error, Seterror] = useState({})
  const [success, Setsuccess] = useState(false)
  const [loading, Setloading] = useState(false)

  const handelRegistration = async (e) => {
    Setloading(true)
    e.preventDefault()

    const userData = { username,email,phone, password }

    try {
      const response = await axios.post('https://localhost:7225/api/User/register', userData)
      Setsuccess(true)
      Seterror({})
    } catch (error) {
      Seterror(error.response?.data || {})
      
    } finally {
      Setloading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join our real estate platform</p>

        <form onSubmit={handelRegistration}>

          <input
            style={styles.input}
            placeholder="Full Name"
            value={username}
            onChange={(e) => SetUsername(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => SetPhone(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />

          {success && <div style={styles.success}>Registration successful ✓</div>}

          <button style={styles.button} disabled={loading}>
            {loading ? <><FontAwesomeIcon icon={faSpinner} spin /> Creating...</> : 'Register'}
          </button>

        </form>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg,#0f172a,#1e293b)'
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    padding: '40px',
    borderRadius: '16px',
    width: '380px',
    color: 'white',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  },
  title: {
    marginBottom: '5px'
  },
  subtitle: {
    marginBottom: '20px',
    color: '#94a3b8'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#020617',
    color: 'white'
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  success: {
    marginBottom: '10px',
    color: '#22c55e'
  }
}

export default Register