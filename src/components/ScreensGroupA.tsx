import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Leaf,
  CheckSquare,
  HelpCircle,
  Home as HomeIcon,
  MapPin,
  Compass,
  Settings as SettingsIcon,
  Check,
  Volume2,
} from 'lucide-react';
import {
  AccessibilityPreferences,
  ChecklistItem,
  ComfortPreferences,
  JOURNEY_PREVIEW_STEPS,
  RouteFilterState,
  RouteOption,
  ScoreFactor,
  ScreenId,
  calculateWeightedComfortScore,
  getActiveComfortChips,
  getChecklistProgress,
  getCompareRoutePreferenceSummary,
  getRoutesForFilters,
} from '../utils/calmRouteLogic';
import { WayfindingPreviewSVG, RouteMapArtifact } from './WayfindingDiagrams';

export interface SharedScreenProps {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  originStation: string;
  setOriginStation: (s: string) => void;
  destinationStation: string;
  setDestinationStation: (s: string) => void;
  comfortPrefs: ComfortPreferences;
  setComfortPrefs: React.Dispatch<React.SetStateAction<ComfortPreferences>>;
  accessPrefs: AccessibilityPreferences;
  setAccessPrefs: React.Dispatch<React.SetStateAction<AccessibilityPreferences>>;
  routeFilters: RouteFilterState;
  setRouteFilters: React.Dispatch<React.SetStateAction<RouteFilterState>>;
  routes: RouteOption[];
  selectedRouteId: string;
  setSelectedRouteId: (id: string) => void;
  scoreFactors: ScoreFactor[];
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  previewStepIndex: number;
  setPreviewStepIndex: React.Dispatch<React.SetStateAction<number>>;
  announcementToast: string | null;
  triggerAnnouncement: (msg: string) => void;
}

export const ToggleSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className="w-full min-h-[54px] px-4 py-3 bg-white rounded-xl border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#B8C6BC] transition-colors focus-visible:outline-2 focus-visible:outline-[#2F523E]"
  >
    <span className="text-[15px] font-medium text-[#1C2621]">{label}</span>
    <span
      className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center shrink-0 ${
        checked ? 'bg-[#2F523E] justify-end' : 'bg-[#D2D8D4] justify-start'
      }`}
    >
      <span className="w-5 h-5 rounded-full bg-white shadow-xs block" />
    </span>
  </button>
);

export const AppTopHeader: React.FC<{
  title: string;
  onBack: () => void;
  rightSlot?: React.ReactNode;
}> = ({ title, onBack, rightSlot }) => (
  <header className="flex items-center justify-between py-3 px-1 mb-2 border-b border-[#E8ECE8]">
    <button
      type="button"
      onClick={onBack}
      className="min-h-[44px] px-2 -ml-2 inline-flex items-center gap-1.5 text-[#1C2621] font-semibold text-base hover:text-[#2F523E] transition-colors rounded-lg"
    >
      <ChevronLeft className="w-5 h-5 text-[#4E6155]" />
      <span>{title}</span>
    </button>
    {rightSlot && <div>{rightSlot}</div>}
  </header>
);

export const BottomNavBar: React.FC<{
  activeTab: 'home' | 'plan' | 'trips' | 'settings';
  navigateTo: (screen: ScreenId) => void;
}> = ({ activeTab, navigateTo }) => (
  <nav
    aria-label="App bottom navigation"
    className="mt-4 pt-2 pb-1 border-t border-[#E4E8E3] bg-white rounded-b-2xl grid grid-cols-4 gap-1"
  >
    <button
      type="button"
      onClick={() => navigateTo('app-home')}
      className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
        activeTab === 'home' ? 'text-[#2F523E] font-semibold' : 'text-[#68776D] hover:text-[#1C2621]'
      }`}
    >
      <HomeIcon className="w-5 h-5" />
      <span className="text-[11px] mt-0.5">Home</span>
    </button>
    <button
      type="button"
      onClick={() => navigateTo('station-search')}
      className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
        activeTab === 'plan' ? 'text-[#2F523E] font-semibold' : 'text-[#68776D] hover:text-[#1C2621]'
      }`}
    >
      <Compass className="w-5 h-5" />
      <span className="text-[11px] mt-0.5">Plan</span>
    </button>
    <button
      type="button"
      onClick={() => navigateTo('saved-journeys')}
      className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
        activeTab === 'trips' ? 'text-[#2F523E] font-semibold' : 'text-[#68776D] hover:text-[#1C2621]'
      }`}
    >
      <MapPin className="w-5 h-5" />
      <span className="text-[11px] mt-0.5">My trips</span>
    </button>
    <button
      type="button"
      onClick={() => navigateTo('settings')}
      className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
        activeTab === 'settings' ? 'text-[#2F523E] font-semibold' : 'text-[#68776D] hover:text-[#1C2621]'
      }`}
    >
      <SettingsIcon className="w-5 h-5" />
      <span className="text-[11px] mt-0.5">Settings</span>
    </button>
  </nav>
);

export const ScreenGroupA: React.FC<SharedScreenProps> = (props) => {
  const {
    currentScreen,
    navigateTo,
    goBack,
    originStation,
    destinationStation,
    comfortPrefs,
    setComfortPrefs,
    accessPrefs,
    setAccessPrefs,
    routeFilters,
    routes,
    selectedRouteId,
    setSelectedRouteId,
    scoreFactors,
    checklist,
    toggleChecklistItem,
    previewStepIndex,
    setPreviewStepIndex,
    triggerAnnouncement,
  } = props;

  const dynamicScore = calculateWeightedComfortScore(scoreFactors, comfortPrefs);
  const filteredRoutes = getRoutesForFilters(routes, routeFilters);
  const selectedRoute =
    filteredRoutes.find((r) => r.id === selectedRouteId) || filteredRoutes[1];

  // SCREEN 1: Compare routes
  if (currentScreen === 'compare-routes') {
    const prefSummary = getCompareRoutePreferenceSummary(comfortPrefs);
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Compare routes" onBack={goBack} />
          <div className="mb-3">
            <h2 className="text-[15px] font-semibold text-[#1C2621]">
              {originStation} → {destinationStation || 'Central Station'}
            </h2>
            <div className="mt-2 p-3 rounded-xl bg-white border border-[#E4E8E3]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5C6B61] font-medium">Your preferences</span>
                <button
                  type="button"
                  onClick={() => navigateTo('route-filters')}
                  className="text-[#2F523E] font-semibold hover:underline px-2 py-1 -mr-2 rounded"
                >
                  Filters
                </button>
              </div>
              <p className="text-xs text-[#37453C] mt-1">{prefSummary}</p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRoutes.map((route) => {
              const isBest = route.isBestMatch;
              const displayScore = isBest ? dynamicScore : route.comfortScore;
              return (
                <div
                  key={route.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isBest
                      ? 'bg-[#F2F7F4] border-[#2F523E] shadow-xs'
                      : 'bg-white border-[#E4E8E3]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1C2621]">{route.name}</span>
                    {isBest && (
                      <span className="text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-md bg-[#2F523E] text-white">
                        BEST MATCH
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-baseline gap-2.5">
                    <span className="text-xl font-bold font-mono-tabular text-[#1C2621]">
                      {route.durationMin} min
                    </span>
                    <span className="text-xs text-[#5C6B61]">
                      {route.transfers} {route.transfers === 1 ? 'transfer' : 'transfers'}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRouteId(route.id);
                          navigateTo('comfort-score');
                        }}
                        className="font-medium text-[#2F523E] hover:underline font-mono-tabular"
                      >
                        Comfort {displayScore}/100
                      </button>
                    </div>
                    <div className="w-full h-1.5 bg-[#E2E8E4] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          displayScore >= 75
                            ? 'bg-[#2F523E]'
                            : displayScore >= 60
                            ? 'bg-[#5A7D69]'
                            : 'bg-[#C48B45]'
                        }`}
                        style={{ width: `${displayScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#3D4B42]">
                    <span className="px-2 py-0.5 rounded bg-[#EAEFEA]">{route.crowdLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="px-2 py-0.5 rounded bg-[#EAEFEA]">{route.noiseLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="px-2 py-0.5 rounded bg-[#EAEFEA]">{route.stepFreeLabel}</span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E4E8E3] flex items-center justify-between text-xs">
                    <span className="text-[#5C6B61]">Walk {route.walkMin} min</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRouteId(route.id);
                        navigateTo('route-detail');
                      }}
                      className="min-h-[36px] px-2.5 py-1 inline-flex items-center gap-1 font-semibold text-[#2F523E] hover:bg-[#E4EFE8] rounded-lg transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-[#68776D] text-center mt-4 pt-2">
          Comfort is estimated. Your experience may differ.
        </p>
      </div>
    );
  }

  // SCREEN 2: Comfort setup
  if (currentScreen === 'comfort-setup') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Comfort setup" onBack={goBack} />
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#1C2621]">What helps you travel?</h2>
            <p className="text-xs font-semibold tracking-wider text-[#5C6B61] mt-1">
              STEP 1 OF 2
            </p>
          </div>

          <div className="space-y-2.5">
            <ToggleSwitch
              label="Quieter routes"
              checked={comfortPrefs.quieterRoutes}
              onChange={() =>
                setComfortPrefs((p) => ({ ...p, quieterRoutes: !p.quieterRoutes }))
              }
            />
            <ToggleSwitch
              label="Less crowded stations"
              checked={comfortPrefs.lessCrowded}
              onChange={() =>
                setComfortPrefs((p) => ({ ...p, lessCrowded: !p.lessCrowded }))
              }
            />
            <ToggleSwitch
              label="Fewer transfers"
              checked={comfortPrefs.fewerTransfers}
              onChange={() =>
                setComfortPrefs((p) => ({ ...p, fewerTransfers: !p.fewerTransfers }))
              }
            />
            <ToggleSwitch
              label="Less walking"
              checked={comfortPrefs.lessWalking}
              onChange={() =>
                setComfortPrefs((p) => ({ ...p, lessWalking: !p.lessWalking }))
              }
            />
            <ToggleSwitch
              label="Reduced motion"
              checked={comfortPrefs.reducedMotion}
              onChange={() =>
                setComfortPrefs((p) => ({ ...p, reducedMotion: !p.reducedMotion }))
              }
            />
            <ToggleSwitch
              label="Visual instructions"
              checked={comfortPrefs.visualInstructions}
              onChange={() =>
                setComfortPrefs((p) => ({
                  ...p,
                  visualInstructions: !p.visualInstructions,
                }))
              }
            />
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => navigateTo('accessibility-setup')}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 3: Accessibility
  if (currentScreen === 'accessibility-setup') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Accessibility" onBack={goBack} />
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#1C2621]">Choose your access needs</h2>
            <p className="text-xs font-semibold tracking-wider text-[#5C6B61] mt-1">
              STEP 2 OF 2
            </p>
          </div>

          <div className="space-y-2.5">
            <ToggleSwitch
              label="Step-free required"
              checked={accessPrefs.stepFreeRequired}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, stepFreeRequired: !p.stepFreeRequired }))
              }
            />
            <ToggleSwitch
              label="Prefer lifts"
              checked={accessPrefs.preferLifts}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, preferLifts: !p.preferLifts }))
              }
            />
            <ToggleSwitch
              label="Avoid escalators"
              checked={accessPrefs.avoidEscalators}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, avoidEscalators: !p.avoidEscalators }))
              }
            />
            <ToggleSwitch
              label="Extra transfer time"
              checked={accessPrefs.extraTransferTime}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, extraTransferTime: !p.extraTransferTime }))
              }
            />
            <ToggleSwitch
              label="Larger text"
              checked={accessPrefs.largerText}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, largerText: !p.largerText }))
              }
            />
            <ToggleSwitch
              label="Voice guidance"
              checked={accessPrefs.voiceGuidance}
              onChange={() =>
                setAccessPrefs((p) => ({ ...p, voiceGuidance: !p.voiceGuidance }))
              }
            />
            <ToggleSwitch
              label="Visual notifications"
              checked={accessPrefs.visualNotifications}
              onChange={() =>
                setAccessPrefs((p) => ({
                  ...p,
                  visualNotifications: !p.visualNotifications,
                }))
              }
            />
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => {
              triggerAnnouncement('Sensory and accessibility preferences saved.');
              navigateTo('app-home');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Save preferences
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 4: Home (App Dashboard)
  if (currentScreen === 'app-home') {
    const activeChips = getActiveComfortChips(comfortPrefs);
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <header className="flex items-center justify-between py-2 mb-3">
            <h2 className="text-base font-bold text-[#1C2621]">Home</h2>
            <button
              type="button"
              onClick={() => navigateTo('comfort-setup')}
              aria-label="Sensory comfort setup"
              className="w-10 h-10 rounded-full bg-[#EBF3ED] text-[#2F523E] flex items-center justify-center hover:bg-[#DCEBE0] transition-colors"
            >
              <Leaf className="w-4 h-4" />
            </button>
          </header>

          <p className="text-xs text-[#5C6B61]">Good morning</p>
          <h1 className="text-xl font-bold text-[#1C2621] mt-0.5 mb-3">Where to today?</h1>

          {/* Search box */}
          <div className="p-4 rounded-2xl bg-white border border-[#E4E8E3] space-y-2.5">
            <button
              type="button"
              onClick={() => navigateTo('station-search')}
              className="w-full p-2.5 rounded-xl bg-[#F6F8F6] border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#2F523E] transition-colors"
            >
              <div>
                <span className="block text-[10px] font-semibold tracking-wider text-[#68776D]">
                  FROM
                </span>
                <span className="text-sm font-medium text-[#1C2621]">{originStation}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#68776D]" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('station-search')}
              className="w-full p-2.5 rounded-xl bg-[#F6F8F6] border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#2F523E] transition-colors"
            >
              <div>
                <span className="block text-[10px] font-semibold tracking-wider text-[#68776D]">
                  TO
                </span>
                <span className="text-sm font-medium text-[#5C6B61]">
                  {destinationStation || 'Search destination'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#68776D]" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('compare-routes')}
              className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Find my route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Your comfort */}
          <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#E4E8E3]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1C2621]">Your comfort</span>
              <button
                type="button"
                onClick={() => navigateTo('comfort-setup')}
                className="text-xs font-semibold text-[#2F523E] hover:underline px-2 py-0.5 -mr-2"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#2F523E]">
              {activeChips.map((chip, idx) => (
                <React.Fragment key={chip}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span className="font-medium">{chip}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Saved journeys */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1C2621]">Saved journeys</span>
              <button
                type="button"
                onClick={() => navigateTo('saved-journeys')}
                className="text-xs font-semibold text-[#2F523E] hover:underline px-2 py-0.5 -mr-2"
              >
                View all
              </button>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigateTo('route-detail')}
                className="w-full p-3 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#2F523E] transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1C2621]">Home → Central Station</p>
                  <p className="text-xs text-[#5C6B61] mt-0.5">31 min · 1 transfer</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#68776D]" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('route-detail')}
                className="w-full p-3 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#2F523E] transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1C2621]">College → City Centre</p>
                  <p className="text-xs text-[#5C6B61] mt-0.5">28 min · 2 transfers</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#68776D]" />
              </button>
            </div>
          </div>

          {/* Quick action buttons: Checklist & Station help */}
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => navigateTo('travel-checklist')}
              className="min-h-[44px] py-2.5 px-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] text-xs font-semibold text-[#1C2621] flex items-center justify-center gap-2 transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-[#2F523E]" />
              <span>Checklist</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('quiet-places')}
              className="min-h-[44px] py-2.5 px-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] text-xs font-semibold text-[#1C2621] flex items-center justify-center gap-2 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#2F523E]" />
              <span>Station help</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 5: Comfort score
  if (currentScreen === 'comfort-score') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Comfort score" onBack={goBack} />

          {/* Score hero card */}
          <div className="p-4 rounded-2xl bg-[#EBF3ED] border border-[#CBE0D1] flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#2F523E] flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-bold font-mono-tabular text-[#1C2621] leading-none">
                {dynamicScore}
              </span>
              <span className="text-[10px] font-mono-tabular text-[#5C6B61] mt-0.5">/ 100</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C2621]">Good match for you</h2>
              <p className="text-xs text-[#4E6155] mt-0.5">5 of 6 factors available</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[#1C2621] mb-2.5">Score breakdown</h3>

          <div className="space-y-2.5">
            {scoreFactors.map((factor) => (
              <div
                key={factor.id}
                className="p-3 rounded-xl bg-white border border-[#E4E8E3]"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#1C2621] mb-1.5">
                  <span>{factor.label}</span>
                  <span className="font-mono-tabular">{factor.score}/100</span>
                </div>
                <div className="w-full h-1.5 bg-[#E6ECE8] rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-[#2F523E] rounded-full"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#5C6B61]">{factor.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-[#EAEFEA] text-xs text-[#4E6155]">
          Weighted estimate; your experience may differ. Unknown data ≠ zero.
        </div>
      </div>
    );
  }

  // SCREEN 6: Route detail
  if (currentScreen === 'route-detail') {
    const journeySteps = [
      { num: 1, title: 'Walk to Platform 2', meta: '5 min', target: 'station-details' as ScreenId },
      { num: 2, title: 'Board the Blue Line', meta: '4 min wait', target: 'active-journey' as ScreenId },
      { num: 3, title: 'Ride to Green Park', meta: '4 stops', target: 'active-journey' as ScreenId },
      { num: 4, title: 'Transfer to Green Line', meta: '4 min', target: 'station-details' as ScreenId },
      { num: 5, title: 'Exit at Central Station', meta: 'Exit 2', target: 'station-details' as ScreenId },
    ];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Route detail" onBack={goBack} />

          {/* Summary card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E4E8E3] mb-3">
            <div className="text-xl font-bold font-mono-tabular text-[#1C2621]">
              {selectedRoute.durationMin} min
            </div>
            <div className="text-xs text-[#5C6B61] mt-1 flex flex-wrap items-center gap-1.5">
              <span>{selectedRoute.transfers} transfer</span>
              <span aria-hidden="true">·</span>
              <span>Walk {selectedRoute.walkMin} min</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateTo('comfort-score')}
                className="font-semibold text-[#2F523E] hover:underline font-mono-tabular"
              >
                Comfort {dynamicScore}/100
              </button>
            </div>
          </div>

          {/* Visual Route Map Artifact */}
          <div className="mb-4">
            <RouteMapArtifact
              origin={originStation}
              transfer="Green Park"
              destination={destinationStation || 'Central'}
            />
          </div>

          <h3 className="text-sm font-bold text-[#1C2621] mb-2">Journey breakdown</h3>

          <div className="space-y-2">
            {journeySteps.map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={() => navigateTo(step.target)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between text-left hover:border-[#2F523E] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#EBF3ED] text-[#2F523E] font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1C2621]">{step.title}</p>
                    <p className="text-xs text-[#5C6B61]">{step.meta}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#68776D]" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 mt-3">
          <button
            type="button"
            onClick={() => {
              setPreviewStepIndex(0);
              navigateTo('journey-preview');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Preview journey
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 7: Journey preview
  if (currentScreen === 'journey-preview') {
    const currentStep = JOURNEY_PREVIEW_STEPS[previewStepIndex] || JOURNEY_PREVIEW_STEPS[0];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Journey preview" onBack={goBack} />

          <WayfindingPreviewSVG
            type={currentStep.diagramType}
            stationName={originStation}
          />

          <div className="mt-3">
            <p className="text-xs font-semibold tracking-wider text-[#5C6B61]">
              STEP {currentStep.stepNumber} OF {currentStep.totalSteps}
            </p>
            <h2 className="text-lg font-bold text-[#1C2621] mt-0.5">{currentStep.title}</h2>
            <p className="text-xs text-[#3D4B42] mt-1 leading-relaxed">
              {currentStep.instruction}
            </p>
          </div>

          <div className="mt-3 p-3 rounded-2xl bg-[#EBF3ED] border border-[#CBE0D1]">
            <p className="text-xs font-bold text-[#1F3A2C]">{currentStep.badgeTitle}</p>
            <p className="text-[11px] text-[#4E6155] mt-0.5">{currentStep.badgeSubtitle}</p>
          </div>

          {/* Step dots selector */}
          <div className="mt-3 flex items-center gap-1.5" role="tablist" aria-label="Preview steps">
            {JOURNEY_PREVIEW_STEPS.map((s, idx) => (
              <button
                key={s.stepNumber}
                type="button"
                role="tab"
                aria-selected={idx === previewStepIndex}
                aria-label={`Step ${s.stepNumber}: ${s.title}`}
                onClick={() => setPreviewStepIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === previewStepIndex ? 'w-8 bg-[#2F523E]' : 'w-2 bg-[#CBD5CE]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              if (previewStepIndex < JOURNEY_PREVIEW_STEPS.length - 1) {
                setPreviewStepIndex((i) => i + 1);
              } else {
                navigateTo('active-journey');
              }
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            {previewStepIndex < JOURNEY_PREVIEW_STEPS.length - 1
              ? 'Next step'
              : 'Start live journey'}
          </button>

          <button
            type="button"
            onClick={() => {
              if (previewStepIndex > 0) {
                setPreviewStepIndex((i) => i - 1);
              } else {
                navigateTo('route-detail');
              }
            }}
            className="w-full min-h-[40px] py-2 text-xs font-semibold text-[#4E6155] hover:text-[#1C2621] flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous step</span>
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 8: Your journey (Live Navigation)
  if (currentScreen === 'active-journey') {
    const progressNodes = [
      { label: 'Riverside', status: 'Completed', tone: 'bg-[#E6ECE8] text-[#4E6155]' },
      { label: 'Board train', status: 'Current', tone: 'bg-[#EBF3ED] text-[#2F523E] font-bold' },
      { label: 'Green Park', status: 'Next', tone: 'bg-[#F3F5F3] text-[#5C6B61]' },
      { label: 'Central Station', status: 'Later', tone: 'bg-[#F3F5F3] text-[#68776D]' },
    ];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader
            title="Your journey"
            onBack={goBack}
            rightSlot={
              <button
                type="button"
                onClick={() => navigateTo('share-journey')}
                className="text-xs font-semibold text-[#2F523E] hover:underline px-2 py-1"
              >
                Share
              </button>
            }
          />

          {/* Current step card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E4E8E3] mb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#2F523E] text-white text-[10px] font-bold tracking-wider">
                CURRENT STEP
              </span>
              <button
                type="button"
                onClick={() => navigateTo('disruption-alert')}
                className="px-2.5 py-0.5 rounded-md bg-[#FDF3E1] border border-[#E9CFA0] text-[#8C5811] text-[11px] font-semibold hover:bg-[#FAE8C8] transition-colors"
              >
                Service update
              </button>
            </div>
            <h2 className="text-lg font-bold text-[#1C2621]">Wait for the Blue Line</h2>
            <p className="text-xs text-[#4E6155] mt-1">
              Platform 2 · Direction: Central Station
            </p>
            <p className="text-xs font-semibold text-[#2F523E] mt-1">
              Arrives in about 4 min
            </p>
          </div>

          <h3 className="text-sm font-bold text-[#1C2621] mb-2.5">Journey progress</h3>

          <div className="space-y-2">
            {progressNodes.map((node) => (
              <div
                key={node.label}
                className="p-3 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between"
              >
                <span className="text-sm font-medium text-[#1C2621]">{node.label}</span>
                <span className={`text-xs px-2.5 py-1 rounded-lg ${node.tone}`}>
                  {node.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-xl bg-[#EAEFEA] text-xs text-[#3D4B42] text-center font-medium">
            Crowd: Low estimate · Noise: Moderate
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs px-1">
            <button
              type="button"
              onClick={() => navigateTo('quiet-places')}
              className="text-[#2F523E] font-semibold hover:underline py-1"
            >
              Quiet places & help →
            </button>
            <button
              type="button"
              onClick={() => navigateTo('voice-guidance')}
              className="text-[#4A607A] font-semibold hover:underline py-1"
            >
              Audio settings →
            </button>
          </div>
        </div>

        <div className="pt-3 mt-3">
          <button
            type="button"
            onClick={() =>
              triggerAnnouncement(
                'Repeating instruction: Wait for the Blue Line on Platform 2 towards Central Station. Arrives in about 4 minutes.'
              )
            }
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#4A607A] hover:bg-[#3B4E64] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Repeat instructions</span>
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 9: Travel checklist
  const progress = getChecklistProgress(checklist);
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <AppTopHeader title="Travel checklist" onBack={goBack} />

        <div className="mb-4">
          <p className="text-xs font-semibold text-[#4E6155] mb-1.5">{progress.summaryText}</p>
          <div className="w-full h-2 bg-[#E2E8E4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2F523E] rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={item.completed}
              onClick={() => toggleChecklistItem(item.id)}
              className="w-full min-h-[52px] p-3.5 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center gap-3 text-left transition-colors"
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                  item.completed
                    ? 'bg-[#2F523E] border-[#2F523E] text-white'
                    : 'bg-white border-[#B8C4BB]'
                }`}
              >
                {item.completed && <Check className="w-3.5 h-3.5" />}
              </span>
              <span
                className={`text-sm font-medium ${
                  item.completed ? 'text-[#1C2621]' : 'text-[#3D4B42]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4">
        <button
          type="button"
          onClick={() => navigateTo('active-journey')}
          className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
        >
          Continue journey
        </button>
      </div>
    </div>
  );
};
