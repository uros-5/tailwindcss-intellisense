import type { State } from '../state'
import { replaceCssVars } from './replacements'

export function replaceCssVarsWithFallbacks(state: State, str: string): string {
  return replaceCssVars(str, ({ name, fallback }) => {
    // Replace with the value from the design system first. The design system
    // take precedences over other sources as that emulates the behavior of a
    // browser where the fallback is only used if the variable is defined.
    if (state.designSystem && name.startsWith('--')) {
      let value = state.designSystem.resolveThemeValue?.(name) ?? null
      if (value !== null) return value
    }

    if (fallback) {
      return fallback
    }

    // Don't touch it since there's no suitable replacement
    return null
  })
}