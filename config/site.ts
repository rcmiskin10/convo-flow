import { Search, MessageSquare, BarChart, Zap, Star, Globe } from 'lucide-react'
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
  tagline: 'Stop validating with AI hallucinations. Talk to real humans.',
  description: 'A conversational research engine that helps founders validate SaaS ideas with real human signal, not AI guesses.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  company: 'ConvoFlow',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'How It Works', href: '/features#how-it-works' },
    { title: 'FAQ', href: '/pricing#faq' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/entities' },
    { title: 'Templates', href: '/dashboard/templates' },
    { title: 'Reports', href: '/dashboard/reports' }
  ],

  hero: {
    badge: 'Real Signal from Real Humans',
    headline: 'Validate Your SaaS Idea with Real Conversations',
    headlineHighlight: 'Real Conversations',
    subheadline: 'Stop building things nobody wants. ConvoFlow guides you from idea to validation verdict in 4 steps — discover where your audience lives, get conversation templates optimized for each platform, paste back real responses, and get an AI-powered verdict with confidence scoring.',
    primaryCta: { text: 'Start Validating Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers and founders', rating: '4.9/5' },
  },

  features: [
    {
      icon: Search,
      title: 'Smart Channel Discovery',
      description: 'AI finds the exact subreddits, X communities, and Discord servers where your target audience hangs out — with subscriber counts and activity metrics.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: 'Platform-Optimized Templates',
      description: 'Get conversation scripts tailored to each platform\'s culture — Reddit\'s anti-spam norms, Twitter\'s threading format, Discord\'s community etiquette.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart,
      title: 'Confidence-Scored Verdicts',
      description: 'No more guessing. Get a clear Strong Signal, Moderate Signal, or Red Flag verdict backed by confidence percentages and supporting evidence.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Cross-Channel Pattern Detection',
      description: 'Analyze responses from Reddit, Twitter, and Discord together to spot convergent themes, contradictions, and breakthrough insights across communities.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Star,
      title: 'Willingness-to-Pay Extraction',
      description: 'Distinguish between polite encouragement and genuine purchase intent. Our AI detects pricing signals in natural language so you know who would actually pay.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Shareable Validation Reports',
      description: 'Generate professional reports with key quotes, data visualizations, and your validation verdict — share with co-founders, advisors, or investors via a unique link.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Claude AI', color: 'bg-orange-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'How It Works', href: '/features#how-it-works' },
        { title: 'Changelog', href: '/changelog' }
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
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookies' }
      ],
    }
  ],

  footerCopyright: '2026 ConvoFlow. All rights reserved.',

  social: {
    discord: 'https://discord.gg/convoflow',
    twitter: 'https://twitter.com/convoflowapp'
  },
}
