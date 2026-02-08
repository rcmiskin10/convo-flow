import { Search, MessageSquare, FileText, BarChart, Shield, Globe } from 'lucide-react'
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
  tagline: 'Stop guessing. Start validating with real human conversations.',
  description: 'AI-powered validation engine that helps founders have real conversations and extract honest market signal.',
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
    { title: 'Reports', href: '/dashboard/reports' }
  ],

  hero: {
    badge: 'Real signal from real humans',
    headline: 'Stop Asking AI What Humans Think',
    headlineHighlight: 'What Humans Think',
    subheadline: 'ConvoFlow guides you to have real conversations with real potential customers across Reddit, Discord, and X — then uses AI to honestly synthesize every response into a calibrated validation verdict with confidence scoring. No more fake validation. No more building things nobody wants.',
    primaryCta: { text: 'Validate Your Idea Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features#how-it-works' },
    socialProof: { text: 'Trusted by 500+ indie hackers and founders', rating: '4.8/5' },
  },

  features: [
    {
      icon: Search,
      title: 'Smart Channel Discovery',
      description: 'AI finds the exact subreddits, Discord servers, X communities, and Indie Hackers groups where your target audience actually hangs out — with subscriber counts and activity levels.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: MessageSquare,
      title: 'Platform-Native Templates',
      description: 'Get copy-paste-ready outreach messages optimized for each platform\'s culture. Reddit value-first format, Discord casual tone, X hook-driven threads — all mod-safe and engagement-optimized.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'Paste & Analyze Responses',
      description: 'Dump messy Reddit DMs, Discord messages, and tweet replies into one place. Our AI handles threaded conversations, multiple respondents, and chaotic formatting effortlessly.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: BarChart,
      title: 'Honest Validation Verdicts',
      description: 'Get a calibrated go/no-go verdict with confidence scoring, pain-level analysis, willingness-to-pay extraction, and explicit sample size caveats. No sugarcoating.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Anti-Confirmation Bias',
      description: 'ConvoFlow flags when respondents are fellow founders vs. actual target users, highlights negative signals you might dismiss, and shows the bear case alongside the bull case.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Shareable Validation Reports',
      description: 'Generate polished, data-backed reports with methodology transparency. Share with co-founders, investors, or accelerator applications via web link or PDF export.',
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
