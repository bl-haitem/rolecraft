import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Award, BarChart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('individual');
  const resultsContainerRef = useRef(null);

  // Get team members and answers from previous page
  const members = location.state?.teamMembers || [];
  const allAnswers = location.state?.allAnswers || [];

  // Define role descriptions
  const roleDescriptions = {
    TeamLeader: {
      title: "Team Leader",
      description: "You excel at organizing, delegating tasks, and ensuring the team works efficiently. Your leadership skills keep projects on track.",
      strengths: ["Organization", "Communication", "Decision-making"],
      icon: <Award className="w-6 h-6 text-yellow-400" />
    },
    Developer: {
      title: "Developer",
      description: "You have strong technical skills and enjoy building solutions. Your coding expertise is vital to turning ideas into reality.",
      strengths: ["Technical skills", "Problem-solving", "Logical thinking"],
      icon: <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 9l3 3-3 3"></path><path d="M16 9l-3 3 3 3"></path></svg>
    },
    Researcher: {
      title: "Researcher",
      description: "You gather information thoroughly before making decisions. Your analytical mindset helps the team make informed choices.",
      strengths: ["Analysis", "Attention to detail", "Critical thinking"],
      icon: <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
    },
    ProblemSolver: {
      title: "Problem Solver",
      description: "You excel at finding solutions to complex challenges. Your ability to break down problems is invaluable to the team.",
      strengths: ["Creative thinking", "Adaptability", "Persistence"],
      icon: <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
    },
    Designer: {
      title: "Designer",
      description: "You have a strong eye for aesthetics and user experience. Your creative vision enhances the project's appeal and usability.",
      strengths: ["Creativity", "Visual thinking", "User empathy"],
      icon: <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
    },
    Tester: {
      title: "Tester",
      description: "You ensure quality and identify issues before they become problems. Your attention to detail helps deliver polished results.",
      strengths: ["Quality assurance", "Systematic thinking", "Thoroughness"],
      icon: <CheckIcon className="w-6 h-6 text-teal-400" />
    },
    Pitcher: {
      title: "Pitcher",
      description: "You excel at presenting ideas and selling concepts. Your communication skills help the team gain support for projects.",
      strengths: ["Presentation", "Persuasion", "Confidence"],
      icon: <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path><path d="M12 2v2"></path><path d="M12 6v2"></path><path d="M12 10v10"></path><path d="M8 14l4 4 4-4"></path></svg>
    }
  };

  // Calculate results for each member
  const results = useMemo(() => {
    return members.map((member, index) => {
      const memberAnswers = allAnswers[index] || {};
      const roleCounts = {};

      // Count occurrences of each role in the answers
      Object.values(memberAnswers).forEach(role => {
        roleCounts[role] = (roleCounts[role] || 0) + 1;
      });

      // Find the role with the highest count
      let primaryRole = Object.keys(roleCounts).reduce((a, b) =>
        (roleCounts[a] > roleCounts[b] ? a : b),
        Object.keys(roleCounts)[0] || "TeamLeader");

      // Find secondary role (second highest)
      let secondaryRole = Object.keys(roleCounts)
        .filter(role => role !== primaryRole)
        .reduce((a, b) => (roleCounts[a] > roleCounts[b] ? a : b),
          Object.keys(roleCounts).filter(role => role !== primaryRole)[0] || "Developer");

      // Calculate role percentages for chart
      const totalAnswers = Object.keys(memberAnswers).length;
      const rolePercentages = {};

      Object.keys(roleCounts).forEach(role => {
        rolePercentages[role] = Math.round((roleCounts[role] / totalAnswers) * 100);
      });

      return {
        name: member,
        primaryRole,
        secondaryRole,
        roleCounts,
        rolePercentages
      };
    });
  }, [members, allAnswers]);

  // Calculate team composition
  const teamComposition = useMemo(() => {
    const composition = {};

    results.forEach(result => {
      composition[result.primaryRole] = (composition[result.primaryRole] || 0) + 1;
    });

    return composition;
  }, [results]);

  // Check if the team has a good balance of roles
  const teamAnalysis = useMemo(() => {
    const roleCount = Object.keys(teamComposition).length;
    const memberCount = members.length;

    if (roleCount <= 1) {
      return {
        status: "warning",
        message: "Your team lacks diversity in roles. Consider adding members with different skill sets."
      };
    } else if (roleCount >= memberCount * 0.7) {
      return {
        status: "excellent",
        message: "Your team has an excellent balance of different roles and skill sets."
      };
    } else {
      return {
        status: "good",
        message: "Your team has a good distribution of roles, but could benefit from more diversity."
      };
    }
  }, [teamComposition, members.length]);

  useEffect(() => {
    // If no data is available, redirect to team setup
    if (members.length === 0) {
      navigate("/TeamSizePage");
      return;
    }

    setIsLoaded(true);

    // Load required libraries for PDF generation
    const loadScripts = async () => {
      // Load html2canvas
      const html2canvasScript = document.createElement('script');
      html2canvasScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      html2canvasScript.async = true;
      document.body.appendChild(html2canvasScript);

      // Load jsPDF
      const jsPDFScript = document.createElement('script');
      jsPDFScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      jsPDFScript.async = true;
      document.body.appendChild(jsPDFScript);
    };

    loadScripts();

    return () => {
      // Clean up scripts if needed
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.src.includes('html2canvas') || script.src.includes('jspdf')) {
          document.body.removeChild(script);
        }
      });
    };
  }, [members.length, navigate]);

  // Function to generate and download results as PDF
  const downloadResults = () => {
    // Hide the download button temporarily for the PDF generation
    const downloadBtn = document.querySelector('.download-btn');
    const navLinks = document.querySelector('.nav-links');

    if (downloadBtn) downloadBtn.style.display = 'none';
    if (navLinks) navLinks.style.display = 'none';

    // Use html2canvas to take a screenshot of the results container
    if (window.html2canvas && window.jspdf) {
      // Apply temporary styles to optimize for PDF output
      const originalStyle = resultsContainerRef.current.style.cssText;
      resultsContainerRef.current.style.width = '800px'; // Fixed width for better quality
      resultsContainerRef.current.style.margin = '0 auto';
      resultsContainerRef.current.style.padding = '20px';

      window.html2canvas(resultsContainerRef.current, {
        scale: 2, // Reduced scale to avoid memory issues
        useCORS: true,
        logging: true, // Enable logging to debug issues
        backgroundColor: '#121212',
        allowTaint: true,
        letterRendering: false, // Disable potentially problematic settings
        foreignObjectRendering: false
      }).then(canvas => {
        // Restore original styles
        resultsContainerRef.current.style.cssText = originalStyle;

        // Create PDF using jsPDF
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Using JPEG for better compatibility
        const pdf = new window.jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        // Calculate dimensions to fit the image properly on the PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate the number of pages needed
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate scaling to fit width while maintaining aspect ratio
        const widthRatio = pdfWidth / canvasWidth;
        const heightInPdf = canvasHeight * widthRatio;

        // If the height is greater than the page height, we need multiple pages
        if (heightInPdf <= pdfHeight) {
          // Content fits on one page
          const y = (pdfHeight - heightInPdf) / 2; // Center vertically
          pdf.addImage(imgData, 'JPEG', 0, y, pdfWidth, heightInPdf);
        } else {
          // Content needs multiple pages
          let remainingHeight = canvasHeight;
          let position = 0;

          // How much of the canvas can fit on a page
          const pageHeightInCanvas = pdfHeight / widthRatio;

          while (remainingHeight > 0) {
            // Add image to page
            pdf.addImage(
              imgData,
              'JPEG',
              0,
              position < 0 ? position : 0, // Adjust position for subsequent pages
              pdfWidth,
              canvasHeight * widthRatio,
              '',
              'FAST'
            );

            remainingHeight -= pageHeightInCanvas;
            position -= pageHeightInCanvas;

            // Add new page if there's still content
            if (remainingHeight > 0) {
              pdf.addPage();
            }
          }
        }

        // Save the PDF with a timestamp to avoid browser caching issues
        pdf.save(`team-assessment-results-${Date.now()}.pdf`);

        // Restore the download button and navigation links after PDF is generated
        if (downloadBtn) downloadBtn.style.display = 'flex';
        if (navLinks) navLinks.style.display = 'flex';
      }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
        if (downloadBtn) downloadBtn.style.display = 'flex';
        if (navLinks) navLinks.style.display = 'flex';
      });

      // Set a timeout in case the PDF generation takes too long
      setTimeout(() => {
        if (downloadBtn && downloadBtn.style.display === 'none') {
          downloadBtn.style.display = 'flex';
          if (navLinks) navLinks.style.display = 'flex';
          alert('PDF generation is taking longer than expected. Please try again.');
        }
      }, 15000); // 15 seconds timeout
    } else {
      alert('PDF generation libraries are still loading. Please try again in a moment.');
      // Restore the buttons if libraries aren't loaded
      if (downloadBtn) downloadBtn.style.display = 'flex';
      if (navLinks) navLinks.style.display = 'flex';
    }
  };

  // Handle scenario where there's no data
  if (members.length === 0) {
    return null; // Will redirect in useEffect
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

      {/* Main content - This is what we'll capture in the PDF */}
      <div
        ref={resultsContainerRef}
        className={`w-full max-w-4xl mx-auto z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center mb-3">
            <BarChart className="text-[#3ECF8E] w-6 h-6 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3ECF8E] to-teal-400">
              Team Results
            </h1>
          </div>
          <p className="text-lg text-center text-gray-300 max-w-2xl">
            Based on everyone's answers, we've identified the ideal roles for each team member and analyzed your team composition.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'individual'
                  ? 'bg-[#3ECF8E] text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Individual Results
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'team'
                  ? 'bg-[#3ECF8E] text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Team Analysis
            </button>
          </div>
        </div>

        {/* Individual Results Tab */}
        {activeTab === 'individual' && (
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-[#3ECF8E]/30"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#3ECF8E]/20 border border-[#3ECF8E]/30 flex items-center justify-center mr-3">
                    <User className="text-[#3ECF8E] w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">{result.name}</h2>
                </div>

                {/* Primary Role */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-gradient-to-r from-[#3ECF8E]/20 to-teal-400/20 p-2 rounded-lg mr-3">
                      {roleDescriptions[result.primaryRole]?.icon || <Award className="w-6 h-6 text-[#3ECF8E]" />}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Primary Role</div>
                      <div className="text-lg font-medium text-white">
                        {roleDescriptions[result.primaryRole]?.title || result.primaryRole}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="bg-[#3ECF8E]/20 text-[#3ECF8E] font-medium px-3 py-1 rounded-full text-sm">
                        {result.rolePercentages[result.primaryRole] || 0}%
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm ml-12">
                    {roleDescriptions[result.primaryRole]?.description || "You bring unique skills to the team."}
                  </p>
                </div>

                {/* Secondary Role */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-800 p-2 rounded-lg mr-3">
                      {roleDescriptions[result.secondaryRole]?.icon || <Award className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Secondary Role</div>
                      <div className="text-lg font-medium text-white">
                        {roleDescriptions[result.secondaryRole]?.title || result.secondaryRole}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="bg-gray-800 text-gray-300 font-medium px-3 py-1 rounded-full text-sm">
                        {result.rolePercentages[result.secondaryRole] || 0}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <div className="text-sm text-gray-400 mb-2">Key Strengths</div>
                  <div className="flex flex-wrap gap-2">
                    {roleDescriptions[result.primaryRole]?.strengths.map((strength, i) => (
                      <span
                        key={i}
                        className="bg-[#3ECF8E]/10 text-[#3ECF8E] px-3 py-1 rounded-full text-xs"
                      >
                        {strength}
                      </span>
                    ))}
                    {roleDescriptions[result.secondaryRole]?.strengths.slice(0, 1).map((strength, i) => (
                      <span
                        key={i}
                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Analysis Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Team Composition Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Award className="text-[#3ECF8E] w-5 h-5 mr-2" />
                Team Composition
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Team Composition Chart */}
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {Object.entries(teamComposition).map(([role, count]) => (
                      <div key={role} className="flex flex-col items-center">
                        <div className="relative mb-2">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3ECF8E] to-teal-400 opacity-30 blur-md"></div>
                          <div className="w-16 h-16 relative bg-gray-900 rounded-full flex items-center justify-center">
                            {roleDescriptions[role]?.icon || <Award className="w-8 h-8 text-[#3ECF8E]" />}
                          </div>
                          <div className="absolute -top-1 -right-1 bg-[#3ECF8E] text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                            {count}
                          </div>
                        </div>
                        <div className="text-center text-sm">
                          {roleDescriptions[role]?.title || role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Strengths */}
                <div>
                  <div className={`mb-4 p-3 rounded-lg flex items-center
                    ${teamAnalysis.status === 'excellent' ? 'bg-green-500/20 text-green-300' :
                      teamAnalysis.status === 'good' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'}
                  `}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${teamAnalysis.status === 'excellent' ? 'bg-green-500/30' :
                        teamAnalysis.status === 'good' ? 'bg-blue-500/30' :
                        'bg-yellow-500/30'}
                    `}>
                      {teamAnalysis.status === 'excellent' ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <InfoIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-sm">{teamAnalysis.message}</div>
                  </div>

                  <h3 className="text-lg font-medium mb-2">Team Strengths</h3>
                  <ul className="space-y-2">
                    {Object.entries(teamComposition)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([role, count]) => (
                        <li key={role} className="flex items-center">
                          <div className="w-2 h-2 bg-[#3ECF8E] rounded-full mr-2"></div>
                          <span>Strong {roleDescriptions[role]?.title || role} presence</span>
                        </li>
                      ))}

                    {Object.keys(teamComposition).length >= 3 && (
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#3ECF8E] rounded-full mr-2"></div>
                        <span>Diverse skill distribution</span>
                      </li>
                    )}
                  </ul>

                  {/* Missing Roles */}
                  {Object.keys(roleDescriptions).length > Object.keys(teamComposition).length && (
                    <>
                      <h3 className="text-lg font-medium mt-4 mb-2">Potential Gaps</h3>
                      <ul className="space-y-2">
                        {Object.keys(roleDescriptions)
                          .filter(role => !Object.keys(teamComposition).includes(role))
                          .slice(0, 2)
                          .map(role => (
                            <li key={role} className="flex items-center">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                              <span>Missing {roleDescriptions[role]?.title || role}</span>
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Team Recommendations */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Recommendations</h2>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg flex">
                  <div className="text-[#3ECF8E] mr-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Team Structure</h3>
                    <p className="text-gray-300 text-sm">
                      {Object.keys(teamComposition).includes('TeamLeader')
                        ? "You have a strong leadership presence. Make sure to leverage this by clearly defining roles and responsibilities."
                        : "Consider designating a Team Leader to help organize tasks and keep everyone aligned."}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg flex">
                  <div className="text-[#3ECF8E] mr-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Project Planning</h3>
                    <p className="text-gray-300 text-sm">
                      {Object.keys(teamComposition).includes('Researcher') || Object.keys(teamComposition).includes('ProblemSolver')
                        ? "Your team has strong analytical skills. Start projects with a thorough planning phase to leverage these strengths."
                        : "Consider spending more time in the research and planning phase since your team might benefit from more structured approach."}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg flex">
                  <div className="text-[#3ECF8E] mr-3">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Collaboration Strategy</h3>
                    <p className="text-gray-300 text-sm">
                      Based on your team composition, we recommend a{' '}
                      {Object.keys(teamComposition).length > 3
                        ? "distributed approach where each member can focus on their strengths"
                        : "collaborative approach where members share responsibilities across different areas"}
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download button */}
        <div className="flex justify-center mt-8 download-btn">
          <Button
            onClick={downloadResults}
            className="bg-[#3ECF8E] hover:bg-[#2AB079] text-black font-medium py-2 px-6 rounded-full flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Save as PDF
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8 nav-links">
          <Link
            to="/TeamSizePage"
            className="text-gray-400 hover:text-[#3ECF8E] transition-colors"
          >
            Start New Team Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper icon components
const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default ResultsPage;