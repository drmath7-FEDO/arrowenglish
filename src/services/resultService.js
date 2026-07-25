import { getEducationalGoogleImageSearchUrl } from './imageSearchService';

export function buildUpdatedTranslationResult(result, chunkIndex, newEnglish) {
  if (!result?.chunks?.[chunkIndex]) {
    return result;
  }

  const updatedChunks = [...result.chunks];
  updatedChunks[chunkIndex] = {
    ...updatedChunks[chunkIndex],
    english: newEnglish
  };

  let fullEnglish = updatedChunks
    .map((chunk) => chunk.english)
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/\b(a|an|the)\s+(a|an|the)\b/gi, '$2')
    .replace(/\s+([.,!?;])/g, '$1');

  fullEnglish = fullEnglish.charAt(0).toUpperCase() + fullEnglish.slice(1);
  if (!/[.!?]$/.test(fullEnglish)) fullEnglish += '.';

  const vocabCards = updatedChunks.map((chunk) => ({
    korean: chunk.text,
    english: chunk.english,
    role: chunk.role.split(' ')[1] || chunk.role,
    searchUrl: getEducationalGoogleImageSearchUrl(chunk.english)
  }));

  const rhythmChunks = updatedChunks.map((chunk) => ({
    en: chunk.english,
    kr: chunk.text
  }));

  return {
    ...result,
    english: fullEnglish,
    chunks: updatedChunks,
    vocabCards,
    correction: result.correction
      ? {
          ...result.correction,
          refinedEnglish: fullEnglish,
          rhythmChunks
        }
      : null
  };
}
