'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Mail, Lock, User, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [isLogin, setIsLogin] = useState(true)

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', loginForm)
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register submitted:', registerForm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-600">CORNMAN</h1>
          </div>
          <p className="text-gray-600">Welcome to the best corn products in town</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Brand Info */}
          <div className="hidden lg:block">
            <Card className="bg-green-600 text-white border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Join the CORNMAN Family</h2>
                    <p className="text-green-100 mb-6">
                      Experience the finest corn products with exclusive member benefits, 
                      early access to new flavors, and special discounts just for you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Badge className="bg-white text-green-600 border-0">1</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">Exclusive Products</h3>
                        <p className="text-green-100 text-sm">Access to limited edition flavors</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Badge className="bg-white text-green-600 border-0">2</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">Member Discounts</h3>
                        <p className="text-green-100 text-sm">Save up to 20% on every order</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Badge className="bg-white text-green-600 border-0">3</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold">Fast Delivery</h3>
                        <p className="text-green-100 text-sm">Priority shipping for members</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500 p-4 rounded-lg">
                    <p className="text-sm text-green-100">
                      "The best corn products I've ever tasted! The membership is totally worth it." 
                      <span className="block text-green-200 mt-1">- Sarah M., Happy Customer</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to your account' 
                    : 'Join us today and start enjoying'
                  }
                </p>
              </CardHeader>
              <CardContent>
                {/* Toggle between Login and Register */}
                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={isLogin ? "default" : "ghost"}
                    className={`flex-1 ${isLogin ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={!isLogin ? "default" : "ghost"}
                    className={`flex-1 ${!isLogin ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </Button>
                </div>

                {/* Login Form */}
                {isLogin ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="login-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          name="rememberMe"
                          checked={loginForm.rememberMe}
                          onCheckedChange={(checked) => 
                            setLoginForm({...loginForm, rememberMe: checked as boolean})
                          }
                        />
                        <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                      </div>
                      <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Sign In
                    </Button>

                    <div className="text-center">
                      <span className="text-sm text-gray-600">Or continue with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        Facebook
                      </Button>
                    </div>
                  </form>
                ) : (
                  /* Register Form */
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-firstName"
                            name="firstName"
                            value={registerForm.firstName}
                            onChange={handleRegisterChange}
                            placeholder="John"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-lastName"
                            name="lastName"
                            value={registerForm.lastName}
                            onChange={handleRegisterChange}
                            placeholder="Doe"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="register-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="register-confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="••••••••"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agree-terms"
                        name="agreeToTerms"
                        checked={registerForm.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setRegisterForm({...registerForm, agreeToTerms: checked as boolean})
                        }
                      />
                      <Label htmlFor="agree-terms" className="text-sm">
                        I agree to the{' '}
                        <Link href="/terms" className="text-green-600 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-green-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Create Account
                    </Button>

                    <div className="text-center">
                      <span className="text-sm text-gray-600">Or sign up with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        Facebook
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}