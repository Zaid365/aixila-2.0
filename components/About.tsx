
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <h2 className="text-6xl font-extrabold tracking-tighter text-black mb-6">About Us</h2>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-[10px] font-extrabold text-black uppercase tracking-widest">
                BUILT BY GEN Z FOR THE FUTURE OF SALES
              </span>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-black font-medium leading-relaxed mb-8">
              We're not your typical sales agency. We leverage <span className="text-black font-extrabold">AI-powered research</span> and modern outbound tactics to break into industries that gatekeep themselves.
            </p>
            <p className="text-lg text-black font-medium leading-relaxed mb-8">
              Healthcare CIOs, logistics VPs, manufacturing directors—they all have overflowing inboxes. We <span className="text-black font-extrabold">cut through the noise</span> with personalized, data-driven outreach.
            </p>
            <p className="text-lg text-black font-medium leading-relaxed mb-12">
              Every meeting we book has <span className="text-black font-extrabold">budget, need, and authority.</span> No tire-kickers. Just conversations that convert.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['AI Research', 'Multi-Channel', 'Account-Based', 'Data-Driven'].map(tag => (
                <span key={tag} className="px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-bold text-black shadow-sm hover:border-gray-200 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;