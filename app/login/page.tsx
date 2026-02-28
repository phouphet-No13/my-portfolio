"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [error, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-cyan-500/30">
      {/* Left: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 xl:p-16 relative z-10">
        {/* Top: Logo */}
        <Link href="/" className="flex items-center gap-3 w-fit group">
          <div className="w-10 h-10 flex items-center justify-center transition-all duration-300">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain filter invert drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            PortfolioAdmin
          </span>
        </Link>

        {/* Center: Form */}
        <div className="w-full max-w-sm mx-auto mt-12 mb-auto flex flex-col justify-center h-full">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-gray-400">Please enter your details.</p>
          </div>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-300 group-focus-within:text-cyan-400 transition-colors">
                Email
              </label>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 bg-linear-to-r from-cyan-400 to-blue-500/50"></div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  required
                  className="relative w-full h-12 px-4 py-3 rounded-lg bg-[#111] border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 outline-none transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-300 group-focus-within:text-cyan-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 bg-linear-to-r from-cyan-400 to-blue-500/50"></div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="relative w-full h-12 px-4 py-3 rounded-lg bg-[#111] border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 outline-none transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 rounded border border-gray-600 bg-black group-hover:border-cyan-400 transition-colors">
                  <input type="checkbox" className="peer sr-only" />
                  <svg
                    className="w-3 h-3 text-cyan-400 opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  Remember for 30 days
                </span>
              </label>

              <Link
                href="#"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Forgot password
              </Link>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-medium mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 mt-4 bg-white text-black font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-0.5 overflow-hidden relative group/btn"
            >
              <div className="absolute inset-0 w-1/4 h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-[250%] group-hover/btn:translate-x-[400%] transition-transform duration-1000"></div>
              {isPending ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <svg
                    className="animate-spin w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="relative z-10">Sign in</span>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-sm text-gray-500 mt-12 flex items-center gap-2">
          &copy; {new Date().getFullYear()} Meow Designer
        </div>
      </div>

      {/* Right: Abstract Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-linear-to-bl from-cyan-500/10 to-blue-600/10 mix-blend-overlay z-10 pointer-events-none"></div>
        <Image
          src="/login-bg.png"
          alt="Abstract 3D Background"
          fill
          priority
          className="object-cover relative z-0 scale-[1.01]"
          sizes="50vw"
        />
      </div>
    </div>
  );
}
