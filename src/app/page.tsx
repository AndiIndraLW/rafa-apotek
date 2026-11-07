'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import WhyVerdant from '@/components/WhyVerdant';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import AssessmentModal from '@/components/AssessmentModal';
import VideoModal from '@/components/VideoModal';

export default function Home() {
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0e2334] text-slate-100 flex flex-col selection:bg-[#5beba6] selection:text-[#081822]">
      {/* Hero Container with Navbar and Social Proof */}
      <div className="bg-[#0e2334] relative">
        <Navbar onOpenAssessment={() => setAssessmentOpen(true)} />
        <Hero
          onOpenAssessment={() => setAssessmentOpen(true)}
          onOpenVideo={() => setVideoOpen(true)}
        />
        <SocialProof />
      </div>

      {/* Our Services Section */}
      <Services onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why Verdant Section */}
      <WhyVerdant />

      {/* Ready When You Are CTA Banner */}
      <CtaBanner onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </main>
  );
}
