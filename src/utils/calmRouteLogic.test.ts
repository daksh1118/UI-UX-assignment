import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALL_SCREENS,
  DEFAULT_CHECKLIST,
  DEFAULT_COMFORT_PREFS,
  DEFAULT_ROUTE_FILTERS,
  DEFAULT_ROUTES,
  DEFAULT_SCORE_FACTORS,
  calculateWeightedComfortScore,
  getActiveComfortChips,
  getChecklistProgress,
  getCompareRoutePreferenceSummary,
  getRoutesForFilters,
} from './calmRouteLogic';

test('ALL_SCREENS contains all 19 distinct screens from the PDF specification', () => {
  assert.equal(ALL_SCREENS.length, 19);
  const orders = ALL_SCREENS.map((s) => s.order);
  assert.deepEqual(orders, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
});

test('calculateWeightedComfortScore returns exact 83/100 for default factors and preferences', () => {
  const score = calculateWeightedComfortScore(DEFAULT_SCORE_FACTORS, DEFAULT_COMFORT_PREFS);
  assert.equal(score, 83);
});

test('calculateWeightedComfortScore adjusts dynamically when lessWalking is prioritized', () => {
  const scoreWithLessWalking = calculateWeightedComfortScore(DEFAULT_SCORE_FACTORS, {
    ...DEFAULT_COMFORT_PREFS,
    lessWalking: true,
  });
  assert.ok(scoreWithLessWalking < 83, 'Expected lower score when 65/100 walking factor has higher weight');
});

test('getChecklistProgress computes accurate completion summary text and percentage', () => {
  const progress = getChecklistProgress(DEFAULT_CHECKLIST);
  assert.equal(progress.completedCount, 3);
  assert.equal(progress.totalCount, 6);
  assert.equal(progress.percentage, 50);
  assert.equal(progress.summaryText, '3 of 6 steps completed');
});

test('getActiveComfortChips and getCompareRoutePreferenceSummary match PDF default strings', () => {
  const chips = getActiveComfortChips(DEFAULT_COMFORT_PREFS);
  assert.deepEqual(chips, ['Quieter', 'Fewer transfers', 'Reduced motion']);
  const summary = getCompareRoutePreferenceSummary(DEFAULT_COMFORT_PREFS);
  assert.equal(summary, 'Quieter routes · Fewer transfers · Reduced motion');
});

test('getRoutesForFilters preserves exact 47, 83, 71 baseline scores and penalizes non-step-free when avoidStairs is enabled', () => {
  const baseline = getRoutesForFilters(DEFAULT_ROUTES, DEFAULT_ROUTE_FILTERS);
  assert.deepEqual(
    baseline.map((r) => r.comfortScore),
    [47, 83, 71]
  );

  const stricter = getRoutesForFilters(DEFAULT_ROUTES, {
    ...DEFAULT_ROUTE_FILTERS,
    avoidStairs: true,
  });
  const fastest = stricter.find((r) => r.id === 'fastest');
  assert.ok((fastest?.comfortScore ?? 100) < 47);
});
