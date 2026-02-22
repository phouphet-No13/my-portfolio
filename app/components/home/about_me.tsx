import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function AboutMe() {
    return (
        <section id="about"
            className="w-full text-white justify-center flex">
            <div className="container flex w-full gap-12 items-center">
                {/* Content */}
                <div className=' flex flex-col w-1/2 gap-8'>
                    <div className='flex flex-col text-white gap-4'>
                        <p>About Me</p>
                        <h2 className=' text-5xl font-bold'>
                            Crafting <span className="text-blue-500">meaningful</span>{" "}
                            digital <span className="text-cyan-500">journeys</span>.
                        </h2>
                    </div>
                    <p className=' leading-relaxed text-gray-400'>
                        Hi there! I'm Alex, a passionate UI/UX Designer and Creative
                        Developer based in the vibrant city of Seattle. My heart lies in
                        crafting web solutions that are not only user-friendly but also
                        prioritize accessibility and simplicity. I thrive on diving deep
                        into the design process, ensuring that every project meets user
                        needs while providing a delightful experience. Whether I'm
                        working on a sleek website or an intuitive app, my mission is to
                        make technology both accessible and enjoyable for everyone. I
                        firmly believe that great design should blend functionality with
                        fun, and I'm committed to bringing this philosophy to life in
                        every project I take on. Let's create something amazing
                        together!
                    </p>
                </div>
                {/* image */}
                <div className='w-1/2'>
                    <Image
                        src="/home/image/section2.png"
                        alt="Profile Picture"
                        width={500}
                        height={500}
                        className="rounded-full mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutMe