'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

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


// --- Main LoginPage Component ---
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        ...formData,
        redirect: false,
      });

      if (res?.ok) {
        router.push('/');
      } else {
        // Handle specific errors from NextAuth
        if (res?.error === 'CredentialsSignin') {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(res?.error || 'An unexpected error occurred. Please try again later.');
        }
      }
    } catch (err) {
      setError('A connection error occurred. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-950/80 backdrop-blur-md p-10 rounded-2xl shadow-3xl border border-purple-700/50">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-500 tracking-tight">
            Autoverse
          </h1>
          <h2 className="text-2xl font-semibold text-white mt-2 border-b border-purple-700/50 pb-3 inline-block">
            Access Your Account
          </h2>
          <p className="text-gray-400 mt-3">Welcome back! Please enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormInput
            name="email"
            type="email"
            placeholder="Corporate Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            error={error ? ' ' : undefined} // Shows red border on any error
          />

          <FormInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Your Secure Password"
            required
            value={formData.password}
            onChange={handleChange}
            error={error ? ' ' : undefined} // Shows red border on any error
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

          {/* General Error Message */}
          {error && (
            <div className="p-4 bg-red-900/40 text-red-300 border border-red-700 rounded-lg text-center font-medium shadow-inner -mt-2">
              {error}
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
            {loading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?
          <button
            onClick={() => router.push('/signup')}
            type="button"
            className="text-purple-400 hover:text-purple-300 ml-1 font-semibold transition-colors duration-200"
          >
            Sign Up Now
          </button>
        </p>

      </div>
    </div>
  );
}
