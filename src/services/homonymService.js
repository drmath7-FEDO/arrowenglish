import { HOMONYM_SUGGESTIONS } from './arrowEngine';

export function getHomonymSuggestions(koreanText, englishText) {
  const cleanKr = (koreanText || '').replace(/^[,\s.]+|[,\s.]+$|[,]/g, '');
  const cleanEn = (englishText || '').toLowerCase().trim();

  if (HOMONYM_SUGGESTIONS[cleanKr]) return HOMONYM_SUGGESTIONS[cleanKr];
  if (cleanKr.includes('다리')) return ['a bridge', 'bridge', 'legs', 'a leg'];
  if (cleanKr.includes('집')) return ['the house', 'home', 'a house'];
  if (cleanKr.includes('배')) return ['a boat', 'a pear', 'the stomach'];

  if (['legs', 'a leg', 'bridge', 'a bridge'].includes(cleanEn)) {
    return ['a bridge', 'bridge', 'legs', 'a leg'];
  }

  return [];
}
