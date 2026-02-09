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
    channels: 2,
    entities: 1,
    responses: 10,
    templates: 3
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Experience the full validation workflow on one project',
      price: { monthly: 0 },
      limits: {
        channels: 2,
        entities: 1,
        responses: 10,
        templates: 3
      },
      features: [
        '1 active project',
        'Channel discovery for 2 platforms',
        '3 conversation templates',
        'Analyze up to 10 responses',
        'Basic validation summary',
        'Powered by Claude Sonnet'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Full-power validation for serious founders',
      price: { monthly: 29, yearly: 249 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        channels: -1,
        entities: -1,
        responses: -1,
        templates: -1
      },
      features: [
        'Unlimited active projects',
        'All platforms: Reddit, X, Discord, Indie Hackers, LinkedIn',
        'Unlimited conversation templates',
        'Unlimited response analysis',
        'Claude Opus-powered deep analysis',
        'Confidence-scored validation verdicts',
        'Willingness-to-pay extraction',
        'Cross-channel pattern detection',
        'Bulk thread & conversation import',
        'Shareable validation reports',
        'Export to PDF, Notion, Google Docs',
        'Project history & idea comparison'
      ],
      highlighted: true,
      cta: 'Start Pro — 7 Day Free Trial',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For startup studios, accelerators, and product consultants',
      price: { monthly: 79, yearly: 690 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        channels: -1,
        entities: -1,
        responses: -1,
        templates: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'White-label validation reports',
        'Custom branding on shared reports',
        'Priority analysis queue',
        'API access',
        'Dedicated support channel',
        'Team analytics dashboard'
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
