import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProjectCatugory() {
    return (
        <section id="projects"
            className="w-full bg-black text-white flex justify-center">
            <div className="container flex flex-col w-full gap-12 items-center">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-gray-400">
                        Project Categories
                    </span>
                    <h2 className="text-4xl font-bold ">
                        <span className="text-blue-500">Designing</span> Impactful{" "}
                        <span className="text-cyan-500">Online</span> Experiences
                    </h2>
                    <p className="text-gray-400">
                        I am a UI/UX Designer & Creative Developer based in San Francisco.
                        I build minimal, clean, and accessible web solutions.
                    </p>
                </div>
                {/* Project Gard */}
                <div className=' grid grid-cols-3 gap-6'>
                    <div className='flex flex-col gap-4 bg-white/10 rounded-lg'>
                        <Image
                            src="/home/image/Rectangle 8-1.png"
                            alt="Project 1"
                            width={500}
                            height={500}
                            className="rounded-lg h-40 object-cover"
                        />
                        <h3 className="text-xl font-semibold text-center p-3">Website</h3>
                    </div>
                    <div className='flex flex-col gap-4 bg-white/10 rounded-lg'>
                        <Image
                            src="/home/image/Rectangle 8-1.png"
                            alt="Project 1"
                            width={500}
                            height={500}
                            className="rounded-lg h-40 object-cover"
                        />
                        <h3 className="text-xl font-semibold text-center p-3">Application</h3>
                    </div>
                    <div className='flex flex-col gap-4 bg-white/10 rounded-lg'>
                        <Image
                            src="/home/image/Rectangle 8-1.png"
                            alt="Project 1"
                            width={500}
                            height={500}
                            className="rounded-lg h-40 object-cover"
                        />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold text-center">Systems</h3>
                            <p className="text-gray-400 text-center">Designing and developing scalable systems for enterprise clients.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectCatugory