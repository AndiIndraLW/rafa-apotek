'use client';

import React, { useState } from 'react';
import PromoHeader from '@/components/PromoHeader';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Products from '@/components/Products';
import HowItWorks from '@/components/HowItWorks';
import WhyVerdant from '@/components/WhyVerdant';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import AssessmentModal from '@/components/AssessmentModal';

export default function Home() {
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#111C18] flex flex-col selection:bg-[#34D399] selection:text-[#0D2B24]">
      {/* 1. Header Promo Bar (1 kalimat panjang tentang promo, background terang) */}
      <PromoHeader />

      {/* 2. Hero Section dengan Menu Navigasi di Dalam Hero Card */}
      <div className="bg-[#FBF9F5] relative">
        <Hero
          onOpenAssessment={() => setAssessmentOpen(true)}
        />
        <SocialProof />
      </div>

      {/* 3. Our Products Section (12 medicines, 4-column layout) */}
      <Products onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* 4. How It Works Section */}
      <HowItWorks />

      {/* 5. Why Verdant / Kenapa Rafa Apotek Section */}
      <WhyVerdant />

      {/* 6. Ready When You Are CTA Banner */}
      <CtaBanner onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* 7. Footer */}
      <Footer />

      {/* Interactive Assessment Modal */}
      <AssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />
    </main>
  );
}
