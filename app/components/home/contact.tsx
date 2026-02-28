"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormField = "name" | "email" | "message";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1DdESZS7QB/?mibextid=wwXIfr",
    username: "WWW.Meow desinger/Facebook.com",
    icon: "/home/icon/contact/ic_outline-facebook.svg",
    hoverText: "group-hover:text-blue-500 group-hover:decoration-blue-500",
    hoverBg: "group-hover:bg-cyan-500",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/meowdesign_13?igsh=MTlkaTdtOGRiOW9ndA%3D%3D&utm_source=qr",
    username: "WWW.Meow Designs/Instagram.com",
    icon: "/home/icon/contact/mingcute_instagram-fill.svg",
    hoverText: "group-hover:text-cyan-400 group-hover:decoration-cyan-400",
    hoverBg: "group-hover:bg-cyan-400",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/phouphet-chanthalungsy-b1b2a6293",
    username: "WWW.Phouphet Chanthalungsy/LinkedIn.com",
    icon: "/home/icon/contact/mdi_linkedin.svg",
    hoverText: "group-hover:text-cyan-400 group-hover:decoration-cyan-400",
    hoverBg: "group-hover:bg-cyan-400",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@meowdesigner13?is_from_webapp=1&sender_device=pc",
    username: "WWW.Meow Desinger/tiktok.com",
    icon: "/home/icon/contact/streamline-logos_tiktok-logo-block.svg",
    hoverText: "group-hover:text-cyan-400 group-hover:decoration-cyan-400",
    hoverBg: "group-hover:bg-cyan-400",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  id: FormField;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (field: FormField, value: string) => void;
}) {
  return (
    <div className="space-y-2 group">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-300 group-focus-within:text-cyan-400 transition-colors"
      >
        {label}
      </label>
      <div className="relative">
        <div
          className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 ${error ? "bg-red-500/50" : "bg-linear-to-r from-cyan-400 to-blue-500/50"}`}
        ></div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          className={`relative w-full h-14 px-5 rounded-lg bg-black/50 backdrop-blur-md text-white placeholder-gray-500 outline-none transition-all duration-300 border ${
            error
              ? "border-red-500"
              : "border-white/10 focus:border-cyan-400/50"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const leftColRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 40,
  });
  const rightColRef = useGsapReveal<HTMLDivElement>({
    from: "right",
    distance: 50,
  });

  function handleChange(field: FormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("idle");
      // Optional: Handle error UI here if you wish
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black text-white flex justify-center overflow-hidden"
    >
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full pt-20 md:pt-32 pb-40 justify-between items-start">
          {/* Left Column: Contact Info */}
          <div ref={leftColRef} className="w-full lg:w-[45%] space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
                  Contact Me
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  Get
                </span>{" "}
                <span className="text-white">in</span>{" "}
                <span className="relative inline-block">
                  touch
                  <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-2 bg-linear-to-r from-blue-500 to-cyan-400 opacity-60 rounded-full blur-[2px]"></span>
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mt-4">
                Have a project in mind or just want to say hello? I&apos;m
                always open to discussing new opportunities, creative
                challenges, or how I can help bring your vision to life.
                Let&apos;s build something extraordinary together.
              </p>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/10 w-fit backdrop-blur-md shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </span>
              <p className="text-sm md:text-base text-gray-300 relative z-10">
                Currently{" "}
                <span className="text-cyan-400 font-bold tracking-wide">
                  AVAILABLE
                </span>{" "}
                for freelance work
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-5 pt-4">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-all duration-300 group gap-5 w-fit"
                >
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 transition-all duration-500 overflow-hidden ${s.hoverBg}`}
                  >
                    <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={s.icon}
                      alt={s.label}
                      width={24}
                      height={24}
                      className="brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300 relative z-10"
                    />
                  </div>
                  <span
                    className={`text-sm md:text-base font-medium relative overflow-hidden group-hover:text-cyan-400 transition-colors duration-300`}
                  >
                    {s.username}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            ref={rightColRef}
            className="relative bg-white/2 p-8 md:p-12 rounded-4xl border border-white/10 h-fit w-full lg:w-[55%] max-w-2xl self-center lg:self-start backdrop-blur-xl shadow-2xl overflow-hidden group"
          >
            {/* Subtle glow behind the form container */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-6 text-center py-20 relative z-10">
                <div className="relative w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center animate-[bounce_2s_infinite_ease-in-out]">
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                  <svg
                    className="w-12 h-12 text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 tracking-tight">
                  Message Sent!
                </h3>
                <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
                  Thanks for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
                noValidate
              >
                <InputField
                  label="Name"
                  id="name"
                  placeholder="Enter your name..."
                  value={form.name}
                  error={errors.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  value={form.email}
                  error={errors.email}
                  onChange={handleChange}
                />

                <div className="space-y-2 group">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-300 group-focus-within:text-cyan-400 transition-colors"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 ${errors.message ? "bg-red-500/50" : "bg-linear-to-r from-cyan-400 to-blue-500/50"}`}
                    ></div>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`relative w-full p-5 rounded-lg bg-black/50 backdrop-blur-md text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none border ${
                        errors.message
                          ? "border-red-500"
                          : "border-white/10 focus:border-cyan-400/50"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 animate-pulse">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-14 bg-white text-black font-bold uppercase tracking-wider rounded-xl text-sm md:text-base flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1 overflow-hidden relative group/btn"
                  >
                    <div className="absolute inset-0 w-1/4 h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-[250%] group-hover/btn:translate-x-[400%] transition-transform duration-1000"></div>
                    {status === "loading" ? (
                      <>
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
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
