import { computed, ref, watch } from 'vue'

const THEME_STORAGE_KEY = 'logicstack-theme'
const savedTheme = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_STORAGE_KEY) : null
const theme = ref(savedTheme === 'day' ? 'day' : 'night')

watch(
  theme,
  (value) => {
    if (typeof document === 'undefined') return

    document.documentElement.dataset.theme = value
    document.documentElement.style.colorScheme = value === 'night' ? 'dark' : 'light'
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  },
  { immediate: true }
)

export function useTheme() {
  const isNight = computed(() => theme.value === 'night')

  function toggleTheme() {
    theme.value = isNight.value ? 'day' : 'night'
  }

  return {
    isNight,
    theme,
    toggleTheme
  }
}
