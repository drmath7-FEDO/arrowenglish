// src/services/homonymService.js
// Gemini API handles contextual homonym resolution directly.
// This service provides a simple fallback for common Korean homonyms.

export function getHomonymSuggestions(koreanText, englishText) {
  const cleanKr = (koreanText || '').replace(/^[,\s.]+|[,\s.]+$|[,]/g, '');
  const cleanEn = (englishText || '').toLowerCase().trim();

  // Common Korean homonyms with multiple English meanings
  if (cleanKr.includes('다리')) return ['a bridge', 'bridge', 'legs', 'a leg'];
  if (cleanKr.includes('집')) return ['the house', 'home', 'a house'];
  if (cleanKr.includes('배')) return ['a boat', 'a pear', 'the stomach'];
  if (cleanKr.includes('차')) return ['a car', 'tea', 'a vehicle'];
  if (cleanKr.includes('눈')) return ['eyes', 'snow'];
  if (cleanKr.includes('말')) return ['a horse', 'words', 'speech'];
  if (cleanKr.includes('밤')) return ['night', 'a chestnut'];

  if (['legs', 'a leg', 'bridge', 'a bridge'].includes(cleanEn)) {
    return ['a bridge', 'bridge', 'legs', 'a leg'];
  }

  return [];
}
