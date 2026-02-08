import { Search, MessageSquare, Zap, BarChart, Shield, Globe } from 'lucide-react'
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
  tagline: 'Validate your SaaS idea with real human conversations, not assumptions',
  description: 'AI-powered validation engine that guides founders from idea to go/no-go verdict using real human conversations.',
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
    { title: 'Reports', href: '/dashboard/reports' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Stop building things nobody wants',
    headline: 'Validate Your SaaS Idea with Real Human Conversations',
    headlineHighlight: 'Real Human Conversations',
    subheadline: 'ConvoFlow guides you from idea to validated go/no-go verdict in 4 steps. Discover where your audience hangs out, get platform-specific conversation templates, paste in real responses, and let AI analyze everything into a confidence-scored validation verdict. No more guesswork. No more synthetic research.',
    primaryCta: { text: 'Start Validating Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features#how-it-works' },
    socialProof: { text: 'Trusted by 1,200+ indie hackers and founders', rating: '4.9/5' },
  },

  features: [
    {
      icon: Search,
      title: 'Audience Channel Discovery',
      description: 'AI identifies the exact subreddits, X communities, Discord servers, and Indie Hackers groups where your target audience is most active — with subscriber counts and engagement scores.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: 'Platform-Specific Templates',
      description: 'Get conversation templates tailored to each platform\'s culture and norms. No more getting flagged for spam on Reddit or ignored on Discord.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Opus-Powered Deep Analysis',
      description: 'Paste in messy conversation threads from any platform. Claude Opus extracts pain levels, willingness to pay, key quotes, and detects cross-channel patterns automatically.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: BarChart,
      title: 'Confidence-Scored Verdicts',
      description: 'Get a clear go, weak signal, or no-go verdict with a confidence score — not just raw data. Finally translate messy human feedback into a build decision.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Shield,
      title: 'Anti-Confirmation Bias',
      description: 'Our AI is designed to be brutally honest. It flags contradictions, highlights negative signals you might overlook, and tells you when your idea needs work.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Shareable Validation Reports',
      description: 'Generate professional validation reports you can share with co-founders, advisors, or investors. Export to PDF, Notion, or Google Docs with one click.',
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
