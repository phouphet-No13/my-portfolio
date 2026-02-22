import React from "react";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
    return (
        <section
            id="contact"
            className="w-full py-12 md:py-24 lg:py-32 bg-black text-white"
        >
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-gray-400 text-sm">Contact me</span>
                            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                                Get <span className="text-cyan-500">in Touch</span>
                            </h2>
                            <p className="text-gray-400 max-w-md leading-relaxed">
                                Feel free to reach out! I'm a UI/UX Designer and Creative
                                Developer located in the vibrant city of San Francisco,
                                dedicated to crafting minimalistic, clean, and user-friendly web
                                solutions. Let's connect!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 text-white hover:text-cyan-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-cyan-500 transition-all">
                                    <img src="/home/icon/contact/ic_outline-facebook.svg" alt="Facebook" />
                                </div>
                                <span className="text-lg underline underline-offset-4 decoration-white/30 group-hover:decoration-blue-500 group-hover:text-blue-500 transition-colors">
                                    WWW.Meowdesinger/Facebook.com
                                </span>
                            </Link>

                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 text-white hover:text-cyan-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded group-hover:bg-cyan-400 transition-colors">
                                    <img src="/home/icon/contact/mingcute_instagram-fill.svg" alt="Instagram" width={24} height={24} />
                                </div>
                                <span className="text-lg underline underline-offset-4 decoration-white/30 group-hover:decoration-cyan-400">
                                    WWW.PurrfectDesigns/Instagram.com
                                </span>
                            </Link>

                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 text-white hover:text-cyan-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded group-hover:bg-cyan-400 transition-colors">
                                    <img src="/home/icon/contact/mdi_linkedin.svg" alt="LinkedIn" width={20} height={20} />
                                </div>
                                <span className="text-lg underline underline-offset-4 decoration-white/30 group-hover:decoration-cyan-400">
                                    WWW.FelineArtistry/LinkedIn.com
                                </span>
                            </Link>

                            <Link
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 text-white hover:text-cyan-400 transition-colors group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded group-hover:bg-cyan-400 transition-colors">
                                    <img src="/home/icon/contact/streamline-logos_tiktok-logo-block.svg" alt="Behance" width={20} height={20} />
                                </div>
                                <span className="text-lg underline underline-offset-4 decoration-white/30 group-hover:decoration-cyan-400">
                                    WWW.Meowdesinger/tiktok.com
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="space-y-6 pt-8 lg:pt-0">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-400"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter email or username ..."
                                className="w-full h-14 px-4 rounded-lg bg-[#1F1F1F] border-transparent focus:border-cyan-400 focus:ring-0 text-white placeholder-gray-500 transition-colors outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-400"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email or username ..."
                                className="w-full h-14 px-4 rounded-lg bg-[#1F1F1F] border-transparent focus:border-cyan-400 focus:ring-0 text-white placeholder-gray-500 transition-colors outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium text-gray-400"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Enter email or username ..."
                                className="w-full h-40 p-4 rounded-lg bg-[#1F1F1F] border-transparent focus:border-cyan-400 focus:ring-0 text-white placeholder-gray-500 transition-colors outline-none resize-none"
                            />
                        </div>

                        <button className="w-full h-14 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/20 text-white font-semibold text-lg flex items-center justify-center space-x-2 transition-all coursor-pointer">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;