import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Process() {

    const processes = [
        {
            title: "Discover & Research",
            description:
                "I start by understanding the problem, user needs, and project goals. I research similar products and gather inspiration to define a clear direction.",
            icon: "/home/icon/section4/iconoir_brain-research.svg",
        },
        {
            title: "Design & Prototype",
            description:
                "I create wireframes and high-fidelity designs in Figma, then build interactive prototypes to test user flows and improve usability.",
            icon: "/home/icon/section4/fluent_design-ideas-16-regular.svg",
        },
        {
            title: "Develop",
            description:
                "I turn designs into responsive websites using Next.js, Tailwind CSS, and modern frontend tools, focusing on performance and clean code.",
            icon: "/home/icon/section4/hugeicons_developer.svg",
        },
        {
            title: "Test & Improve",
            description:
                "I test usability, fix bugs, and refine details based on feedback to ensure the best user experience.",
            icon: "/home/icon/section4/hugeicons_test-tube.svg",
        },
        {
            title: "Launch & Support",
            description:
                "After deployment, I monitor performance and provide updates or improvements when needed.",
            icon: "/home/icon/section4/fluent_person-support-28-regular.svg",
        },
    ];

    return (
        <div>
            <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden text-white">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/home/video/section4.mp4" type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                <div className="container relative z-20 px-4 md:px-6 mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <span className="text-gray-400 uppercase tracking-wider text-sm">
                            Work process
                        </span>
                        <h2 className="text-4xl font-bold leading-tight">
                            <span className="text-blue-500">Creating Engaging</span>{" "}
                            <span className="text-cyan-500">Digital Journeys</span>.
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Based in the vibrant city of San Francisco, I am a UI/UX Designer
                            and Creative Developer dedicated to crafting captivating digital
                            experiences. My design philosophy centers around minimalism,
                            clarity.
                        </p>
                    </div>

                    {/* Process Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {processes.map((process, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                            >
                                <div className="mb-6 p-4 rounded-full border border-white/20 bg-white/5">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={process.icon}
                                            alt={process.title}
                                            fill
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {process.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Process