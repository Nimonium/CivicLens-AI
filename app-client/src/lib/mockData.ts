export const mockIssues = [
  {
    id: "1",
    title: "Main St Pothole",
    description: "Deep pothole causing traffic slowdowns and potential damage to vehicles.",
    category: "Infrastructure",
    severity: "High",
    status: "In Progress",
    location: "Downtown District",
    coordinates: [37.7749, -122.4194],
    reporter: "Sarah J.",
    reporterAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    timestamp: "3h ago",
    upvotes: 42,
    comments: 12,
    imageUrl: "https://picsum.photos/seed/pothole/800/600",
    verificationCount: 5,
    timeline: [
      { id: 1, status: "Reported", date: "Today, 10:00 AM", desc: "Report submitted by Sarah J." },
      { id: 2, status: "Verified", date: "Today, 11:15 AM", desc: "Verified by 5 community members." },
      { id: 3, status: "In Progress", date: "Today, 1:00 PM", desc: "Assigned to Maintenance Team A." }
    ]
  },
  {
    id: "2",
    title: "Broken Light",
    description: "Streetlight is completely out, making the corner very dark at night. Safety hazard for pedestrians.",
    category: "Utilities",
    severity: "Medium",
    status: "Resolved",
    location: "Oak Park",
    coordinates: [37.7800, -122.4200],
    reporter: "Mike T.",
    reporterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    timestamp: "1d ago",
    upvotes: 18,
    comments: 3,
    imageUrl: "https://picsum.photos/seed/light/800/600",
    verificationCount: 2,
    timeline: [
      { id: 1, status: "Reported", date: "Yesterday, 9:00 AM", desc: "Report submitted by Mike T." },
      { id: 2, status: "In Progress", date: "Yesterday, 2:00 PM", desc: "Assigned to Utilities Team." },
      { id: 3, status: "Resolved", date: "Today, 8:00 AM", desc: "Lightbulb replaced and verified." }
    ]
  },
  {
    id: "3",
    title: "Graffiti on City Hall",
    description: "Vandalism on the east wall of the building.",
    category: "Vandalism",
    severity: "Low",
    status: "Pending",
    location: "Civic Center",
    coordinates: [37.7793, -122.4183],
    reporter: "Elena R.",
    reporterAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    timestamp: "5h ago",
    upvotes: 8,
    comments: 1,
    imageUrl: "https://picsum.photos/seed/graffiti/800/600",
    verificationCount: 0,
    timeline: [
      { id: 1, status: "Reported", date: "Today, 8:00 AM", desc: "Report submitted by Elena R." }
    ]
  },
  {
    id: "4",
    title: "Overflowing Trash Bin",
    description: "The park bins haven't been emptied in a week. Trash is everywhere.",
    category: "Sanitation",
    severity: "Medium",
    status: "Pending",
    location: "Central Park",
    coordinates: [37.7694, -122.4862],
    reporter: "David K.",
    reporterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    timestamp: "2d ago",
    upvotes: 24,
    comments: 5,
    imageUrl: "https://picsum.photos/seed/trash/800/600",
    verificationCount: 12,
    timeline: [
      { id: 1, status: "Reported", date: "2 days ago", desc: "Report submitted by David K." },
      { id: 2, status: "Verified", date: "Yesterday", desc: "Verified by 12 community members." }
    ]
  }
];

export const mockStats = {
  totalIssues: "1.2k",
  resolvedIssues: "850",
  activeCitizens: "4k",
  avgResolutionTime: "4.2 days"
};

export const mockCategories = [
  "Infrastructure",
  "Utilities",
  "Vandalism",
  "Sanitation",
  "Safety",
  "Other"
];

export const topContributors = [
  { id: 1, name: "Elena R.", role: "47 Issues Verified", score: 1250, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { id: 2, name: "Marcus C.", role: "38 Issues Verified", score: 980, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: 3, name: "Sarah J.", role: "32 Issues Verified", score: 850, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "David K.", role: "24 Issues Verified", score: 620, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
  { id: 5, name: "Mike T.", role: "18 Issues Verified", score: 450, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
];

export const chartData = {
  issuesByCategory: [
    { name: "Infrastructure", value: 400 },
    { name: "Utilities", value: 300 },
    { name: "Sanitation", value: 200 },
    { name: "Vandalism", value: 100 },
    { name: "Safety", value: 150 },
    { name: "Other", value: 50 },
  ],
  resolutionRate: [
    { month: "Jan", rate: 65 },
    { month: "Feb", rate: 70 },
    { month: "Mar", rate: 68 },
    { month: "Apr", rate: 75 },
    { month: "May", rate: 80 },
    { month: "Jun", rate: 85 },
  ],
  statusDistribution: [
    { name: "Resolved", value: 850, fill: "#10B981" },
    { name: "In Progress", value: 200, fill: "#F59E0B" },
    { name: "Pending", value: 150, fill: "#EF4444" },
  ]
};

export const currentUser = {
  name: "Sarah Jenkins",
  role: "Community Advocate",
  joinDate: "Joined Jan 2023",
  location: "North District",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  stats: {
    reported: 12,
    verified: 45,
    impactScore: 850,
    rank: 3
  },
  badges: [
    { id: 1, name: "Early Adopter", icon: "Star" },
    { id: 2, name: "Problem Solver", icon: "Wrench" },
    { id: 3, name: "Community Hero", icon: "ShieldCheck" },
    { id: 4, name: "Verified Reporter", icon: "CheckCircle" },
    { id: 5, name: "Quick Responder", icon: "Zap" },
    { id: 6, name: "Top Contributor", icon: "Trophy" }
  ]
};
