let activeOwner = 0

export function useHaoUniverse() {
  let ownerId = 0
  let scriptElement

  function mountUniverse() {
    ownerId = ++activeOwner
    window.__haoDarkDestroy?.()

    scriptElement = document.createElement('script')
    scriptElement.async = true
    scriptElement.src = '/hao-assets/libs/canvas/dark.js'
    scriptElement.dataset.haoUniverse = 'true'
    document.body.appendChild(scriptElement)
  }

  function unmountUniverse() {
    scriptElement?.remove()
    if (ownerId !== activeOwner) return

    window.__haoDarkDestroy?.()
    delete window.__haoDarkDestroy
  }

  return {
    mountUniverse,
    unmountUniverse
  }
}
