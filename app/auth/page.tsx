'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const LoginPage = () => {
  const [isTeacher, setIsTeacher] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 🔹 Handle Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔹 Login Attempt:')
    console.log('Role:', isTeacher ? 'Teacher' : 'Student')
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* STUDENT: Blue Panel on LEFT */}
      {!isTeacher && (
        <div className='hidden md:flex md:w-1/2 bg-blue-950 text-white flex-col justify-center items-center p-10 order-1'>
          <h1 className='text-4xl font-bold mb-4'>Welcome Back, Student!</h1>
          <p className='text-center text-sm mb-8'>
            Need help?{' '}
            <a href='/support' className='text-blue-300 hover:underline'>
              Contact Support
            </a>
          </p>
          <img src='/window.svg' alt='illustration' className='max-w-xs opacity-90' />
        </div>
      )}

      {/* Login Form Section */}
      <div
        className={`w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 ${
          isTeacher ? 'order-1' : 'order-2'
        }`}
      >
        <div className='w-full max-w-sm'>
          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <img src='/next.svg' alt='logo' className='h-12' />
          </div>

          {/* Header */}
          <h1 className='text-3xl font-bold mb-2 text-gray-900'>
            Hi {isTeacher ? 'Teacher' : 'Student'}!
          </h1>
          <p className='text-lg mb-6 text-gray-600'>Enter your credentials.</p>

          {/* Form */}
          <form onSubmit={handleSignIn} className='space-y-4'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' className='w-full'>
              {isTeacher ? 'Teacher Login' : 'Student Login'}
            </Button>
          </form>

          {/* Toggle */}
          <div className='text-center mt-6'>
            {isTeacher ? (
              <p>
                Are you a student?{' '}
                <button
                  onClick={() => setIsTeacher(false)}
                  className='text-blue-600 hover:underline font-medium'
                >
                  Student Login
                </button>
              </p>
            ) : (
              <p>
                Are you a teacher?{' '}
                <button
                  onClick={() => setIsTeacher(true)}
                  className='text-blue-600 hover:underline font-medium'
                >
                  Teacher Login
                </button>
              </p>
            )}
          </div>

          {/* Footer */}
          <footer className='mt-8 text-center text-sm text-gray-500'>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
            <div className='flex justify-center mt-2 space-x-3'>
              <a href='/privacy' className='hover:underline'>
                Privacy Policy
              </a>
              <span>|</span>
              <a href='/terms' className='hover:underline'>
                Terms of Service
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* TEACHER: Blue Panel on RIGHT */}
      {isTeacher && (
        <div className='hidden md:flex md:w-1/2 bg-blue-950 text-white flex-col justify-center items-center p-10 order-2'>
          <h1 className='text-4xl font-bold mb-4'>Welcome Back, Teacher!</h1>
          <p className='text-center text-sm mb-8'>
            Need help?{' '}
            <a href='/support' className='text-blue-300 hover:underline'>
              Contact Support
            </a>
          </p>
          <img src='/window.svg' alt='illustration' className='max-w-xs opacity-90' />
        </div>
      )}
    </div>
  )
}

export default LoginPage
