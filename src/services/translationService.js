import {
  PRESET_SENTENCES,
  parseArrowKoreanLocalAsync,
  translateWithGemini
} from './arrowEngine';

export { PRESET_SENTENCES };

export async function convertArrowKorean(text, apiKey) {
  if (apiKey && apiKey.trim().length > 10) {
    return translateWithGemini(text, apiKey);
  }

  return parseArrowKoreanLocalAsync(text);
}
