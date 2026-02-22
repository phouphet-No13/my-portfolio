import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Logo
          </Link>
        </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/projects"
              className="transition-colors hover:text-blue-600"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
      </div>
    </nav>
  );
}
