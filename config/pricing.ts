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
    entities: 1,
    responses: 5
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Experience the full validation workflow once',
      price: { monthly: 0 },
      limits: {
        entities: 1,
        responses: 5
      },
      features: [
        '1 validation project',
        'Channel discovery for 2 platforms',
        '3 AI outreach templates',
        'Basic analysis of up to 5 responses',
        'Powered by Claude Sonnet',
        'Community support'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Unlimited validation with deep AI analysis',
      price: { monthly: 29, yearly: 249 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1,
        responses: -1
      },
      features: [
        'Unlimited projects',
        'All platform channel discovery',
        'Unlimited AI outreach templates with A/B variants',
        'Opus-powered deep analysis — unlimited responses',
        'Cross-channel pattern detection',
        'Confidence scoring with calibrated verdicts',
        'Anti-confirmation-bias flagging',
        'Shareable validation reports (PDF + web link)',
        'Bulk thread/conversation import',
        'Historical project archive with search',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Start Pro — $29/mo',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For product teams and validation consultants',
      price: { monthly: 79, yearly: 690 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1,
        responses: -1
      },
      features: [
        'Everything in Pro',
        'Team collaboration (up to 5 members)',
        'Client-facing branded reports',
        'API access',
        'Custom report templates',
        'Priority analysis queue',
        'Dedicated onboarding call',
        'Slack support channel'
      ],
      cta: 'Start Team Plan',
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
