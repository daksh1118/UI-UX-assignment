import React from 'react';
import { ArrowRight, Leaf, VolumeX, Accessibility, Users } from 'lucide-react';
import {
  ComfortPreferences,
  DEFAULT_SCORE_FACTORS,
  ScreenId,
  calculateWeightedComfortScore,
} from '../utils/calmRouteLogic';
import { RouteMapArtifact } from './WayfindingDiagrams';

interface MobileLandingProps {
  onNavigate: (screen: ScreenId) => void;
  originStation: string;
  destinationStation: string;
  comfortPrefs: ComfortPreferences;
}

export const LandingPage: React.FC<MobileLandingProps> = ({
  onNavigate,
  originStation,
  destinationStation,
  comfortPrefs,
}) => {
  const liveScore = calculateWeightedComfortScore(DEFAULT_SCORE_FACTORS, comfortPrefs);
  const strokeDashoffset = 251.2 - (251.2 * liveScore) / 100;

  return (
    <div className="flex flex-col h-full justify-between py-1">
      <div className="space-y-4">
        {/* Clean Brand Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2F523E] text-white flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-base text-[#1C2621] tracking-tight">
              CalmRoute
            </span>
          </div>
          <span className="text-xs font-medium text-[#5C6B61]">Metro Guide</span>
        </div>

        {/* Visual Hero Artifact: Radial Comfort Gauge + Minimal Title */}
        <div className="p-5 rounded-3xl bg-[#EBF3ED] border border-[#CBE0D1] flex flex-col items-center text-center">
          {/* SVG Radial Score Artifact */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-3">
            <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="#FFFFFF"
                stroke="#D5E5DA"
                strokeWidth="7"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="#2F523E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono-tabular text-[#1C2621] leading-none">
                {liveScore}
              </span>
              <span className="text-[10px] font-semibold text-[#2F523E] mt-1">
                COMFORT
              </span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-[#1C2621] leading-snug">
            Calm metro navigation
          </h1>
          <p className="text-xs text-[#4E6155] mt-1">
            Quieter routes · Verified lifts · Visual steps
          </p>
        </div>

        {/* Visual Route Schematic Artifact */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-semibold text-[#1C2621]">Best match preview</span>
            <span className="font-mono-tabular font-semibold text-[#2F523E]">31 min</span>
          </div>
          <RouteMapArtifact
            origin={originStation}
            transfer="Green Park"
            destination={destinationStation || 'Central'}
          />
        </div>

        {/* 3 Visual Sensory Pillars (Icon Artifacts, Minimal Text) */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('comfort-setup')}
            className="p-3 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex flex-col items-center text-center transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EBF3ED] text-[#2F523E] flex items-center justify-center mb-1.5">
              <VolumeX className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1C2621]">Quieter</span>
            <span className="text-[10px] text-[#5C6B61]">Low noise</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('accessibility-setup')}
            className="p-3 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex flex-col items-center text-center transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E9F0F6] text-[#2B547E] flex items-center justify-center mb-1.5">
              <Accessibility className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1C2621]">Step-free</span>
            <span className="text-[10px] text-[#5C6B61]">Lifts only</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('compare-routes')}
            className="p-3 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex flex-col items-center text-center transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FDF6E9] text-[#8C5811] flex items-center justify-center mb-1.5">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1C2621]">Low Crowd</span>
            <span className="text-[10px] text-[#5C6B61]">Spacious</span>
          </button>
        </div>
      </div>

      {/* Coordinated Onboarding & Home Flow Actions */}
      <div className="pt-3 space-y-2">
        <button
          type="button"
          onClick={() => onNavigate('comfort-setup')}
          className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <span>Start comfort setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('app-home')}
          className="w-full min-h-[40px] py-2 px-4 rounded-xl text-[#4E6155] hover:text-[#1C2621] font-semibold text-xs transition-colors"
        >
          Skip to Home
        </button>
      </div>
    </div>
  );
};
