import { useState, useEffect } from 'react'

interface UseCounterAnimationProps {
  end: number
  duration?: number
  start?: number
  decimals?: number
}

export function useCounterAnimation({ 
  end, 
  duration = 2000, 
  start = 0, 
  decimals = 0 
}: UseCounterAnimationProps) {
  const [count, setCount] = useState(start)
  
  useEffect(() => {
    if (start === end) return
    
    const startTime = Date.now()
    const endTime = startTime + duration
    
    const timer = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max((endTime - now) / duration, 0)
      const progress = 1 - remaining
      
      if (progress >= 1) {
        setCount(end)
        clearInterval(timer)
        return
      }
      
      const currentCount = start + (end - start) * progress
      setCount(Number(currentCount.toFixed(decimals)))
    }, 16) // ~60fps
    
    return () => clearInterval(timer)
  }, [end, duration, start, decimals])
  
  return count
}