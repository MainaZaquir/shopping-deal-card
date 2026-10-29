import { useEffect, useRef, useState } from 'react'
import { DealCard } from './components/DealCard'
import { ArrowIcon, CheckIcon, RefreshIcon, SparkIcon } from './components/Icons'
import type { DealState } from './deal'
import { stateLabels } from './deal'

const states: DealState[] = ['verified', 'uncertain', 'expired', 'failed']

export default function App() {
  const [state, setState] = useState<DealState>('verified')
  const [isLoading, setIsLoading] = useState(false)
  const [simulateCopyFailure, setSimulateCopyFailure] = useState(false)
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cancelLoading() {
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
    loadingTimeout.current = null
    setIsLoading(false)
  }

  function chooseState(next: DealState) {
    cancelLoading()
    setState(next)
  }

  function previewLoading() {
    cancelLoading()
    setIsLoading(true)
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false)
      loadingTimeout.current = null
    }, 1500)
  }

  function reset() {
    cancelLoading()
    setState('verified')
    setSimulateCopyFailure(false)
  }

  useEffect(() => () => {
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header wrap">
        <div className="wordmark"><span className="wordmark-symbol"><SparkIcon size={19} /></span>dealcraft<span className="wordmark-period">.</span></div>
        <span className="header-marker"><span className="live-dot" aria-hidden="true" /> PERSONAL UI LAB <span className="header-separator">/</span> 001</span>
      </header>

      <main id="main" className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <div className="hero-eyebrow"><span className="hero-line" /> COMPONENT STUDY / REACT + TYPESCRIPT</div>
            <h1 id="hero-title">The little details <em>make</em> the difference<span className="headline-dot">.</span></h1>
          </div>
          <div className="hero-side">
            <p>One thoughtfully built coupon card. Four possible states. Every interaction intentional.</p>
            <span className="hero-side-caption">A PERSONAL FRONTEND PROTOTYPE <ArrowIcon size={16} /></span>
          </div>
        </section>

        <div className="workspace">
          <section className="preview-area" aria-labelledby="preview-title">
            <div className="section-head">
              <div><span className="section-number">01 /</span><h2 id="preview-title">The live preview</h2></div>
              <span className="section-subtext">INTERACTIVE COMPONENT</span>
            </div>
            <DealCard key={state} state={state} isLoading={isLoading} simulateCopyFailure={simulateCopyFailure} />
          </section>

          <aside className="control-area" aria-labelledby="control-title">
            <div className="section-head aside-head">
              <div><span className="section-number">02 /</span><h2 id="control-title">The playground</h2></div>
            </div>
            <div className="control-panel">
              <div className="control-panel-top">
                <p className="eyebrow">INTERACTION LAB</p>
                <h3>Explore every state.</h3>
                <p>Switch between demo outcomes and notice what changes, including the action, status text, and visual treatment.</p>
              </div>
              <fieldset className="state-fieldset">
                <legend>Preview status</legend>
                <div className="state-options">
                  {states.map((item) => (
                    <button key={item} type="button" className={`state-option${state === item ? ' is-selected' : ''}`}
                      aria-pressed={state === item} onClick={() => chooseState(item)}>
                      <span className={`state-dot dot-${item}`} aria-hidden="true" />
                      <span>{stateLabels[item]}</span>
                      {state === item && <CheckIcon className="state-selected-icon" size={18} />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="lab-tools">
                <button type="button" className="tool-button" disabled={isLoading} onClick={previewLoading}>
                  <span>{isLoading ? 'Loading preview…' : 'Simulate loading'}</span><RefreshIcon size={18} />
                </button>
                <label className="failure-option">
                  <input type="checkbox" checked={simulateCopyFailure}
                    onChange={(event) => setSimulateCopyFailure(event.target.checked)} />
                  <span>Simulate clipboard error</span>
                </label>
                <button type="button" className="reset-button" onClick={reset}>Reset all controls</button>
              </div>
            </div>

            <div className="notes-panel">
              <div className="notes-icon"><SparkIcon size={18} /></div>
              <div>
                <h3>Built for the edge cases.</h3>
                <p>Keyboard focus, clipboard permissions, responsive layouts, reduced motion, meaningful disabled states, and live feedback.</p>
                <p className="notes-footnote">No verification API. No real merchants. No live coupons.</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="site-footer">
          <p>DEALCRAFT <span aria-hidden="true">/</span> A PERSONAL PROTOTYPE, NOT A COUPON SERVICE</p>
          <p>DESIGNED TO DEMONSTRATE THE DETAILS <span aria-hidden="true">✳</span></p>
        </footer>
      </main>
    </div>
  )
}
