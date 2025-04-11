import { Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#121212] text-[#121212] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">

              <span className="font-bold text-2xl tracking-tight text-white">Rolecraft</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-[#121212] hover:text-white text-white hover:bg-[#3ECF8E] border-none flex items-center gap-2"
            >
              <a href="https://github.com/bl-haitem" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>@Haitomass</span>
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#121212] hover:text-white focus:outline-none text-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] text-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="https://github.com/bl-haitem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-[#3ECF8E] hover:text-[#121212] transition duration-200"
            >
              <Github className="h-4 w-4 mr-2" />
              <span>@Haitomass</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;