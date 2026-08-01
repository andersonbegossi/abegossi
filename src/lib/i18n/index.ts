import type { Dictionary } from './dictionary';
import { en } from './en';
import type { Locale } from './locale';
import { pt } from './pt';

const dictionaries: Record<Locale, Dictionary> = { en, pt };

/** The single way a component reaches UI copy: pass it the locale, get its strings. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
