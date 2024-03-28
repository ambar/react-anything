import {test, expect} from 'vitest'
import {getInlineColorSchemeScript} from '../useColorSchemeState'

test('getInlineColorSchemeScript', () => {
  expect(getInlineColorSchemeScript()).toMatchInlineSnapshot(
    `"(({storageKey,lightClass,darkClass,colorScheme})=>{;const saved = localStorage.getItem(storageKey);const matchesDark = window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = colorScheme ? colorScheme === 'dark' : !saved || saved === 'auto' ? matchesDark : saved === 'dark';if (lightClass) document.documentElement.classList.toggle(lightClass, !isDark);if (darkClass) document.documentElement.classList.toggle(darkClass, isDark);document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';})({"storageKey":"theme","darkClass":"dark"});"`,
  )
  expect(
    getInlineColorSchemeScript({
      storageKey: 'theme',
      classes: ['light', 'dark'],
      colorScheme: 'dark',
    }),
  ).toMatchInlineSnapshot(
    `"(({storageKey,lightClass,darkClass,colorScheme})=>{;const saved = localStorage.getItem(storageKey);const matchesDark = window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = colorScheme ? colorScheme === 'dark' : !saved || saved === 'auto' ? matchesDark : saved === 'dark';if (lightClass) document.documentElement.classList.toggle(lightClass, !isDark);if (darkClass) document.documentElement.classList.toggle(darkClass, isDark);document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';})({"storageKey":"theme","lightClass":"light","darkClass":"dark","colorScheme":"dark"});"`,
  )
})
