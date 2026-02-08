import { Search, MessageSquare, BarChart, Shield, Zap, Globe } from 'lucide-react'
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
  description: 'AI-powered validation engine that helps founders discover audiences, have real conversations, and get confidence-scored verdicts.',
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
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Stop building things nobody wants',
    headline: 'Validate Your SaaS Idea with Real Human Conversations',
    headlineHighlight: 'Real Human Conversations',
    subheadline: 'ConvoFlow replaces guesswork and synthetic AI research with a structured 4-step workflow. Discover where your audience lives online, get platform-native conversation templates, paste back messy responses, and receive an AI-powered validation verdict with confidence scoring — all in 48 hours.',
    primaryCta: { text: 'Start Validating Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 500+ indie hackers and founders', rating: '4.9/5' },
  },

  features: [
    {
      icon: Search,
      title: 'Channel Discovery Engine',
      description: 'Instantly find the exact subreddits, Discord servers, X communities, and Indie Hackers groups where your target audience is most active — complete with subscriber counts and activity levels.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: 'Platform-Native Templates',
      description: 'Get conversation starters and discussion prompts tailored to each platform\'s culture. Reddit posts that feel genuine, X threads that provoke engagement, Discord messages that fit the vibe.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart,
      title: 'Cross-Channel Pattern Detection',
      description: 'Paste responses from multiple channels and our AI identifies signals that hold across communities (high confidence) vs. single-source noise (low confidence) — dramatically more trustworthy than gut feel.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Validation Verdict & Confidence Score',
      description: 'Get a structured 0-100 validation score, pain intensity rating, willingness-to-pay range, key risk factors, and a clear go/pivot/kill recommendation backed by real human data.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Zap,
      title: 'Opus-Powered Deep Analysis',
      description: 'Claude Opus analyzes all your collected responses together — extracting pain levels, buying signals, key verbatim quotes, and contradictions that you\'d miss reading through manually.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Shareable Validation Reports',
      description: 'Generate polished reports with key quotes, pattern analysis, and confidence scores. Share with co-founders, early investors, or accelerator applications via a single link.',
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
