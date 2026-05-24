export function useCardTilt() {
  function handleTiltMove(event) {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const rotateX = (event.clientY - rect.top - rect.height / 2) / 25
    const rotateY = (rect.width / 2 - (event.clientX - rect.left)) / 25

    card.style.transform = `perspective(1000px) translateY(-2px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function resetTilt(event) {
    event.currentTarget.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)'
  }

  return {
    handleTiltMove,
    resetTilt
  }
}
