'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface EyeIconProps {
  isVisible: boolean;
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ isVisible, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 text-gray-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${className}`}
    aria-hidden="true"
  >
    {isVisible ? (
      <>
        {/* Eye Open (Visible) */}
        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ) : (
      <>
        {/* Eye Off (Hidden) */}
        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c1.82 0 3.44 .48 4.92 1.32" />
        <path d="M3 3l18 18" />
      </>
    )}
  </svg>
);


// --- Custom Form Input Component ---
interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  placeholder,
  required,
  error,
  value,
  onChange,
  children
}) => {
  return (
    <div className="relative">
      <div
        className={`flex items-center bg-gray-900 border ${error
          ? 'border-red-500 ring-1 ring-red-500'
          : 'border-gray-700 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600'
          } rounded-lg transition-all duration-200`}
      >
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value} // crucial for controlled input
          onChange={onChange}
          required={required}
          className="w-full p-4 bg-transparent text-white placeholder-gray-500 outline-none rounded-lg"
        />
        {children}
      </div>
      {error && <p className="text-sm text-red-400 mt-2 font-medium pl-1">{error}</p>}
    </div>
  );
};


// --- Main SignUp Component ---
export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use useCallback for better performance and to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors for the specific field when typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Real-time client-side check for password match
    if (name === 'confirmPassword' || name === 'password') {
      const otherPassValue = name === 'confirmPassword' ? formData.password : formData.confirmPassword;

      // Check only if both fields have input
      if (otherPassValue && value && value !== otherPassValue) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match. Please verify the password.' }));
      } else if (errors.confirmPassword) {
        // Clear the error if they now match (or one is empty)
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  }, [formData, errors]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // 1. Client-side Validation (Password Match)
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords must match to proceed with registration.' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const errorData = await res.json();

        // 2. Server-side Error Handling
        if (res.status === 409) {
          // Conflict: Username or Email already exists
          if (errorData.field === 'username') {
            setErrors({ username: 'This username is already claimed in the Autoverse. Please select a different one.' });
          } else if (errorData.field === 'email') {
            setErrors({ email: 'This email is already associated with an account. Try logging in.' });
          }
        } else if (res.status === 400) {
          // Bad Request: e.g., Missing fields or invalid password length
          if (errorData.error.includes('Password must be at least 8 characters')) {
            setErrors({ password: 'Password must be a minimum of 8 characters for security.' });
          } else {
            setErrors({ general: errorData.error || 'Invalid registration data. Please review all fields.' });
          }
        } else {
          setErrors({ general: 'Registration failed due to a server issue. Please contact support.' });
        }
      }
    } catch (err) {
      setErrors({ general: 'A connection error occurred. Check your network and try again.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-lg bg-gray-950/80 backdrop-blur-md p-10 rounded-2xl shadow-3xl border border-purple-700/50">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-500 tracking-tight">
            Autoverse
          </h1>
          <h2 className="text-2xl w-full font-semibold text-white mt-2 border-b-2 border-purple-700/50 pb-3 inline-block">
            Create Your Free Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <FormInput
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password Field with Eye Toggle */}
          <FormInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (Min 8 Characters)"
            required
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="p-3"
            >
              <EyeIcon isVisible={showPassword} />
            </button>
          </FormInput>

          <FormInput
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* General Error Message */}
          {errors.general && (
            <div className="p-4 bg-red-900/40 text-red-300 border border-red-700 rounded-lg text-center font-medium shadow-inner">
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 font-bold text-lg rounded-lg tracking-wider transition-all duration-300 ease-in-out ${loading
              ? 'bg-purple-800 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50'
              }`}
          >
            {loading ? 'Processing Registration...' : 'Sign Up to Autoverse'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already a member?
          <button
            onClick={() => router.push('/login')}
            type="button"
            className="text-purple-400 hover:text-purple-300 ml-1 font-semibold transition-colors duration-200"
          >
            Log In Here
          </button>
        </p>

      </div>
    </div>
  );
}