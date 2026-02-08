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
    conversations: 5,
    entities: 1
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Experience the full validation workflow on one project',
      price: { monthly: 0 },
      limits: {
        channels: 2,
        conversations: 5,
        entities: 1
      },
      features: [
        '1 active project',
        'Up to 5 conversation threads',
        'Basic AI analysis (Haiku-powered)',
        'Channel discovery for Reddit + 1 platform',
        'Basic validation summary',
        'Community support'
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
        conversations: -1,
        entities: -1
      },
      features: [
        'Unlimited projects',
        'Unlimited conversation thread imports',
        'Claude Opus-powered deep analysis',
        'Confidence-scored validation verdicts',
        'Full channel discovery across all platforms',
        'Cross-channel pattern detection',
        'Willingness-to-pay extraction',
        'Shareable validation reports',
        'Export to PDF, Notion, Google Docs',
        'Historical project comparison',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Start Pro — 7 Day Free Trial',
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      description: 'One-time payment, forever access — limited to 500 seats',
      price: { monthly: 249 },
      priceId: process.env.STRIPE_PRICE_LIFETIME,
      limits: {
        channels: -1,
        conversations: -1,
        entities: -1
      },
      features: [
        'Everything in Pro, forever',
        'Unlimited projects & analyses',
        'All future features included',
        'Early access to new capabilities',
        'Founding member badge',
        'Direct founder access via Discord'
      ],
      cta: 'Grab Lifetime Deal',
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
