import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, UserPlus, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamSizePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamSize, setTeamSize] = useState(3);
  const [teamMembers, setTeamMembers] = useState(['', '', '']);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTeamSizeChange = (newSize) => {
    const size = Math.max(1, Math.min(10, newSize));
    setTeamSize(size);

    // Adjust team members array
    if (size > teamMembers.length) {
      setTeamMembers([...teamMembers, ...Array(size - teamMembers.length).fill('')]);
    } else {
      setTeamMembers(teamMembers.slice(0, size));
    }
  };

  const handleMemberNameChange = (index, value) => {
    const newMembers = [...teamMembers];
    newMembers[index] = value;
    setTeamMembers(newMembers);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white relative overflow-hidden p-4">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3ECF8E]/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#3ECF8E]/5 blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzRUNGOEUiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMzAgMGMxNi41NjkgMCAzMCAxMy40MzEgMzAgMzAgMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDB6Ii8+PHBhdGggc3Ryb2tlPSIjM0VDRjhFIiBzdHJva2Utb3BhY2l0eT0iLjAzIiBzdHJva2Utd2lkdGg9Ii41IiBkPSJNMzAgLjVDNDYuMjkyLjUgNTkuNSAxMy43MDggNTkuNSAzMFM0Ni4yOTIgNTkuNSAzMCA1OS41Uy41IDQ2LjI5Mi41IDMwUzEzLjcwOC41IDMwIC41eiIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

      {/* Main content */}
      <div className={`w-full max-w-lg mx-auto z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3ECF8E] to-teal-400">
            Team Setup
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Tell us about your hackathon team members to find the perfect roles
          </p>
        </div>

        {/* Team Size Control */}
        <div className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
          <label className="block text-white text-lg font-medium mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#3ECF8E]" />
            Team Size
          </label>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleTeamSizeChange(teamSize - 1)}
              disabled={teamSize <= 1}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <UserMinus className="w-5 h-5 text-[#3ECF8E]" />
            </button>

            <div className="text-2xl font-bold w-12 text-center">{teamSize}</div>

            <button
              onClick={() => handleTeamSizeChange(teamSize + 1)}
              disabled={teamSize >= 10}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <UserPlus className="w-5 h-5 text-[#3ECF8E]" />
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-4 mb-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <label className="block text-white mb-2 font-medium">Team Member {index + 1}</label>
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberNameChange(index, e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E] transition-colors"
                placeholder="Enter name"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="inline-block relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3ECF8E] to-teal-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <Button
            asChild
            size="lg"
            className="relative w-full bg-[#3ECF8E] hover:bg-[#3ECF8E]/90 text-[#121212] font-bold py-4 rounded-full transition-all group-hover:translate-y-0.5"
          >
            <Link to="/questions" state={{ teamMembers }} className="flex items-center justify-center space-x-2">
              <span className="text-lg">Continue to Questions</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Navigation hint */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-[#3ECF8E] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Custom animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default TeamSizePage;