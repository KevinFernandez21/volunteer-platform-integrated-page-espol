"use client"

import { useCounterAnimation } from "@/hooks/use-counter-animation"

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedNumber({ 
  value, 
  duration = 2000, 
  decimals = 0, 
  className = "", 
  suffix = "",
  prefix = ""
}: AnimatedNumberProps) {
  const count = useCounterAnimation({ 
    end: value, 
    duration, 
    decimals 
  })
  
  return (
    <span className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  )
}