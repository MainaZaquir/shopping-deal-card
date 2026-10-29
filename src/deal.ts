/** All data and statuses are fictional, hardcoded samples. No verification API exists. */
export type DealState = 'verified' | 'uncertain' | 'expired' | 'failed'

export type StatusPresentation = {
  label: string
  heading: string
  description: string
  hint: string
  canCopy: boolean
  expires: string
}

export const sampleDeal = {
  merchant: 'Luma & Loom',
  initials: 'L',
  category: 'Home & living',
  discount: '30%',
  code: 'LUMA30',
  minimumSpend: '$75',
  limit: 'One use per customer',
} as const

export const stateLabels: Record<DealState, string> = {
  verified: 'Verified',
  uncertain: 'Uncertain',
  expired: 'Expired',
  failed: 'Failed',
}

export const statusDetails: Record<DealState, StatusPresentation> = {
  verified: {
    label: 'Verified · demo',
    heading: 'Ready to copy',
    description: 'This sample offer is marked verified for the UI demonstration. No real merchant was checked.',
    hint: 'This fictional coupon can be copied for interaction testing.',
    canCopy: true,
    expires: '31 Dec 2026 (sample)',
  },
  uncertain: {
    label: 'Uncertain · demo',
    heading: 'Confirmation pending',
    description: 'The sample state is uncertain. Copying is disabled to avoid suggesting the offer is valid.',
    hint: 'Copying is disabled while this example is uncertain.',
    canCopy: false,
    expires: '31 Dec 2026 (sample)',
  },
  expired: {
    label: 'Expired · demo',
    heading: 'Offer has ended',
    description: 'This sample coupon uses a past expiry date. The copy action is intentionally disabled.',
    hint: 'Copying is disabled because this example is expired.',
    canCopy: false,
    expires: '20 Sep 2026 (sample)',
  },
  failed: {
    label: 'Failed · demo',
    heading: 'Check not completed',
    description: 'This example simulates a failed status check. No network request or merchant verification took place.',
    hint: 'Copying is disabled after a simulated check failure.',
    canCopy: false,
    expires: '31 Dec 2026 (sample)',
  },
}
