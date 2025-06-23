
// NEPSE calculation constants
export const BROKER_COMMISSION_THRESHOLDS = {
  TIER1: 50000,
  TIER2: 500000,
  TIER3: 2000000,
  TIER4: 10000000
};

export const BROKER_COMMISSION_RATES = {
  TIER1: 0.0036, // 0.36%
  TIER2: 0.0033, // 0.33%
  TIER3: 0.0031, // 0.31%
  TIER4: 0.0027, // 0.27%
  TIER5: 0.0024  // 0.24%
};

export const SEBON_FEE_RATE = 0.00015; // 0.015%
export const DP_CHARGE = 25; // Rs. 25

export const CAPITAL_GAINS_TAX = {
  INDIVIDUAL: {
    LONG_TERM: 0.05,  // 5% for long term (≥365 days)
    SHORT_TERM: 0.075, // 7.5% for short term (<365 days)
  },
  INSTITUTIONAL: 0.10, // 10% for institutional investors
};

export const HOLDING_PERIOD_THRESHOLD = 365; // 365 days
