import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code,
  Lightbulb,
  Users,
  Search,
  Puzzle,
  Megaphone,
  Clipboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      const elements = document.querySelectorAll('.role-icon');
      const randomIndex = Math.floor(Math.random() * elements.length);
      elements.forEach((el, i) => {
        if (i === randomIndex) {
          el.classList.add('pulse-animation');
          setTimeout(() => el.classList.remove('pulse-animation'), 1000);
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white relative overflow-hidden">
      <Helmet>
        <title>RoleCraft | Find Your Perfect Hackathon Role</title>
        <meta
          name="description"
          content="RoleCraft helps you find your ideal hackathon role: Developer, Designer, Researcher, and more. Trusted by 9M+ hackers."
        />
        <meta
          name="keywords"
          content="hackathon, team roles, developer, designer, pitcher, researcher, tester, hackathon tool, role finder"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Haitem Belaib" />
        <meta property="og:title" content="RoleCraft | Find Your Perfect Hackathon Role" />
        <meta
          property="og:description"
          content="Discover your ideal hackathon role with RoleCraft – the smartest way to build your team."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rolecraft.vercel.app" />
        <meta property="og:image" content="https://rolecraft.vercel.app/l.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RoleCraft | Find Your Perfect Hackathon Role" />
        <meta
          name="twitter:description"
          content="Discover your ideal hackathon role with RoleCraft – the smartest way to build your team."
        />
        <meta name="twitter:image" content="https://rolecraft.vercel.app/l.png" />
      </Helmet>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3ECF8E]/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#3ECF8E]/5 blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzRUNGOEUiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMzAgMGMxNi41NjkgMCAzMCAxMy40MzEgMzAgMzAgMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDB6Ii8+PHBhdGggc3Ryb2tlPSIjM0VDRjhFIiBzdHJva2Utb3BhY2l0eT0iLjAzIiBzdHJva2Utd2lkdGg9Ii41IiBkPSJNMzAgLjVDNDYuMjkyLjUgNTkuNSAxMy43MDggNTkuNSAzMFM0Ni4yOTIgNTkuNSAzMCA1OS41Uy41IDQ2LjI5Mi41IDMwUzEzLjcwOC41IDMwIC41eiIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

      {/* Main content */}
      <div className={`max-w-6xl mx-auto px-6 text-center z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#3ECF8E] to-teal-400">
          Hackathon Role Finder
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Discover your perfect position in any hackathon team and maximize your impact
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6 mb-12 max-w-6xl mx-auto">
          {[
            { icon: Code, title: "Developer", desc: "Code wizardry" },
            { icon: Lightbulb, title: "Designer", desc: "Visual genius" },
            { icon: Users, title: "Manager", desc: "Team leader" },
            { icon: Search, title: "Researcher", desc: "Data detective" },
            { icon: Puzzle, title: "Problem Solver", desc: "Solution finder" },
            { icon: Megaphone, title: "Pitcher", desc: "Idea presenter" },
            { icon: Clipboard, title: "Tester", desc: "Quality assurer" },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="flex flex-col items-center p-3">
              <div className="role-icon w-16 h-16 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#3ECF8E]/20 mb-4 transition-all">
                <Icon className="w-8 h-8 text-[#3ECF8E]" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="inline-block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3ECF8E] to-teal-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <Button
            asChild
            size="lg"
            className="relative bg-[#3ECF8E] hover:bg-[#3ECF8E]/90 text-[#121212] font-medium px-8 py-6 rounded-full transition-all group-hover:translate-y-0.5"
          >
            <Link to="/TeamSizePage" className="flex items-center space-x-2">
              <span className="font-bold text-lg">Find Your Role</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Trusted by <span className="text-[#3ECF8E]">9M+</span> hackathon participants worldwide
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pulse-animation {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1);
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(62, 207, 142, 0.7);
          }
        }
      `}} />
    </div>
  );
};

export default LandingPage;
