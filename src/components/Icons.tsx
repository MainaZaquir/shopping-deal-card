import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function IconFrame({ size = 20, children, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      focusable="false" {...props}>
      {children}
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return <IconFrame {...props}><path d="m5 12 4 4L19 6" /></IconFrame>
}
export function ShieldIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></IconFrame>
}
export function ClockIcon(props: IconProps) {
  return <IconFrame {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconFrame>
}
export function AlertIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M10.3 3.7 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></IconFrame>
}
export function XIcon(props: IconProps) {
  return <IconFrame {...props}><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6m0-6-6 6" /></IconFrame>
}
export function CopyIcon(props: IconProps) {
  return <IconFrame {...props}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></IconFrame>
}
export function ArrowIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></IconFrame>
}
export function CalendarIcon(props: IconProps) {
  return <IconFrame {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></IconFrame>
}
export function SparkIcon(props: IconProps) {
  return <IconFrame {...props}><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" /></IconFrame>
}
export function RefreshIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.7 9A7 7 0 0 1 18 6l2 1M4 17l2 1a7 7 0 0 0 12.3-3" /></IconFrame>
}
