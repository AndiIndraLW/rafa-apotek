'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Products from '@/components/Products';
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
      {/* Sticky/Fixed Navbar across the entire page */}
      <Navbar onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* Hero Container with Social Proof */}
      <div data-theme="dark" className="bg-[#0e2334] relative">
        <Hero
          onOpenAssessment={() => setAssessmentOpen(true)}
          onOpenVideo={() => setVideoOpen(true)}
        />
        <SocialProof />
      </div>

      {/* Our Products Section (12 medicines, 4-column layout) */}
      <Products onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why Verdant / Kenapa Rafa Apotek Section */}
      <WhyVerdant />

      {/* Ready When You Are CTA Banner */}
      <CtaBanner onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Assessment & Video Modals */}
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
