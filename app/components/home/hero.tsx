import React from 'react'
import Spline from '@splinetool/react-spline'

function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-200 overflow-hidden flex items-center justify-center pt-20">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Spline
                    className="w-full h-full scale-[0.8] md:scale-100" // Adjust scale for mobile if needed
                    scene="https://prod.spline.design/6e42bvjAKcxxRdXI/scene.splinecode"
                />
                {/* Fallback/Overlay gradient if Spline fails or loads slow */}
                <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black pointer-events-none" />
            </div>

            {/* Hero Content */}
            <div className="container-custom relative z-50 text-center space-y-8 mt-30">
                <div className="flex flex-col items-center gap-6 max-w-full mx-auto">
                    <h2 className="text-cyan-400 text-sm md:text-base tracking-[0.2em] uppercase font-medium">
                        Hello, I am Meow Designer
                    </h2>

                    <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-[1.1]">
                        Creating{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                            digital experiences
                        </span>{" "}
                        that matter.
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        I am a UI/UX Designer & Creative Developer based in San Francisco.
                        I build minimal, clean, and accessible web solutions.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection