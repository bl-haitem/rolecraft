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
      text: "When you start a new project, what is the first thing that grabs your attention and you begin with?",
      options: [
        { value: "TeamLeader", text: "Defining the final goal and planning the upcoming phases" },
        { value: "Researcher", text: "Understanding the idea clearly, then researching supporting information" },
        { value: "Designer", text: "Imagining how the final product or app will visually look" },
        { value: "Developer", text: "Opening the code editor and starting to implement the idea" },
      ],
    },
    {
      id: 2,
      text: "How do you react when an unexpected issue appears during work?",
      options: [
        { value: "ProblemSolver", text: "I calmly analyze the root cause and try multiple logical solutions" },
        { value: "Tester", text: "I immediately begin testing different scenarios to locate the issue" },
        { value: "TeamLeader", text: "I talk with the team and delegate tasks to find a quick joint solution" },
        { value: "Researcher", text: "I search through technical sites and resources for similar solutions" },
      ],
    },
    {
      id: 3,
      text: "When working in a team, what role do you naturally take on even without being asked?",
      options: [
        { value: "TeamLeader", text: "Organizing the members and ensuring everyone is progressing" },
        { value: "Pitcher", text: "Explaining the idea to others and trying to persuade them" },
        { value: "Designer", text: "Focusing on the user experience and designing an attractive interface" },
        { value: "Developer", text: "Accurately and efficiently working on my assigned coding tasks" },
      ],
    },
    {
      id: 4,
      text: "How do you prefer to handle a new idea?",
      options: [
        { value: "Pitcher", text: "Present it to others in a compelling and inspiring way" },
        { value: "Researcher", text: "Start gathering extensive information from various sources" },
        { value: "ProblemSolver", text: "Think of how to turn it into a practical and useful application" },
        { value: "Designer", text: "Visualize how it would look and attract the user" },
      ],
    },
    {
      id: 5,
      text: "What excites you the most during the project work?",
      options: [
        { value: "TeamLeader", text: "Seeing the team work harmoniously and achieving goals" },
        { value: "Developer", text: "Tackling complex code challenges and implementing new tech solutions" },
        { value: "Pitcher", text: "Creating unique ways to present the idea to judges" },
        { value: "Tester", text: "Finding and fixing precise bugs and issues" },
      ],
    },
    {
      id: 6,
      text: "How do you act under pressure or tight deadlines?",
      options: [
        { value: "TeamLeader", text: "I stay calm and quickly divide the tasks efficiently" },
        { value: "Developer", text: "I focus on completing what's needed as fast as possible" },
        { value: "ProblemSolver", text: "I look for the shortest path to a practical solution" },
        { value: "Pitcher", text: "I adjust the pitch or design to fit the limited time" },
      ],
    },
    {
      id: 7,
      text: "What gives you a sense of success after finishing a project?",
      options: [
        { value: "Tester", text: "Having a bug-free, high-quality final product" },
        { value: "TeamLeader", text: "That I motivated and led the team towards success" },
        { value: "Pitcher", text: "That our idea impressed the audience during the pitch" },
        { value: "Researcher", text: "That I learned a new technique or skill during the process" },
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
