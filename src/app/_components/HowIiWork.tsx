export default function HowItWorks() {
  return (

    <>
      <section id="how-it-works" className="relative z-10 py-20 px-5 sm:px-8 border-t border-slate-200 dark:border-white/[0.05]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
                The process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-6">
                Simple by design
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-10">
                We removed everything that slows down creativity. No lengthy onboarding,
                no paywalls, no gatekeeping. Just post, connect, and build.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 text-sm cursor-pointer">
                Start posting for free
              </button>
            </div>

            {/* Right: steps */}
            <div className="flex flex-col gap-0">
              {[
                {
                  step: "01",
                  title: "Post your idea or problem",
                  desc: "Write what's on your mind — a concept you're excited about, or a real problem you've faced.",
                },
                {
                  step: "02",
                  title: "Get community feedback",
                  desc: "Others vote, comment, and suggest improvements. The best ideas rise naturally.",
                },
                {
                  step: "03",
                  title: "Find collaborators",
                  desc: "Connect with people who have the skills and drive to work on what you're building.",
                },
                {
                  step: "04",
                  title: "Ship something real",
                  desc: "Use BHAC to track progress and share milestones as your project comes to life.",
                },
              ].map(({ step, title, desc }, i, arr) => (
                <div key={step} className="flex gap-5">
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-indigo-500 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 dark:bg-indigo-500/40 mt-2 mb-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
                    <p className="text-sm text-slate-500 dark:text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
