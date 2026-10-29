import { useEffect, useRef, useState } from 'react'

type CopyFeedback = 'idle' | 'copied' | 'error'

export function useCouponCopy() {
  const [feedback, setFeedback] = useState<CopyFeedback>('idle')
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearFeedback() {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    feedbackTimeout.current = null
    setFeedback('idle')
  }

  function updateFeedback(next: CopyFeedback) {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    setFeedback(next)
    feedbackTimeout.current = setTimeout(() => {
      setFeedback('idle')
      feedbackTimeout.current = null
    }, 3000)
  }

  async function copy(value: string, simulateFailure: boolean) {
    try {
      if (simulateFailure) throw new Error('Simulated clipboard error')
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(value)
      updateFeedback('copied')
      return true
    } catch {
      updateFeedback('error')
      return false
    }
  }

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    }
  }, [])

  return { feedback, copy, clearFeedback }
}
