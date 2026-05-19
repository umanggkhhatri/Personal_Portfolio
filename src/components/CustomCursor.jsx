import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let animId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      if (ring) {
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderColor = 'rgba(191,95,255,0.7)'
        ring.style.marginLeft = '-10px'
        ring.style.marginTop = '-10px'
      }
    }

    const onLeaveLink = () => {
      if (ring) {
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(0,245,255,0.5)'
        ring.style.marginLeft = '0'
        ring.style.marginTop = '0'
      }
    }

    window.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(animate)

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
