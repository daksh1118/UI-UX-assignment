import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import {
  STATIONS_DATA,
  ScreenId,
  VoiceGuidanceState,
} from '../utils/calmRouteLogic';
import { AppTopHeader, SharedScreenProps, ToggleSwitch } from './ScreensGroupA';
import {
  WayfindingPreviewSVG,
  QuietZoneMapArtifact,
  AudioWaveArtifact,
} from './WayfindingDiagrams';

export interface ScreensGroupBProps extends SharedScreenProps {
  selectedStationId: string;
  setSelectedStationId: (id: string) => void;
  voiceSettings: VoiceGuidanceState;
  setVoiceSettings: React.Dispatch<React.SetStateAction<VoiceGuidanceState>>;
  trustedContact: string;
  setTrustedContact: (c: string) => void;
  shareUntil: string;
  setShareUntil: (u: string) => void;
}

export const ScreenGroupB: React.FC<ScreensGroupBProps> = (props) => {
  const {
    currentScreen,
    navigateTo,
    goBack,
    originStation,
    setOriginStation,
    destinationStation,
    setDestinationStation,
    routeFilters,
    setRouteFilters,
    selectedStationId,
    setSelectedStationId,
    voiceSettings,
    setVoiceSettings,
    trustedContact,
    setTrustedContact,
    shareUntil,
    setShareUntil,
    accessPrefs,
    setAccessPrefs,
    triggerAnnouncement,
  } = props;

  const [activeSearchField, setActiveSearchField] = useState<'from' | 'to'>('to');
  const [selectedAlternative, setSelectedAlternative] = useState<'alt-a' | 'alt-b'>('alt-a');

  // SCREEN 10: Station search
  if (currentScreen === 'station-search') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Station search" onBack={goBack} />
          <h2 className="text-base font-bold text-[#1C2621] mb-3">Search for a station</h2>

          <div className="space-y-2.5 mb-5">
            <div
              onClick={() => setActiveSearchField('from')}
              className={`p-3 rounded-xl bg-white border transition-colors ${
                activeSearchField === 'from' ? 'border-[#2F523E]' : 'border-[#E4E8E3]'
              }`}
            >
              <label
                htmlFor="station-from-input"
                className="block text-[10px] font-semibold tracking-wider text-[#68776D]"
              >
                FROM
              </label>
              <input
                id="station-from-input"
                type="text"
                value={originStation}
                onFocus={() => setActiveSearchField('from')}
                onChange={(e) => setOriginStation(e.target.value)}
                className="w-full text-sm font-medium text-[#1C2621] bg-transparent focus:outline-none mt-0.5"
              />
            </div>

            <div
              onClick={() => setActiveSearchField('to')}
              className={`p-3 rounded-xl bg-white border transition-colors ${
                activeSearchField === 'to' ? 'border-[#2F523E]' : 'border-[#E4E8E3]'
              }`}
            >
              <label
                htmlFor="station-to-input"
                className="block text-[10px] font-semibold tracking-wider text-[#68776D]"
              >
                TO
              </label>
              <input
                id="station-to-input"
                type="text"
                value={destinationStation}
                onFocus={() => setActiveSearchField('to')}
                onChange={(e) => setDestinationStation(e.target.value)}
                placeholder="Central Station"
                className="w-full text-sm font-medium text-[#1C2621] bg-transparent focus:outline-none mt-0.5"
              />
            </div>
          </div>

          <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-2">
            RECENT STATIONS
          </p>

          <div className="space-y-2">
            {STATIONS_DATA.map((station) => (
              <div
                key={station.id}
                className="p-3 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between gap-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (activeSearchField === 'from') {
                      setOriginStation(station.name);
                    } else {
                      setDestinationStation(station.name);
                    }
                  }}
                  className="text-left flex-1 min-h-[36px] flex items-center"
                >
                  <span className="text-sm font-medium text-[#1C2621]">
                    {station.name} <span className="text-[#68776D]">· {station.line}</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStationId(station.id);
                    navigateTo('station-details');
                  }}
                  className="text-xs font-semibold text-[#2F523E] hover:underline px-2 py-1 rounded shrink-0"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => {
              if (!destinationStation.trim()) {
                setDestinationStation('Central Station');
              }
              navigateTo('compare-routes');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Compare routes
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 11: Route filters
  if (currentScreen === 'route-filters') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Route filters" onBack={goBack} />
          <p className="text-xs text-[#5C6B61] mb-3">Your priorities for this trip</p>

          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-1.5">
                COMFORT
              </p>
              <div className="space-y-1.5">
                <ToggleSwitch
                  label="Quieter routes"
                  checked={routeFilters.quieterRoutes}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, quieterRoutes: !f.quieterRoutes }))
                  }
                />
                <ToggleSwitch
                  label="Less crowded"
                  checked={routeFilters.lessCrowded}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, lessCrowded: !f.lessCrowded }))
                  }
                />
                <ToggleSwitch
                  label="Fewer transfers"
                  checked={routeFilters.fewerTransfers}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, fewerTransfers: !f.fewerTransfers }))
                  }
                />
                <ToggleSwitch
                  label="Less walking"
                  checked={routeFilters.lessWalking}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, lessWalking: !f.lessWalking }))
                  }
                />
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-1.5">
                ACCESSIBILITY
              </p>
              <div className="space-y-1.5">
                <ToggleSwitch
                  label="Step-free required"
                  checked={routeFilters.stepFreeRequired}
                  onChange={() =>
                    setRouteFilters((f) => ({
                      ...f,
                      stepFreeRequired: !f.stepFreeRequired,
                    }))
                  }
                />
                <ToggleSwitch
                  label="Avoid stairs"
                  checked={routeFilters.avoidStairs}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, avoidStairs: !f.avoidStairs }))
                  }
                />
                <ToggleSwitch
                  label="Lift required"
                  checked={routeFilters.liftRequired}
                  onChange={() =>
                    setRouteFilters((f) => ({ ...f, liftRequired: !f.liftRequired }))
                  }
                />
                <ToggleSwitch
                  label="Extra transfer time"
                  checked={routeFilters.extraTransferTime}
                  onChange={() =>
                    setRouteFilters((f) => ({
                      ...f,
                      extraTransferTime: !f.extraTransferTime,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-1.5">
                DATA DISPLAY
              </p>
              <div className="space-y-1.5">
                <ToggleSwitch
                  label="Verified access details"
                  checked={routeFilters.verifiedAccessDetails}
                  onChange={() =>
                    setRouteFilters((f) => ({
                      ...f,
                      verifiedAccessDetails: !f.verifiedAccessDetails,
                    }))
                  }
                />
                <ToggleSwitch
                  label="Label estimated data"
                  checked={routeFilters.labelEstimatedData}
                  onChange={() =>
                    setRouteFilters((f) => ({
                      ...f,
                      labelEstimatedData: !f.labelEstimatedData,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => {
              triggerAnnouncement('Trip filters applied to route comparison.');
              navigateTo('compare-routes');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Apply filters
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 12: Station details
  if (currentScreen === 'station-details') {
    const station =
      STATIONS_DATA.find((s) => s.id === selectedStationId) || STATIONS_DATA[0];

    const infoRows = [
      { label: 'Step-free access', value: station.stepFreeAccess },
      { label: 'Lift', value: station.liftStatus },
      { label: 'Stairs', value: station.stairsStatus },
      { label: 'Crowd', value: station.crowdEstimate },
      { label: 'Noise', value: station.noiseEstimate },
    ];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Station details" onBack={goBack} />

          <WayfindingPreviewSVG
            type="platform"
            stationName={station.name}
            label="PLATFORM / WAYFINDING IMAGE"
          />

          {/* Station selector pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {STATIONS_DATA.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStationId(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  s.id === station.id
                    ? 'bg-[#2F523E] text-white'
                    : 'bg-white border border-[#E4E8E3] text-[#4E6155] hover:border-[#2F523E]'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-bold text-[#1C2621] mt-4 mb-2.5">
            Accessibility information
          </h2>

          <div className="space-y-2">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="p-3 rounded-xl bg-white border border-[#E4E8E3] flex items-center justify-between text-xs"
              >
                <span className="font-medium text-[#4E6155]">{row.label}</span>
                <span className="font-semibold text-[#1C2621]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => navigateTo('journey-preview')}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Show station directions
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 13: Disruption alert
  if (currentScreen === 'disruption-alert') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Disruption alert" onBack={goBack} />

          {/* Warm amber alert box */}
          <div className="p-4 rounded-2xl bg-[#FDF6E9] border border-[#EBD6B3] mb-4">
            <p className="text-[10px] font-bold tracking-wider text-[#8C5811]">
              SERVICE UPDATE
            </p>
            <h2 className="text-lg font-bold text-[#1C2621] mt-1">Blue Line delay</h2>
            <p className="text-sm text-[#3D4B42] mt-1">About 8 min behind schedule.</p>
            <p className="text-[11px] text-[#6E5B3E] mt-2">
              Sample information · Updated 10:24 AM
            </p>
          </div>

          <h3 className="text-sm font-bold text-[#1C2621] mb-2">Your current route</h3>
          <button
            type="button"
            onClick={() => navigateTo('active-journey')}
            className="w-full p-3.5 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] text-left mb-4 transition-colors"
          >
            <p className="text-sm font-semibold text-[#1C2621]">Continue on Blue Line</p>
            <p className="text-xs text-[#5C6B61] mt-0.5">
              Same platform · About 8 min later
            </p>
          </button>

          <h3 className="text-sm font-bold text-[#1C2621] mb-2">Choose your next step</h3>
          <button
            type="button"
            onClick={() => navigateTo('alternative-routes')}
            className="w-full p-3.5 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] text-left transition-colors"
          >
            <p className="text-sm font-semibold text-[#1C2621]">Compare another route</p>
            <p className="text-xs text-[#5C6B61] mt-0.5">
              Different platform · Lower crowd estimate
            </p>
          </button>
        </div>

        <div className="pt-4 mt-4 space-y-2">
          <button
            type="button"
            onClick={() => navigateTo('alternative-routes')}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Compare alternatives
          </button>
          <button
            type="button"
            onClick={() => navigateTo('active-journey')}
            className="w-full min-h-[40px] py-2 text-xs font-semibold text-[#4E6155] hover:text-[#1C2621] transition-colors"
          >
            Keep my original route
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 14: Alternative routes
  if (currentScreen === 'alternative-routes') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Alternative routes" onBack={goBack} />

          <div className="p-3 rounded-xl bg-white border border-[#E4E8E3] text-xs font-semibold text-[#3D4B42] mb-3">
            ORIGINAL · Blue Line · +8 min delay
          </div>

          <div className="space-y-3">
            {/* Alternative A */}
            <button
              type="button"
              onClick={() => setSelectedAlternative('alt-a')}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedAlternative === 'alt-a'
                  ? 'bg-[#F2F7F4] border-[#2F523E]'
                  : 'bg-white border-[#E4E8E3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1C2621]">Alternative A</span>
                <span className="text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-md bg-[#2F523E] text-white">
                  BEST MATCH
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2.5">
                <span className="text-xl font-bold font-mono-tabular text-[#1C2621]">
                  33 min
                </span>
                <span className="text-xs text-[#5C6B61]">1 transfer</span>
              </div>
              <p className="text-xs font-medium text-[#2F523E] font-mono-tabular mt-1.5">
                Comfort fit 79/100
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs text-[#3D4B42]">
                <span className="px-2 py-0.5 rounded bg-[#E3EDE6] text-[#1F3A2C]">
                  Crowd Low
                </span>
                <span aria-hidden="true">·</span>
                <span className="px-2 py-0.5 rounded bg-[#E3EDE6] text-[#1F3A2C]">
                  Step-free
                </span>
              </div>
            </button>

            {/* Alternative B */}
            <button
              type="button"
              onClick={() => setSelectedAlternative('alt-b')}
              className={`w-full p-4 rounded-2xl border text-left transition-all ${
                selectedAlternative === 'alt-b'
                  ? 'bg-[#F2F7F4] border-[#2F523E]'
                  : 'bg-white border-[#E4E8E3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1C2621]">Alternative B</span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2.5">
                <span className="text-xl font-bold font-mono-tabular text-[#1C2621]">
                  35 min
                </span>
                <span className="text-xs text-[#5C6B61]">2 transfers</span>
              </div>
              <p className="text-xs font-medium text-[#5C6B61] font-mono-tabular mt-1.5">
                Comfort fit 68/100
              </p>
              <div className="mt-2.5 flex items-center gap-2 text-xs text-[#3D4B42]">
                <span className="px-2 py-0.5 rounded bg-[#EAEFEA]">Crowd Medium</span>
                <span aria-hidden="true">·</span>
                <span className="px-2 py-0.5 rounded bg-[#EAEFEA]">Unknown</span>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-4 mt-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              triggerAnnouncement(
                `Switched to ${
                  selectedAlternative === 'alt-a' ? 'Alternative A (33 min)' : 'Alternative B (35 min)'
                }.`
              );
              navigateTo('active-journey');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Choose route
          </button>
          <button
            type="button"
            onClick={() => navigateTo('active-journey')}
            className="w-full min-h-[40px] py-2 text-xs font-semibold text-[#4E6155] hover:text-[#1C2621] transition-colors"
          >
            Keep original route
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 15: Saved journeys
  if (currentScreen === 'saved-journeys') {
    const savedList = [
      {
        id: 'sj-1',
        title: 'Riverside → Central Station',
        meta: '31 min · 1 transfer',
        from: 'Riverside Station',
        to: 'Central Station',
      },
      {
        id: 'sj-2',
        title: 'College → City Centre',
        meta: '28 min · 2 transfers',
        from: 'College',
        to: 'City Centre',
      },
      {
        id: 'sj-3',
        title: 'Home → Green Park',
        meta: '22 min · 1 transfer',
        from: 'Riverside Station',
        to: 'Green Park',
      },
    ];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Saved journeys" onBack={goBack} />

          <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-2.5">
            RECENT JOURNEYS
          </p>

          <div className="space-y-2.5">
            {savedList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#E4E8E3] flex items-center justify-between"
              >
                <div>
                  <h2 className="text-sm font-semibold text-[#1C2621]">{item.title}</h2>
                  <p className="text-xs text-[#5C6B61] mt-1">{item.meta}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOriginStation(item.from);
                    setDestinationStation(item.to);
                    navigateTo('route-detail');
                  }}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#2F523E] hover:bg-[#EBF3ED] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-[#E9F0F6] border border-[#CEDCE9] text-xs text-[#2B4C6B]">
            Check service and access before travelling.
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => navigateTo('station-search')}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Plan a new journey
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 16: Quiet places & help
  if (currentScreen === 'quiet-places') {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Quiet places & help" onBack={goBack} />

          <QuietZoneMapArtifact />

          <h2 className="text-sm font-bold text-[#1C2621] mb-2">Quieter places</h2>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E4E8E3] mb-3">
            <p className="text-sm font-semibold text-[#1C2621]">Quiet waiting area</p>
            <p className="text-xs text-[#5C6B61] mt-0.5">Unverified · Sample station</p>
          </div>

          <h2 className="text-sm font-bold text-[#1C2621] mb-2">Station assistance</h2>
          <div className="space-y-2">
            <div className="p-3.5 rounded-2xl bg-white border border-[#E4E8E3]">
              <p className="text-sm font-semibold text-[#1C2621]">Staff help point</p>
              <p className="text-xs text-[#5C6B61] mt-0.5">Concourse level</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#E4E8E3]">
              <p className="text-sm font-semibold text-[#1C2621]">
                Accessible assistance desk
              </p>
              <p className="text-xs text-[#5C6B61] mt-0.5">Near main entrance</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#E4E8E3]">
              <p className="text-sm font-semibold text-[#1C2621]">Emergency information</p>
              <p className="text-xs text-[#5C6B61] mt-0.5">Use official station support</p>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-3">
          <button
            type="button"
            onClick={() => navigateTo('active-journey')}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Return to journey
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 17: Settings
  if (currentScreen === 'settings') {
    const settingRows: Array<{
      title: string;
      subtitle: string;
      onClick: () => void;
    }> = [
      {
        title: 'Sensory preferences',
        subtitle: 'Crowd, noise, reduced motion',
        onClick: () => navigateTo('comfort-setup'),
      },
      {
        title: 'Navigation access',
        subtitle: 'Step-free, stairs, lifts, transfer time',
        onClick: () => navigateTo('accessibility-setup'),
      },
      {
        title: 'Display',
        subtitle: `Text size (${accessPrefs.largerText ? 'Larger' : 'Standard'}), contrast, theme`,
        onClick: () => {
          setAccessPrefs((p) => ({ ...p, largerText: !p.largerText }));
          triggerAnnouncement(
            `Display text size set to ${!accessPrefs.largerText ? 'Larger text' : 'Standard'}.`
          );
        },
      },
      {
        title: 'Audio',
        subtitle: 'Voice guidance, speech speed, volume',
        onClick: () => navigateTo('voice-guidance'),
      },
      {
        title: 'Notifications',
        subtitle: 'Delays, route changes, platform updates',
        onClick: () => navigateTo('disruption-alert'),
      },
      {
        title: 'Privacy',
        subtitle: 'Location, journey history, sharing',
        onClick: () => navigateTo('share-journey'),
      },
    ];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Settings" onBack={goBack} />

          <div className="space-y-2.5 mt-1">
            {settingRows.map((row) => (
              <button
                key={row.title}
                type="button"
                onClick={row.onClick}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1C2621]">{row.title}</p>
                  <p className="text-xs text-[#5C6B61] mt-0.5">{row.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#68776D] shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => {
              triggerAnnouncement('All CalmRoute settings saved.');
              navigateTo('app-home');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Save settings
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 18: Share journey
  if (currentScreen === 'share-journey') {
    const shareDurationOptions = ['Until I arrive', 'For 30 minutes', 'Current step only'];

    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <AppTopHeader title="Share journey" onBack={goBack} />

          <div className="p-4 rounded-2xl bg-[#E9F0F6] border border-[#CEDCE9] mb-4">
            <h2 className="text-sm font-bold text-[#1E3A56]">You stay in control</h2>
            <p className="text-xs text-[#3C5C7C] mt-1">
              Optional. Stop sharing anytime.
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="trusted-contact-input"
              className="block text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-1.5"
            >
              TRUSTED CONTACT
            </label>
            <input
              id="trusted-contact-input"
              type="text"
              value={trustedContact}
              onChange={(e) => setTrustedContact(e.target.value)}
              placeholder="Add a trusted contact"
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#E4E8E3] text-sm text-[#1C2621] placeholder:text-[#75847A] focus:outline-2 focus:outline-[#2F523E]"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['Alex Rivera (Partner)', 'Sam Chen (Family)', 'Station Support'].map((person) => (
                <button
                  key={person}
                  type="button"
                  onClick={() => setTrustedContact(person)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#EAEFEA] text-[#2F523E] font-medium hover:bg-[#DCE7DF] transition-colors"
                >
                  {person}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wider text-[#5C6B61] mb-1.5">
              SHARE UNTIL
            </p>
            <div className="space-y-2">
              {shareDurationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setShareUntil(option)}
                  className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-colors ${
                    shareUntil === option
                      ? 'bg-[#F2F7F4] border-[#2F523E] text-[#1C2621]'
                      : 'bg-white border-[#E4E8E3] text-[#4E6155]'
                  }`}
                >
                  <span>{option}</span>
                  {shareUntil === option && (
                    <span className="text-xs font-semibold text-[#2F523E]">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4">
          <button
            type="button"
            onClick={() => {
              const contactLabel = trustedContact.trim() || 'your trusted contact';
              triggerAnnouncement(
                `Live journey link ready for ${contactLabel} (${shareUntil}).`
              );
              navigateTo('active-journey');
            }}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
          >
            Review & share
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 19: Voice guidance
  const cycleRepeat = () => {
    const order: Array<VoiceGuidanceState['repeatInstructions']> = [
      'Available',
      'Always',
      'Off',
    ];
    const next =
      order[(order.indexOf(voiceSettings.repeatInstructions) + 1) % order.length];
    setVoiceSettings((v) => ({ ...v, repeatInstructions: next }));
  };

  const cycleSpeed = () => {
    const order: Array<VoiceGuidanceState['speechSpeed']> = ['Slow', 'Normal', 'Fast'];
    const next = order[(order.indexOf(voiceSettings.speechSpeed) + 1) % order.length];
    setVoiceSettings((v) => ({ ...v, speechSpeed: next }));
  };

  const cycleVolume = () => {
    const levels = [25, 50, 75, 100];
    const next = levels[(levels.indexOf(voiceSettings.volume) + 1) % levels.length];
    setVoiceSettings((v) => ({ ...v, volume: next }));
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <AppTopHeader title="Voice guidance" onBack={goBack} />

        <AudioWaveArtifact
          active={voiceSettings.voiceGuidance}
          volume={voiceSettings.volume}
        />

        <div className="space-y-2 mt-1">
          <button
            type="button"
            onClick={() =>
              setVoiceSettings((v) => ({ ...v, voiceGuidance: !v.voiceGuidance }))
            }
            className="w-full min-h-[54px] px-4 py-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
          >
            <span className="text-sm font-medium text-[#1C2621]">Voice guidance</span>
            <span className="text-sm font-semibold text-[#4E6155]">
              {voiceSettings.voiceGuidance ? 'On' : 'Off'}
            </span>
          </button>

          <button
            type="button"
            onClick={cycleRepeat}
            className="w-full min-h-[54px] px-4 py-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
          >
            <span className="text-sm font-medium text-[#1C2621]">Repeat instructions</span>
            <span className="text-sm font-semibold text-[#4E6155]">
              {voiceSettings.repeatInstructions}
            </span>
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            className="w-full min-h-[54px] px-4 py-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
          >
            <span className="text-sm font-medium text-[#1C2621]">Speech speed</span>
            <span className="text-sm font-semibold text-[#4E6155]">
              {voiceSettings.speechSpeed}
            </span>
          </button>

          <button
            type="button"
            onClick={cycleVolume}
            className="w-full min-h-[54px] px-4 py-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
          >
            <span className="text-sm font-medium text-[#1C2621]">Volume</span>
            <span className="text-sm font-semibold font-mono-tabular text-[#4E6155]">
              {voiceSettings.volume}%
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setVoiceSettings((v) => ({ ...v, soundEffects: !v.soundEffects }))
            }
            className="w-full min-h-[54px] px-4 py-3 rounded-xl bg-white border border-[#E4E8E3] hover:border-[#2F523E] flex items-center justify-between text-left transition-colors"
          >
            <span className="text-sm font-medium text-[#1C2621]">Sound effects</span>
            <span className="text-sm font-semibold text-[#4E6155]">
              {voiceSettings.soundEffects ? 'On' : 'Off'}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-4 mt-4">
        <button
          type="button"
          onClick={() => {
            triggerAnnouncement('Voice guidance preferences saved.');
            navigateTo('settings');
          }}
          className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#2F523E] hover:bg-[#254231] text-white font-semibold text-sm transition-colors"
        >
          Save preferences
        </button>
      </div>
    </div>
  );
};
