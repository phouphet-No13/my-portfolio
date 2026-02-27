"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormField =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "service"
  | "message";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
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
    hoverText: "group-hover:text-pink-500 group-hover:decoration-pink-500", // Added missing properties
    hoverBg: "group-hover:bg-pink-500", // Added missing properties
  },
];

const SERVICES = [
  "Web Design",
  "UI/UX Design",
  "Frontend Development",
  "Mobile App Design",
  "Branding",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: "/contact/icon/weui_email-outlined.svg",
    label: "Email Address",
    value: "phouphetchanthalungsy40@gmail.com",
    href: "mailto:phouphetchanthalungsy40@gmail.com",
  },
  {
    icon: "/contact/icon/proicons_call.svg",
    label: "Phone Number",
    value: "+856 20 7797 4191",
    href: "tel:+8562077974191",
  },
  {
    icon: "/contact/icon/carbon_location.svg",
    label: "Location",
    value: "Vientiane, Laos",
    href: "https://maps.google.com",
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

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const headerRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 40,
  });
  const formRef = useGsapReveal<HTMLDivElement>({ distance: 50 });
  const infoRef = useGsapReveal<HTMLDivElement>({
    distance: 50,
    from: "right",
  });
  const mapRef = useGsapReveal<HTMLDivElement>({ distance: 60, stagger: 0.2 });

  function handleChange(field: FormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.service) newErrors.service = "Please select a service";
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
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  }

  return (
    <div className="w-full bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-16 px-4">
        <div
          ref={headerRef}
          className="container mx-auto max-w-4xl text-center space-y-6 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm mx-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Let's Create Something
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Amazing Together
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Whether you have a project in mind or just want to say hi, my inbox
            is always open. Let's build the next big thing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative w-full py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column */}
            <div ref={formRef} className="lg:col-span-7">
              <div className="bg-white/2 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-8">Send a Message</h2>

                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center gap-6 text-center py-20">
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
                        Message Received!
                      </h3>
                      <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
                        I'll review your details and get back to you within
                        24-48 hours.
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
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="First Name *"
                          id="firstName"
                          placeholder="John"
                          value={form.firstName}
                          error={errors.firstName}
                          onChange={handleChange}
                        />
                        <InputField
                          label="Last Name *"
                          id="lastName"
                          placeholder="Doe"
                          value={form.lastName}
                          error={errors.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Email Address *"
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          error={errors.email}
                          onChange={handleChange}
                        />
                        <InputField
                          label="Phone Number"
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          error={errors.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2 group">
                        <label
                          htmlFor="service"
                          className="text-sm font-semibold text-gray-300 group-focus-within:text-cyan-400 transition-colors"
                        >
                          Service Needed *
                        </label>
                        <div className="relative">
                          <div
                            className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 ${errors.service ? "bg-red-500/50" : "bg-linear-to-r from-cyan-400 to-blue-500/50"}`}
                          ></div>
                          <select
                            id="service"
                            value={form.service}
                            onChange={(e) =>
                              handleChange("service", e.target.value)
                            }
                            className={`relative w-full h-14 px-5 rounded-lg bg-black/50 backdrop-blur-md text-white outline-none transition-all duration-300 border appearance-none ${
                              errors.service
                                ? "border-red-500"
                                : "border-white/10 focus:border-cyan-400/50"
                            } ${!form.service ? "text-gray-500" : "text-white"}`}
                          >
                            <option value="" disabled>
                              Select a service
                            </option>
                            {SERVICES.map((s) => (
                              <option
                                key={s}
                                value={s}
                                className="bg-gray-900 text-white"
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                          {/* Custom dropdown arrow */}
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-focus-within:text-cyan-400">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        {errors.service && (
                          <p className="text-red-400 text-xs mt-1 animate-pulse">
                            {errors.service}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 group">
                        <label
                          htmlFor="message"
                          className="text-sm font-semibold text-gray-300 group-focus-within:text-cyan-400 transition-colors"
                        >
                          Project Details *
                        </label>
                        <div className="relative">
                          <div
                            className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 ${errors.message ? "bg-red-500/50" : "bg-linear-to-r from-cyan-400 to-blue-500/50"}`}
                          ></div>
                          <textarea
                            id="message"
                            rows={5}
                            placeholder="Tell me about your project scope, timeline, and goals..."
                            value={form.message}
                            onChange={(e) =>
                              handleChange("message", e.target.value)
                            }
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

                      <div className="pt-4">
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

            {/* Contact Info Column */}
            <div ref={infoRef} className="lg:col-span-5 space-y-8">
              {/* Contact Cards */}
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.href}
                    target={idx === 2 ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-2xl bg-white/2 border border-white/10 transition-all duration-300 hover:bg-white/5 hover:border-cyan-400/30 group hover:-translate-y-1 shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={info.icon}
                        alt={info.label}
                        width={24}
                        height={24}
                        className="brightness-0 invert relative z-10 group-hover:opacity-90"
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                      <p className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="relative p-8 rounded-3xl bg-linear-to-br from-blue-900/40 to-cyan-900/40 border border-cyan-500/20 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/home/image/grid.svg')] opacity-20"></div>
                <div className="absolute -inset-10 bg-cyan-400/10 blur-[50px] group-hover:bg-cyan-400/20 transition-colors duration-500"></div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold">Currently Available</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am currently accepting new freelance projects and
                    full-time opportunities. My typical response time is within
                    24 hours.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </span>
                    <span className="text-cyan-400 font-semibold tracking-wide text-sm uppercase">
                      Taking New Clients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-16 px-4">
        <div ref={mapRef} className="container mx-auto max-w-7xl">
          <div className="w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            {/* Map placeholder -> normally an iframe */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948534!3d37.757814996601705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1709664790000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.9) contrast(1.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Overlay gradient to blend map edges slightly */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
