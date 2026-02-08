export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    entities: 1
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Experience the full validation workflow once',
      price: { monthly: 0 },
      limits: {
        entities: 1
      },
      features: [
        '1 active project',
        'Channel discovery for 2 platforms',
        '3 AI-generated outreach templates',
        'Up to 10 pasted responses',
        'Basic analysis (Claude Sonnet)',
        'Simple validation summary',
        'No confidence scoring'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Full validation power for serious founders',
      price: { monthly: 29, yearly: 249 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited projects',
        'All platforms (Reddit, X, Discord, IH, FB, LinkedIn)',
        'Unlimited outreach templates',
        'Unlimited response analysis',
        'Claude Opus-powered deep analysis',
        'Cross-channel pattern detection',
        'Confidence-scored validation verdicts',
        'Shareable validation reports',
        'Bulk thread/conversation import',
        'Export to PDF, Notion, Google Docs',
        'Validation history & project comparison'
      ],
      highlighted: true,
      cta: 'Start Pro — 7 Day Free Trial',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For product teams and validation consultants',
      price: { monthly: 79, yearly: 690 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Team collaboration & comments',
        'White-label validation reports',
        'API access',
        'Priority Opus processing',
        'Dedicated onboarding call',
        'Custom report branding'
      ],
      cta: 'Contact Us',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
