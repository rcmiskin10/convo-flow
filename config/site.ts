import { Search, MessageSquare, Zap, BarChart, Globe, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'ConvoFlow',
  tagline: 'Validate your SaaS idea with real human conversations, not AI guesswork',
  description: 'A conversational research engine that turns real customer conversations into confidence-scored validation verdicts.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  company: 'ConvoFlow',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'How It Works', href: '/features#how-it-works' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/entities' },
    { title: 'Templates', href: '/dashboard/templates' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Stop building things nobody wants',
    headline: 'Validate Your SaaS Idea with Real Human Signal',
    headlineHighlight: 'Real Human Signal',
    subheadline: 'ConvoFlow guides you from idea to validation verdict in 4 steps. Discover where your audience hangs out, get platform-specific conversation templates, paste the messy responses back, and get a confidence-scored go/no-go decision powered by AI analysis of real conversations — not web data hallucinations.',
    primaryCta: { text: 'Start Validating Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers and founders', rating: '4.9/5' },
  },

  features: [
    {
      icon: Search,
      title: 'Smart Channel Discovery',
      description: 'AI finds the exact subreddits, Discord servers, X communities, and Indie Hackers groups where your target audience is active — with real subscriber counts and activity levels.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: 'Platform-Aware Templates',
      description: 'Get outreach templates optimized for each platform\'s culture. Reddit\'s anti-promo norms, X\'s thread format, Discord\'s conversational tone — all handled automatically.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Opus-Powered Analysis',
      description: 'Paste messy conversation responses and let Claude Opus extract pain levels, willingness-to-pay signals, key quotes, and cross-channel patterns from real human feedback.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: BarChart,
      title: 'Confidence-Scored Verdicts',
      description: 'Get a clear go, cautious go, no-go, or insufficient data verdict with explicit confidence scoring — not vague AI opinions, but a structured decision framework.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Globe,
      title: 'Cross-Channel Pattern Detection',
      description: 'When the same pain point surfaces on Reddit AND Discord AND X, ConvoFlow spots it. Triangulate signals across channels for validation you can trust.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: FileText,
      title: 'Shareable Validation Reports',
      description: 'Generate investor-ready reports with key quotes, pain scoring, WTP analysis, and channel breakdowns. Turn scattered conversations into a credible artifact.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Claude AI', color: 'bg-amber-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'How It Works', href: '/features#how-it-works' },
        { title: 'Changelog', href: '/blog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' }
      ],
    }
  ],

  footerCopyright: '2026 ConvoFlow. All rights reserved.',

  social: {
    discord: 'https://discord.gg/convoflow',
    twitter: 'https://twitter.com/convoflowapp'
  },
}
