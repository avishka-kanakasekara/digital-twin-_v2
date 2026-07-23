export const mockTopIdeas = [
  {
    id: 1,
    title: 'LLM-Assisted Code Reviews',
    authorInitials: 'JD',
    authorBg: 'from-success to-primary',
    description: 'Integrate an LLM agent into our CI/CD pipeline to automatically flag security issues...',
    impactScore: 94,
    feasibility: 'High',
    status: 'In Review'
  },
  {
    id: 2,
    title: 'Unified Customer Data Layer',
    authorInitials: 'AM',
    authorBg: 'from-info to-tertiary',
    description: 'Create a single GraphQL federation layer for all legacy CRM endpoints...',
    impactScore: 88,
    feasibility: 'Medium',
    status: 'Approved',
    patentPending: true
  }
];

export const mockCommunities = [
  {
    id: 1,
    name: 'Data Science Guild',
    members: 142,
    joined: false,
    icon: 'TrendingUp',
    bgClass: 'bg-info/10 text-info'
  },
  {
    id: 2,
    name: 'Microservices Architecture',
    members: 89,
    joined: true,
    icon: 'Share2',
    bgClass: 'bg-primary/10 text-primary'
  }
];
