'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{
    goals: string[];
    symptoms: string[];
    timeline: string;
    email: string;
  }>({
    goals: [],
    symptoms: [],
    timeline: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
  }, [isOpen]);

  const toggleSelection = (category: 'goals' | 'symptoms', item: string) => {
    setAnswers((prev) => {
      const exists = prev[category].includes(item);
      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((i) => i !== item)
          : [...prev[category], item],
      };
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setSubmitted(false);
      setAnswers({ goals: [], symptoms: [], timeline: '', email: '' });
    }, 300);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={resetAndClose}
      className="m-auto p-0 bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm max-w-xl w-[92vw] text-slate-100 rounded-3xl outline-none border-none shadow-2xl overflow-hidden transition-all"
    >
      <div className="bg-[#0e2334] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Close assessment"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header & Step progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-2">
                <span>STEP {currentStep} OF 4</span>
                <span>{Math.round((currentStep / 4) * 100)}% COMPLETE</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5beba6] to-[#aef773] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Health Goals */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  What health outcomes are you seeking?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Select all that align with your current longevity and wellness priorities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Metabolic health & energy',
                    'Hormonal balance',
                    'Deep, restorative sleep',
                    'Cardiovascular longevity',
                    'Mental clarity & focus',
                    'Personalized pharmacy plan',
                  ].map((goal) => {
                    const isSelected = answers.goals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleSelection('goals', goal)}
                        className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#5beba6]/15 border-[#5beba6] text-white font-medium'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Current Symptoms */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  What have you been experiencing lately?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  This helps our clinical team tailor diagnostic lab work to your baseline.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Afternoon energy dips',
                    'Difficulty staying asleep',
                    'Brain fog or slow recall',
                    'Stubborn weight changes',
                    'Mood or stress fluctuations',
                    'Just looking for proactive care',
                  ].map((symptom) => {
                    const isSelected = answers.symptoms.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSelection('symptoms', symptom)}
                        className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#5beba6]/15 border-[#5beba6] text-white font-medium'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{symptom}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Desired Timeline */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  When would you like to speak with a clinician?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  We have telehealth providers licensed across 40 states available every week.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { title: 'This week', desc: 'Fast-tracked video consultation and initial lab panel' },
                    { title: 'Next 2–3 weeks', desc: 'Convenient scheduling around your routine' },
                    { title: 'Exploring options', desc: 'Review clinician matching and pharmacy pricing first' },
                  ].map((item) => {
                    const isSelected = answers.timeline === item.title;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setAnswers({ ...answers, timeline: item.title })}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#5beba6]/15 border-[#5beba6] text-white'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm text-white">{item.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Contact & Review */}
            {currentStep === 4 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  Where should we send your care summary?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Dr. Amara Osei and our clinical team will review your profile and match you with a provider.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={answers.email}
                      onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
                    🔒 <strong className="text-slate-300">HIPAA Compliant</strong>: Your personal health information is strictly confidential, encrypted at rest and in transit.
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 4 && !answers.email.includes('@')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#081822] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>{currentStep === 4 ? 'Complete assessment' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl text-white font-normal mb-3">
              Your care pathway is prepared.
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
              We&apos;ve logged your assessment. A licensed clinical coordinator from Verdant
              will email <span className="text-emerald-300 font-medium">{answers.email || 'you'}</span> with
              clinician availability and next steps within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 active:scale-95 transition-all"
            >
              Back to Verdant
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
