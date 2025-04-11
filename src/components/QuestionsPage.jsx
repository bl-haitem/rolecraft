import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// No need to import teamMembers, we'll get it from location.state

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get team members from previous page or use empty array as fallback
  const members = location.state?.teamMembers || [];

  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState(Array(members.length).fill({}));
  const [currentMemberAnswers, setCurrentMemberAnswers] = useState({});
  const [progress, setProgress] = useState(0);

  const questions = [
    {
      id: 1,
      text: "When facing a challenge, how do you approach it?",
      options: [
        { value: "TeamLeader", text: "I take charge and lead the team." },
        { value: "Developer", text: "I prefer to focus on the technical aspects." },
        { value: "Researcher", text: "I gather information and analyze the problem deeply." },
        { value: "ProblemSolver", text: "I break it down into manageable pieces and find solutions." },
      ],
    },
    {
      id: 2,
      text: "How do you prefer to work in a team?",
      options: [
        { value: "TeamLeader", text: "I like to organize and guide the team." },
        { value: "Designer", text: "I focus on making things visually appealing." },
        { value: "Developer", text: "I like working on the technical side of things." },
        { value: "Tester", text: "I prefer testing the product to ensure quality." },
      ],
    },
    {
      id: 3,
      text: "If a problem arises in your task, what do you do?",
      options: [
        { value: "Researcher", text: "I research solutions and consult resources." },
        { value: "ProblemSolver", text: "I try to find a solution on my own." },
        { value: "TeamLeader", text: "I discuss it with the team to solve it together." },
        { value: "Developer", text: "I dive into the technical details to fix it." },
      ],
    },
    {
      id: 4,
      text: "How do you handle deadlines?",
      options: [
        { value: "TeamLeader", text: "I make sure to keep everyone on track and meet deadlines." },
        { value: "Researcher", text: "I gather information ahead of time to ensure we meet deadlines." },
        { value: "Developer", text: "I focus on technical solutions, even under pressure." },
        { value: "ProblemSolver", text: "I break tasks into smaller steps and complete them on time." },
      ],
    },
    {
      id: 5,
      text: "What's your approach when working with a difficult team member?",
      options: [
        { value: "TeamLeader", text: "I try to mediate and resolve conflicts." },
        { value: "Developer", text: "I focus on my tasks and try to avoid conflict." },
        { value: "Researcher", text: "I try to understand their perspective and address the issue calmly." },
        { value: "Tester", text: "I communicate openly to resolve the issue without escalating." },
      ],
    },
    {
      id: 6,
      text: "How do you feel about taking risks?",
      options: [
        { value: "Pitcher", text: "I'm comfortable taking risks and presenting new ideas." },
        { value: "Researcher", text: "I prefer to do thorough research before taking risks." },
        { value: "Developer", text: "I'm open to taking risks if it leads to innovation." },
        { value: "Tester", text: "I prefer to stick with safer, proven methods." },
      ],
    },
    {
      id: 7,
      text: "What motivates you the most in a project?",
      options: [
        { value: "Developer", text: "I enjoy building things and solving technical challenges." },
        { value: "Researcher", text: "I love exploring new information and gaining insights." },
        { value: "TeamLeader", text: "I enjoy leading and making sure everyone works together." },
        { value: "Designer", text: "I enjoy creating visually engaging and functional designs." },
      ],
    },
  ];

  // Define updateProgress before using it in useEffect
  const updateProgress = useCallback(() => {
    // Calculate overall progress across all team members
    const totalQuestions = questions.length * members.length;
    const answeredQuestions = allAnswers.reduce((total, memberAnswers) => {
      return total + Object.keys(memberAnswers).length;
    }, 0);

    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [questions.length, members.length, allAnswers, setProgress]);

  useEffect(() => {
    setIsLoaded(true);
    // Calculate initial progress
    updateProgress();
  }, [updateProgress]);

  useEffect(() => {
    // Update local state when changing member
    setCurrentMemberAnswers(allAnswers[currentMemberIndex] || {});
    updateProgress();
  }, [currentMemberIndex, allAnswers, updateProgress]);

  const handleAnswerChange = (questionId, value) => {
    const updatedAnswers = { ...currentMemberAnswers, [questionId]: value };
    setCurrentMemberAnswers(updatedAnswers);

    // Update the global answers array
    const newAllAnswers = [...allAnswers];
    newAllAnswers[currentMemberIndex] = updatedAnswers;
    setAllAnswers(newAllAnswers);

    updateProgress();
  };

  const isCurrentMemberComplete = () => {
    return Object.keys(currentMemberAnswers).length === questions.length;
  };

  const goToNextMember = () => {
    if (isCurrentMemberComplete()) {
      if (currentMemberIndex < members.length - 1) {
        // First scroll to top, then change the member index
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Use setTimeout to ensure the scroll happens before changing the member
        setTimeout(() => {
          setCurrentMemberIndex(currentMemberIndex + 1);
        }, 100);
      } else {
        // All members have completed the questions
        submitAllAnswers();
      }
    } else {
      alert("Please answer all questions before continuing.");
    }
  };

  const goToPreviousMember = () => {
    if (currentMemberIndex > 0) {
      // First scroll to top, then change the member index
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Use setTimeout to ensure the scroll happens before changing the member
      setTimeout(() => {
        setCurrentMemberIndex(currentMemberIndex - 1);
      }, 100);
    }
  };

  const submitAllAnswers = () => {
    // Scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Use setTimeout to ensure the scroll happens before navigation
    setTimeout(() => {
      navigate("/results", {
        state: {
          teamMembers: members,
          allAnswers: allAnswers
        }
      });
    }, 100);
  };

  // Handle potential case where we don't have any team members
  if (members.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#3ECF8E]">No Team Members Found</h1>
        <p className="text-lg mb-8 text-center text-gray-300">
          Please go back and enter your team information.
        </p>
        <Link
          to="/TeamSizePage"
          className="bg-[#3ECF8E] hover:bg-[#3ECF8E]/90 text-black font-bold py-3 px-6 rounded-full"
        >
          Back to Team Setup
        </Link>
      </div>
    );
  }

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
      <div className={`w-full max-w-2xl mx-auto z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3ECF8E] to-teal-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Header with current member name */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[#3ECF8E]/20 border border-[#3ECF8E]/30 flex items-center justify-center mr-3">
            <User className="text-[#3ECF8E] w-5 h-5" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ECF8E] to-teal-400">
            {members[currentMemberIndex] || "Team Member"}
          </h1>
        </div>

        <p className="text-lg mb-8 text-center text-gray-300">
          Answer the following questions to find the ideal role
        </p>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {questions.map((question) => (
            <div
              key={question.id}
              className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transition-all duration-300`}
            >
              <h3 className="text-xl font-medium mb-4">{question.text}</h3>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      currentMemberAnswers[question.id] === option.value
                        ? 'bg-[#3ECF8E]/20 border border-[#3ECF8E]/30'
                        : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      value={option.value}
                      checked={currentMemberAnswers[question.id] === option.value}
                      onChange={() => handleAnswerChange(question.id, option.value)}
                      className="sr-only" // Hide default radio but keep functionality
                    />
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      currentMemberAnswers[question.id] === option.value
                        ? 'bg-[#3ECF8E] text-black'
                        : 'bg-gray-700'
                    }`}>
                      {currentMemberAnswers[question.id] === option.value && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4">
          <Button
            onClick={goToPreviousMember}
            disabled={currentMemberIndex === 0}
            className={`px-6 py-3 rounded-full border border-gray-700 ${
              currentMemberIndex === 0
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <div className="inline-block relative group flex-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3ECF8E] to-teal-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <Button
              onClick={goToNextMember}
              className="relative w-full bg-[#3ECF8E] hover:bg-[#3ECF8E]/90 text-[#121212] font-bold py-3 rounded-full transition-all group-hover:translate-y-0.5"
            >
              <span className="flex items-center justify-center">
                {currentMemberIndex === members.length - 1 ? (
                  <>
                    Submit All Answers
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    Next: {members[currentMemberIndex + 1]}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>

        {/* Team member indicators */}
        <div className="flex justify-center mt-8 space-x-1 items-center">
          {members.map((name, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  index === currentMemberIndex
                    ? 'bg-[#3ECF8E]'
                    : Object.keys(allAnswers[index] || {}).length === questions.length
                      ? 'bg-gray-400'
                      : 'bg-gray-700'
                }`}
              ></div>
              {/* Show name on hover */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 bg-gray-800 rounded text-xs">
                {name}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation hint */}
        <div className="mt-8 text-center">
          <Link to="/TeamSizePage" className="text-sm text-gray-400 hover:text-[#3ECF8E] transition-colors">
            ← Back to Team Setup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;