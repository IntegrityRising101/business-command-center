export const CATEGORIES = ['AI Projects', 'Social & Website', 'Clothing Merch']

export const STATUSES = ['Planned', 'In Progress', 'Launched/Done']

export const seedTasks = [
  {
    id: 't1',
    title: 'Generate 10 product mockups with Midjourney',
    category: 'Clothing Merch',
    status: 'Planned',
    priority: 'high',
    tool: 'Midjourney',
    dueDate: new Date().toISOString().slice(0, 10), // today
    notes: 'Use the new hoodie template. Save to /mockups.'
  },
  {
    id: 't2',
    title: 'Write Instagram caption for summer drop',
    category: 'Social & Website',
    status: 'In Progress',
    priority: 'medium',
    tool: 'ChatGPT',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // tomorrow
    notes: 'Tone: energetic, limited stock.'
  },
  {
    id: 't3',
    title: 'Update Shopify product descriptions',
    category: 'Social & Website',
    status: 'Planned',
    priority: 'high',
    tool: 'Shopify',
    dueDate: new Date().toISOString().slice(0, 10),
    notes: 'Include size chart and shipping info.'
  },
  {
    id: 't4',
    title: 'Design TikTok teaser video script',
    category: 'Social & Website',
    status: 'In Progress',
    priority: 'low',
    tool: 'Claude',
    dueDate: new Date(Date.now() + 172800000).toISOString().slice(0, 10),
    notes: '15–30 sec, behind-the-scenes vibe.'
  },
  {
    id: 't5',
    title: 'Launch email campaign for merch drop',
    category: 'Clothing Merch',
    status: 'Planned',
    priority: 'high',
    tool: 'Canva AI',
    dueDate: new Date(Date.now() + 259200000).toISOString().slice(0, 10),
    notes: 'Segment: past buyers. Subject line A/B test.'
  },
  {
    id: 't6',
    title: 'Publish blog post: “Our AI design workflow”',
    category: 'AI Projects',
    status: 'Launched/Done',
    priority: 'medium',
    tool: 'ChatGPT',
    dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    notes: 'Published and shared on LinkedIn.'
  }
]