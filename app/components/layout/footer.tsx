import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 border-t border-gray-200 bg-white mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <p>&copy; {currentYear} Your Company Name. All rights reserved.</p>
        <nav className="flex gap-6">
          <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
