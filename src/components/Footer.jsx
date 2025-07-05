import { Linkedin, Mail, Link } from 'lucide-react'; // Changed Github and Instagram to Linkedin and Link

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] border-t border-[#3ECF8E]/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <span className="font-bold text-xl text-[#FAFAFA]">Rolecraft</span>
            </div>
            <p className="text-[#FAFAFA]/70 text-sm mb-4 text-center md:text-left">
              Finding your perfect hackathon role has never been easier.
            </p>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-[#FAFAFA] font-semibold mb-4">Connect</h3>
            <div className="flex space-x-6">
              <a
                href="https://haitem-belaib-portfolio.web.app/" // Portfolio link
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA]/70 hover:text-[#3ECF8E] transition-colors duration-200 flex flex-col items-center"
              >
                <Link className="h-6 w-6 mb-1" /> {/* Changed to Link icon for portfolio */}
                <span className="text-xs">Portfolio</span>
              </a>
              <a
                href="https://www.linkedin.com/in/haitem-belaib-61b621353/" // LinkedIn link
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAFA]/70 hover:text-[#3ECF8E] transition-colors duration-200 flex flex-col items-center"
              >
                <Linkedin className="h-6 w-6 mb-1" /> {/* Changed to Linkedin icon */}
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
                href="mailto:haitembelaib@gmail.com"
                className="text-[#FAFAFA]/70 hover:text-[#3ECF8E] transition-colors duration-200 flex flex-col items-center"
              >
                <Mail className="h-6 w-6 mb-1" />
                <span className="text-xs">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#FAFAFA]/70 text-sm">
              © {currentYear} Rolecraft. All rights reserved.
            </p>
            <p className="text-[#FAFAFA]/50 text-xs mt-2 md:mt-0">
              Made with ❤️ by <a href="https://github.com/bl-haitem" target="_blank" rel="noopener noreferrer" className="text-[#3ECF8E] hover:underline">@Haitomass</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
