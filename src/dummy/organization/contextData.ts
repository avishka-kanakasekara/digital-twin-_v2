export const mockLocations = ['Kegalle Branch', 'Colombo HQ', 'Kandy', 'Galle', 'Kurunegala'];

export const mockBusinessUnits = [
  { name: 'Core Product', head: 'Kasun Bandara', headcount: 150 },
  { name: 'Enterprise Solutions', head: 'Nuwan Perera', headcount: 120 },
  { name: 'Emerging Tech', head: 'Sanduni Silva', headcount: 50 },
  { name: 'Regional Operations', head: 'Lahiru Kumara', headcount: 128 },
];

export const mockOKRs = [
  { 
    id: 1, 
    title: 'Achieve Market Leadership in AI Solutions', 
    owner: 'Product Team', 
    progress: 75,
    status: 'on-track',
    initiatives: ['Launch GenAI Copilot', 'Secure 5 Enterprise deals']
  },
  { 
    id: 2, 
    title: 'Expand into Regional Market', 
    owner: 'GTM Team', 
    progress: 45,
    status: 'at-risk',
    initiatives: ['Open Kandy office', 'Localize product for SL']
  },
  { 
    id: 3, 
    title: 'Achieve Carbon Neutrality', 
    owner: 'Operations', 
    progress: 90,
    status: 'on-track',
    initiatives: ['Transition to renewable energy', 'Implement green cloud architecture']
  }
];

export const mockAIReadiness = {
  overallScore: 78,
  literacyScore: 72,
  adoptionScore: 81,
  automationOpportunities: [
    { role: 'Data Entry Specialist', potential: 92, department: 'Finance' },
    { role: 'Customer Support Tier 1', potential: 85, department: 'Support' },
    { role: 'HR Coordinator', potential: 65, department: 'HR' },
  ],
  deptProjects: [
    { dept: 'Engineering', count: 12 },
    { dept: 'Marketing', count: 5 },
    { dept: 'Sales', count: 3 },
  ]
};

export const mockCapabilities = [
  { name: 'Predictive Analytics', type: 'Digital', maturity: 4, gap: 1 },
  { name: 'Omnichannel Routing', type: 'Digital', maturity: 3, gap: 2 },
  { name: 'Agile Delivery', type: 'Business', maturity: 4, gap: 0 },
  { name: 'Talent Acquisition', type: 'Business', maturity: 2, gap: 3 },
];

export const mockTransformations = [
  {
    id: 1,
    name: 'Cloud-Native Migration',
    owner: 'IT Ops',
    progress: 85,
    status: 'on-track',
    milestones: [
      { name: 'Phase 1: Lift & Shift', completed: true },
      { name: 'Phase 2: Microservices', completed: false },
    ]
  },
  {
    id: 2,
    name: 'AI Copilot Rollout',
    owner: 'Product',
    progress: 30,
    status: 'at-risk',
    milestones: [
      { name: 'Internal Alpha', completed: true },
      { name: 'Beta Launch', completed: false },
      { name: 'GA', completed: false },
    ]
  }
];
