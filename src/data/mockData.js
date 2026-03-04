export const platformSummary = {
  totalFunds: 126540000,
  totalCandidates: 48,
  flaggedAnomalies: 17,
  transparencyIndex: 74,
};

export const donationsOverTimeData = [
  { month: 'Jan', amount: 10200000 },
  { month: 'Feb', amount: 13500000 },
  { month: 'Mar', amount: 11800000 },
  { month: 'Apr', amount: 15400000 },
  { month: 'May', amount: 16900000 },
  { month: 'Jun', amount: 20500000 },
  { month: 'Jul', amount: 23000000 },
];

export const donationBreakdownData = [
  { name: 'Individual', value: 56 },
  { name: 'Corporate', value: 29 },
  { name: 'Anonymous', value: 15 },
];

export const partyComparisonData = [
  { party: 'ODM', funds: 36200000 },
  { party: 'UDA', funds: 41800000 },
  { party: 'Wiper', funds: 17100000 },
  { party: 'Jubilee', funds: 12900000 },
];

export const dashboardAnomalies = [
  { candidate: 'David Mwangi', type: 'Late-cycle spike', severity: 'high', date: '2026-02-14' },
  { candidate: 'Grace Achieng', type: 'Repeated donor cluster', severity: 'medium', date: '2026-02-08' },
  { candidate: 'Samuel Kiprono', type: 'Below-threshold structuring', severity: 'high', date: '2026-02-02' },
  { candidate: 'Lilian Njeri', type: 'Large donation threshold', severity: 'medium', date: '2026-01-29' },
];

export const candidatesData = [
  { id: 'david-mwangi', name: 'David Mwangi', party: 'UDA', totalFunds: 18400000, riskScore: 82, riskLevel: 'high' },
  { id: 'grace-achieng', name: 'Grace Achieng', party: 'ODM', totalFunds: 15200000, riskScore: 61, riskLevel: 'medium' },
  { id: 'samuel-kiprono', name: 'Samuel Kiprono', party: 'Wiper', totalFunds: 9800000, riskScore: 78, riskLevel: 'high' },
  { id: 'lilian-njeri', name: 'Lilian Njeri', party: 'Jubilee', totalFunds: 8700000, riskScore: 45, riskLevel: 'medium' },
  { id: 'peter-odhiambo', name: 'Peter Odhiambo', party: 'ODM', totalFunds: 11300000, riskScore: 28, riskLevel: 'low' },
  { id: 'mary-wanjiku', name: 'Mary Wanjiku', party: 'UDA', totalFunds: 12100000, riskScore: 33, riskLevel: 'low' },
];

export const candidateProfileData = {
  'david-mwangi': {
    name: 'David Mwangi',
    party: 'UDA',
    riskLevel: 'high',
    stats: {
      totalRaised: 18400000,
      donorCount: 241,
      largestDonation: 2500000,
      anonymousPercent: 21,
    },
    timeline: [
      { month: 'Jan', amount: 1400000 },
      { month: 'Feb', amount: 1900000 },
      { month: 'Mar', amount: 1700000 },
      { month: 'Apr', amount: 2450000 },
      { month: 'May', amount: 2600000 },
      { month: 'Jun', amount: 3650000 },
      { month: 'Jul', amount: 4700000 },
    ],
    sourceBreakdown: [
      { name: 'Individual', value: 49 },
      { name: 'Corporate', value: 30 },
      { name: 'Anonymous', value: 21 },
    ],
    topDonors: [
      { donor: 'Mirema Holdings Ltd', type: 'Corporate', amount: 2500000 },
      { donor: 'Joseph K. Maina', type: 'Individual', amount: 1300000 },
      { donor: 'Highland Logistics', type: 'Corporate', amount: 1200000 },
      { donor: 'Mercury East Africa', type: 'Corporate', amount: 1050000 },
      { donor: 'Janet Mutheu', type: 'Individual', amount: 980000 },
    ],
    anomalies: [
      { type: 'Late-cycle spike', date: '2026-02-14', severity: 'high' },
      { type: 'Repeated donor cluster', date: '2026-02-10', severity: 'medium' },
      { type: 'Below-threshold structuring', date: '2026-01-27', severity: 'high' },
    ],
  },
  'grace-achieng': {
    name: 'Grace Achieng',
    party: 'ODM',
    riskLevel: 'medium',
    stats: {
      totalRaised: 15200000,
      donorCount: 212,
      largestDonation: 1800000,
      anonymousPercent: 14,
    },
    timeline: [
      { month: 'Jan', amount: 1100000 },
      { month: 'Feb', amount: 1550000 },
      { month: 'Mar', amount: 1900000 },
      { month: 'Apr', amount: 2050000 },
      { month: 'May', amount: 2400000 },
      { month: 'Jun', amount: 2800000 },
      { month: 'Jul', amount: 3400000 },
    ],
    sourceBreakdown: [
      { name: 'Individual', value: 62 },
      { name: 'Corporate', value: 24 },
      { name: 'Anonymous', value: 14 },
    ],
    topDonors: [
      { donor: 'Eastland Trust', type: 'Corporate', amount: 1800000 },
      { donor: 'Agnes Otieno', type: 'Individual', amount: 960000 },
      { donor: 'Mombasa Port Group', type: 'Corporate', amount: 900000 },
      { donor: 'Oliver Oluoch', type: 'Individual', amount: 780000 },
      { donor: 'Maji Works Ltd', type: 'Corporate', amount: 740000 },
    ],
    anomalies: [
      { type: 'Repeated donor cluster', date: '2026-02-08', severity: 'medium' },
      { type: 'Large donation threshold', date: '2026-01-20', severity: 'medium' },
    ],
  },
};

export const partiesData = [
  {
    id: 'odm',
    name: 'ODM',
    totalFunds: 36200000,
    averageRiskScore: 57,
    anonymousPercent: 14,
    candidateCount: 13,
    topCandidates: [
      { name: 'Grace Achieng', funds: 15200000, riskScore: 61 },
      { name: 'Peter Odhiambo', funds: 11300000, riskScore: 28 },
      { name: 'Anne Mutiso', funds: 9700000, riskScore: 52 },
    ],
  },
  {
    id: 'uda',
    name: 'UDA',
    totalFunds: 41800000,
    averageRiskScore: 62,
    anonymousPercent: 18,
    candidateCount: 15,
    topCandidates: [
      { name: 'David Mwangi', funds: 18400000, riskScore: 82 },
      { name: 'Mary Wanjiku', funds: 12100000, riskScore: 33 },
      { name: 'John Kimani', funds: 11300000, riskScore: 57 },
    ],
  },
  {
    id: 'wiper',
    name: 'Wiper',
    totalFunds: 17100000,
    averageRiskScore: 59,
    anonymousPercent: 12,
    candidateCount: 9,
    topCandidates: [
      { name: 'Samuel Kiprono', funds: 9800000, riskScore: 78 },
      { name: 'Harriet Naliaka', funds: 4200000, riskScore: 37 },
      { name: 'Ben Muthama', funds: 3100000, riskScore: 49 },
    ],
  },
  {
    id: 'jubilee',
    name: 'Jubilee',
    totalFunds: 12900000,
    averageRiskScore: 46,
    anonymousPercent: 10,
    candidateCount: 7,
    topCandidates: [
      { name: 'Lilian Njeri', funds: 8700000, riskScore: 45 },
      { name: 'Kiptoo Kamau', funds: 2500000, riskScore: 51 },
      { name: 'Pauline Kerubo', funds: 1700000, riskScore: 32 },
    ],
  },
];

export const partyComparisonByCandidate = {
  odm: [
    { name: 'Grace Achieng', funds: 15200000 },
    { name: 'Peter Odhiambo', funds: 11300000 },
    { name: 'Anne Mutiso', funds: 9700000 },
  ],
  uda: [
    { name: 'David Mwangi', funds: 18400000 },
    { name: 'Mary Wanjiku', funds: 12100000 },
    { name: 'John Kimani', funds: 11300000 },
  ],
  wiper: [
    { name: 'Samuel Kiprono', funds: 9800000 },
    { name: 'Harriet Naliaka', funds: 4200000 },
    { name: 'Ben Muthama', funds: 3100000 },
  ],
  jubilee: [
    { name: 'Lilian Njeri', funds: 8700000 },
    { name: 'Kiptoo Kamau', funds: 2500000 },
    { name: 'Pauline Kerubo', funds: 1700000 },
  ],
};

export const alertsData = [
  {
    candidate: 'David Mwangi',
    type: 'Late-cycle spike',
    severity: 'high',
    dateDetected: '2026-02-14',
    status: 'Under Review',
  },
  {
    candidate: 'Samuel Kiprono',
    type: 'Below-threshold structuring',
    severity: 'high',
    dateDetected: '2026-02-02',
    status: 'Confirmed',
  },
  {
    candidate: 'Grace Achieng',
    type: 'Repeated donor cluster',
    severity: 'medium',
    dateDetected: '2026-02-08',
    status: 'Under Review',
  },
  {
    candidate: 'Lilian Njeri',
    type: 'Large donation threshold',
    severity: 'medium',
    dateDetected: '2026-01-29',
    status: 'Cleared',
  },
];

export const dataFreshness = {
  lastUpdated: '2026-03-01',
  reportingCycle: 'Q1 2026',
  sourceNote: 'Mock prototype records representing candidate and party disclosures.',
};

export const donationRecords = [
  { id: 'don-001', candidateId: 'david-mwangi', candidate: 'David Mwangi', party: 'UDA', date: '2026-01-06', month: 'Jan', amount: 620000, source: 'Individual', donor: 'Peter K. Mbugua' },
  { id: 'don-002', candidateId: 'david-mwangi', candidate: 'David Mwangi', party: 'UDA', date: '2026-02-19', month: 'Feb', amount: 1250000, source: 'Corporate', donor: 'Highland Logistics' },
  { id: 'don-003', candidateId: 'grace-achieng', candidate: 'Grace Achieng', party: 'ODM', date: '2026-01-14', month: 'Jan', amount: 840000, source: 'Individual', donor: 'Agnes Otieno' },
  { id: 'don-004', candidateId: 'grace-achieng', candidate: 'Grace Achieng', party: 'ODM', date: '2026-03-03', month: 'Mar', amount: 1800000, source: 'Corporate', donor: 'Eastland Trust' },
  { id: 'don-005', candidateId: 'samuel-kiprono', candidate: 'Samuel Kiprono', party: 'Wiper', date: '2026-02-08', month: 'Feb', amount: 490000, source: 'Anonymous', donor: 'Unattributed' },
  { id: 'don-006', candidateId: 'samuel-kiprono', candidate: 'Samuel Kiprono', party: 'Wiper', date: '2026-02-27', month: 'Feb', amount: 510000, source: 'Anonymous', donor: 'Unattributed' },
  { id: 'don-007', candidateId: 'lilian-njeri', candidate: 'Lilian Njeri', party: 'Jubilee', date: '2026-01-29', month: 'Jan', amount: 1200000, source: 'Corporate', donor: 'Mavuno Capital Ltd' },
  { id: 'don-008', candidateId: 'mary-wanjiku', candidate: 'Mary Wanjiku', party: 'UDA', date: '2026-03-05', month: 'Mar', amount: 450000, source: 'Individual', donor: 'Elias Karanja' },
  { id: 'don-009', candidateId: 'peter-odhiambo', candidate: 'Peter Odhiambo', party: 'ODM', date: '2026-03-16', month: 'Mar', amount: 320000, source: 'Individual', donor: 'Joan A. Oketch' },
  { id: 'don-010', candidateId: 'david-mwangi', candidate: 'David Mwangi', party: 'UDA', date: '2026-03-21', month: 'Mar', amount: 2300000, source: 'Corporate', donor: 'Mercury East Africa' },
  { id: 'don-011', candidateId: 'grace-achieng', candidate: 'Grace Achieng', party: 'ODM', date: '2026-03-24', month: 'Mar', amount: 580000, source: 'Anonymous', donor: 'Unattributed' },
  { id: 'don-012', candidateId: 'lilian-njeri', candidate: 'Lilian Njeri', party: 'Jubilee', date: '2026-03-28', month: 'Mar', amount: 760000, source: 'Corporate', donor: 'Rafiki Holdings' }
];

export const aiDetectorRules = [
  { id: 'r1', name: 'Large donation threshold', weight: 0.3, description: 'Flags single donations exceeding expected campaign profile.' },
  { id: 'r2', name: 'Repeated donor pattern', weight: 0.25, description: 'Checks frequency and concentration of repeat contributions.' },
  { id: 'r3', name: 'Late-cycle spike', weight: 0.25, description: 'Detects abrupt donation surges close to filing deadlines.' },
  { id: 'r4', name: 'Donor clustering', weight: 0.2, description: 'Analyzes linked entities donating in coordinated windows.' }
];

export const aiDetectorFindings = [
  {
    candidate: 'David Mwangi',
    party: 'UDA',
    triggeredRules: ['Large donation threshold', 'Late-cycle spike', 'Donor clustering'],
    confidence: 0.91,
    severity: 'high',
    recommendation: 'Escalate to compliance committee for source-of-funds verification.'
  },
  {
    candidate: 'Samuel Kiprono',
    party: 'Wiper',
    triggeredRules: ['Repeated donor pattern', 'Donor clustering'],
    confidence: 0.84,
    severity: 'high',
    recommendation: 'Request donor identity reconciliation and beneficial ownership checks.'
  },
  {
    candidate: 'Grace Achieng',
    party: 'ODM',
    triggeredRules: ['Repeated donor pattern'],
    confidence: 0.67,
    severity: 'medium',
    recommendation: 'Monitor subsequent cycles for repeat concentration growth.'
  },
  {
    candidate: 'Lilian Njeri',
    party: 'Jubilee',
    triggeredRules: ['Large donation threshold'],
    confidence: 0.58,
    severity: 'medium',
    recommendation: 'Perform targeted audit on disclosed high-value transactions.'
  }
];

export const auditTrailBlocks = [
  {
    block: 1021,
    timestamp: '2026-03-01 08:12 EAT',
    actor: 'IEC Data Officer',
    action: 'Created disclosure record',
    entity: 'David Mwangi filing',
    previousHash: '0000000000000000',
    hash: 'A93F0178D311E6C4'
  },
  {
    block: 1022,
    timestamp: '2026-03-01 10:05 EAT',
    actor: 'Compliance Analyst',
    action: 'Flagged late-cycle spike',
    entity: 'Case ALR-2026-014',
    previousHash: 'A93F0178D311E6C4',
    hash: 'BC52109A7FD92E31'
  },
  {
    block: 1023,
    timestamp: '2026-03-02 09:41 EAT',
    actor: 'Party Auditor',
    action: 'Submitted supporting documents',
    entity: 'UDA record correction',
    previousHash: 'BC52109A7FD92E31',
    hash: '4DEAA76E3912FB84'
  },
  {
    block: 1024,
    timestamp: '2026-03-03 14:18 EAT',
    actor: 'UWAZI-EYE System',
    action: 'Published public update',
    entity: 'Transparency dataset v1.4',
    previousHash: '4DEAA76E3912FB84',
    hash: 'FD81A60CB75E11A9'
  }
];
