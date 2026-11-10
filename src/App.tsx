import React, { useEffect, useState } from 'react';
import {
  ALL_SCREENS,
  AccessibilityPreferences,
  ChecklistItem,
  ComfortPreferences,
  DEFAULT_ACCESS_PREFS,
  DEFAULT_CHECKLIST,
  DEFAULT_COMFORT_PREFS,
  DEFAULT_ROUTE_FILTERS,
  DEFAULT_ROUTES,
  DEFAULT_SCORE_FACTORS,
  DEFAULT_VOICE_GUIDANCE,
  RouteFilterState,
  ScreenId,
  VoiceGuidanceState,
} from './utils/calmRouteLogic';
import { ScreenGroupA } from './components/ScreensGroupA';
import { ScreenGroupB } from './components/ScreensGroupB';
import { LandingPage } from './components/LandingPage';
import {
  Compass,
  Home as HomeIcon,
  Leaf,
  MapPin,
  Settings as SettingsIcon,
  Signal,
  Wifi,
  Battery,
} from 'lucide-react';

const GROUP_A_IDS: ScreenId[] = [
  'compare-routes',
  'comfort-setup',
  'accessibility-setup',
  'app-home',
  'comfort-score',
  'route-detail',
  'journey-preview',
  'active-journey',
  'travel-checklist',
];

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('screen')) {
        return 'app';
      }
    }
    return 'landing';
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const requested = params.get('screen') as ScreenId | null;
      if (requested && ALL_SCREENS.some((s) => s.id === requested)) {
        return requested;
      }
    }
    return 'app-home';
  });

  const [history, setHistory] = useState<ScreenId[]>(['app-home']);

  // Shared mobile application state across the coordinated flow
  const [originStation, setOriginStation] = useState('Riverside Station');
  const [destinationStation, setDestinationStation] = useState('Central Station');
  const [comfortPrefs, setComfortPrefs] = useState<ComfortPreferences>(DEFAULT_COMFORT_PREFS);
  const [accessPrefs, setAccessPrefs] = useState<AccessibilityPreferences>(DEFAULT_ACCESS_PREFS);
  const [routeFilters, setRouteFilters] = useState<RouteFilterState>(DEFAULT_ROUTE_FILTERS);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('best-match');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [previewStepIndex, setPreviewStepIndex] = useState<number>(0);
  const [selectedStationId, setSelectedStationId] = useState<string>('riverside');
  const [voiceSettings, setVoiceSettings] = useState<VoiceGuidanceState>(DEFAULT_VOICE_GUIDANCE);
  const [trustedContact, setTrustedContact] = useState<string>('');
  const [shareUntil, setShareUntil] = useState<string>('Until I arrive');
  const [announcementToast, setAnnouncementToast] = useState<string | null>(null);

  const triggerAnnouncement = (msg: string) => {
    setAnnouncementToast(msg);
  };

  useEffect(() => {
    if (!announcementToast) return;
    const timer = window.setTimeout(() => setAnnouncementToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [announcementToast]);

  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev.slice(-15), screen]);
    setCurrentScreen(screen);
    setViewMode('app');
  };

  const goBack = () => {
    if (history.length > 1) {
      const nextHistory = history.slice(0, -1);
      setHistory(nextHistory);
      setCurrentScreen(nextHistory[nextHistory.length - 1]);
    } else {
      setCurrentScreen('app-home');
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const sharedProps = {
    currentScreen,
    navigateTo,
    goBack,
    originStation,
    setOriginStation,
    destinationStation,
    setDestinationStation,
    comfortPrefs,
    setComfortPrefs,
    accessPrefs,
    setAccessPrefs,
    routeFilters,
    setRouteFilters,
    routes: DEFAULT_ROUTES,
    selectedRouteId,
    setSelectedRouteId,
    scoreFactors: DEFAULT_SCORE_FACTORS,
    checklist,
    toggleChecklistItem,
    previewStepIndex,
    setPreviewStepIndex,
    announcementToast,
    triggerAnnouncement,
  };

  const activeBottomTab =
    viewMode === 'landing'
      ? 'welcome'
      : currentScreen === 'app-home'
      ? 'home'
      : currentScreen === 'station-search' ||
        currentScreen === 'compare-routes' ||
        currentScreen === 'route-filters' ||
        currentScreen === 'route-detail' ||
        currentScreen === 'comfort-score' ||
        currentScreen === 'station-details'
      ? 'plan'
      : currentScreen === 'saved-journeys' ||
        currentScreen === 'active-journey' ||
        currentScreen === 'journey-preview' ||
        currentScreen === 'travel-checklist' ||
        currentScreen === 'disruption-alert' ||
        currentScreen === 'alternative-routes' ||
        currentScreen === 'quiet-places'
      ? 'trips'
      : 'settings';

  return (
    <div
      className={`min-h-screen w-full bg-[#E4EAE5] flex items-center justify-center sm:py-4 sm:px-4 ${
        accessPrefs.largerText ? 'text-[17px]' : 'text-base'
      }`}
    >
      {/* MOBILE DEVICE SHELL */}
      <div className="w-full max-w-[420px] h-screen sm:h-[852px] bg-[#F4F6F4] sm:rounded-[44px] sm:border-[8px] sm:border-[#1C2621] sm:shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* NATIVE MOBILE STATUS BAR */}
        <div className="bg-[#F4F6F4] px-6 pt-3 pb-1.5 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#1C2621]">
            <span className="font-mono-tabular">9:41</span>
            <div className="w-20 h-4 rounded-full bg-[#1C2621] hidden sm:block" />
            <div className="flex items-center gap-1.5 text-[#1C2621]">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* MOBILE APP VIEWPORT CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-2.5 flex flex-col justify-between">
          {announcementToast && (
            <div
              role="status"
              aria-live="polite"
              className="mb-2.5 p-2.5 rounded-xl bg-[#1C2621] text-white text-xs font-medium flex items-center justify-between shadow-sm shrink-0"
            >
              <span>{announcementToast}</span>
              <button
                type="button"
                onClick={() => setAnnouncementToast(null)}
                className="ml-2 text-[11px] underline opacity-80 hover:opacity-100"
              >
                OK
              </button>
            </div>
          )}

          {viewMode === 'landing' ? (
            <LandingPage
              onNavigate={(screen) => navigateTo(screen)}
              originStation={originStation}
              destinationStation={destinationStation}
              comfortPrefs={comfortPrefs}
            />
          ) : GROUP_A_IDS.includes(currentScreen) ? (
            <ScreenGroupA {...sharedProps} />
          ) : (
            <ScreenGroupB
              {...sharedProps}
              selectedStationId={selectedStationId}
              setSelectedStationId={setSelectedStationId}
              voiceSettings={voiceSettings}
              setVoiceSettings={setVoiceSettings}
              trustedContact={trustedContact}
              setTrustedContact={setTrustedContact}
              shareUntil={shareUntil}
              setShareUntil={setShareUntil}
            />
          )}
        </main>

        {/* PERSISTENT MOBILE BOTTOM TAB BAR */}
        <nav
          aria-label="Mobile bottom navigation"
          className="bg-white border-t border-[#E2E7E3] px-2 pt-1.5 pb-2 shrink-0"
        >
          <div className="grid grid-cols-5 gap-1">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className={`min-h-[46px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                activeBottomTab === 'welcome'
                  ? 'text-[#2F523E] font-bold bg-[#EBF3ED]/60'
                  : 'text-[#68776D] hover:text-[#1C2621]'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Welcome</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('app-home')}
              className={`min-h-[46px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                activeBottomTab === 'home'
                  ? 'text-[#2F523E] font-bold bg-[#EBF3ED]/60'
                  : 'text-[#68776D] hover:text-[#1C2621]'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('station-search')}
              className={`min-h-[46px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                activeBottomTab === 'plan'
                  ? 'text-[#2F523E] font-bold bg-[#EBF3ED]/60'
                  : 'text-[#68776D] hover:text-[#1C2621]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Plan</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('saved-journeys')}
              className={`min-h-[46px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                activeBottomTab === 'trips'
                  ? 'text-[#2F523E] font-bold bg-[#EBF3ED]/60'
                  : 'text-[#68776D] hover:text-[#1C2621]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">My trips</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('settings')}
              className={`min-h-[46px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                activeBottomTab === 'settings'
                  ? 'text-[#2F523E] font-bold bg-[#EBF3ED]/60'
                  : 'text-[#68776D] hover:text-[#1C2621]'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Settings</span>
            </button>
          </div>

          {/* Mobile Home Gesture Bar */}
          <div className="w-32 h-1 bg-[#1C2621]/20 rounded-full mx-auto mt-2" />
        </nav>
      </div>
    </div>
  );
}
