import { useRef } from 'react'
import type { DealState } from '../deal'
import { sampleDeal, statusDetails } from '../deal'
import { useCouponCopy } from '../hooks/useCouponCopy'
import { AlertIcon, CalendarIcon, CheckIcon, ClockIcon, CopyIcon, ShieldIcon, XIcon } from './Icons'

type Props = {
  state: DealState
  isLoading: boolean
  simulateCopyFailure: boolean
}

const statusIcons = {
  verified: ShieldIcon,
  uncertain: ClockIcon,
  expired: XIcon,
  failed: AlertIcon,
}

export function DealCard({ state, isLoading, simulateCopyFailure }: Props) {
  const codeInput = useRef<HTMLInputElement>(null)
  const { feedback, copy, clearFeedback } = useCouponCopy()
  const presentation = statusDetails[state]
  const StatusIcon = statusIcons[state]
  const copyDisabled = isLoading || !presentation.canCopy

  async function handleCopy() {
    if (copyDisabled) return
    const success = await copy(sampleDeal.code, simulateCopyFailure)
    if (!success) {
      // A keyboard-accessible, selectable fallback when permissions are denied.
      codeInput.current?.focus()
      codeInput.current?.select()
    }
  }

  return (
    <article className={`deal-card status-${state}${isLoading ? ' is-loading' : ''}`}
      aria-label="Fictional Luma and Loom coupon offer" aria-busy={isLoading}>
      <div className="ticket-top">
        <div className="merchant-lockup">
          <div className="merchant-mark" aria-hidden="true">{sampleDeal.initials}<span>.</span></div>
          <div>
            <p className="merchant-name">{sampleDeal.merchant}</p>
            <p className="merchant-category">{sampleDeal.category} <span aria-hidden="true">·</span> Fictional merchant</p>
          </div>
        </div>
        <span className="ticket-label">EXCLUSIVE EDITION / 001</span>
      </div>

      <div className="ticket-body">
        <div className="offer-heading">
          <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>
          <div className="discount-line"><strong>{sampleDeal.discount}</strong><span>OFF</span></div>
          <h2>Make room for the good stuff.</h2>
          <p className="offer-copy">A thoughtful little saving for your next home refresh. Just a sample offer, designed with the details in mind.</p>
        </div>

        <div className={`status-panel status-panel-${state}`} aria-label="Coupon status preview">
          <div className="status-heading">
            <span className="status-pill">
              {isLoading ? <span className="mini-spinner" aria-hidden="true" /> : <StatusIcon size={16} />}
              {isLoading ? 'Loading · demo' : presentation.label}
            </span>
            <span className="simulation-label">SIMULATED STATUS</span>
          </div>
          <p className="status-panel-title">{isLoading ? 'Preview in progress…' : presentation.heading}</p>
          <p className="status-panel-description">{isLoading
            ? 'A short delay is being demonstrated locally. No verification service is contacted.'
            : presentation.description}</p>
        </div>

        <div className="offer-metadata">
          <div className="metadata-item">
            <CalendarIcon size={19} />
            <span><small>Expiry date</small><strong>{presentation.expires}</strong></span>
          </div>
          <div className="metadata-item">
            <CheckIcon size={19} />
            <span><small>Terms apply</small><strong>Orders over {sampleDeal.minimumSpend} · {sampleDeal.limit}</strong></span>
          </div>
        </div>
      </div>

      <div className="ticket-cutline" aria-hidden="true" />

      <div className="ticket-bottom">
        <div className="code-intro"><span>YOUR DEMO COUPON CODE</span><small>Tap to select or copy</small></div>
        <div className="coupon-row">
          <input ref={codeInput} className="coupon-code" type="text" readOnly
            value={sampleDeal.code} aria-label="Fictional coupon code. Select to copy manually."
            onFocus={(event) => event.currentTarget.select()} />
          <button className="copy-button" type="button" disabled={copyDisabled}
            aria-label={feedback === 'copied' ? 'Coupon code copied' : 'Copy fictional coupon code'}
            onClick={handleCopy} onBlur={() => { if (feedback === 'copied') clearFeedback() }}>
            {isLoading ? <span className="button-spinner" aria-hidden="true" /> : feedback === 'copied' ? <CheckIcon size={19} /> : <CopyIcon size={19} />}
            <span>{isLoading ? 'Loading…' : feedback === 'copied' ? 'Copied!' : 'Copy code'}</span>
          </button>
        </div>
        <div className="feedback-wrap" role="status" aria-live="polite" aria-atomic="true">
          {feedback === 'error' && !copyDisabled
            ? <p className="inline-message error"><AlertIcon size={15} /> Clipboard unavailable. Code selected so you can copy it manually.</p>
            : feedback === 'copied' && !copyDisabled
              ? <p className="inline-message success"><CheckIcon size={15} /> Copied to clipboard. This is not a redeemable code.</p>
              : <p className="inline-message muted">{isLoading ? 'Action disabled during the loading preview.' : presentation.hint}</p>}
        </div>
        <p className="card-disclaimer">PERSONAL PROTOTYPE <span aria-hidden="true">•</span> NOT A REAL OFFER</p>
      </div>
    </article>
  )
}
