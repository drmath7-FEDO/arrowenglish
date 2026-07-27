import {
  PRESET_SENTENCES,
  parseArrowKoreanLocalAsync,
  translateWithGemini
} from './arrowEngine';

export { PRESET_SENTENCES };

export async function convertArrowKorean(text, apiKey) {
  const cleanInput = (text || '').trim();
  const normalizedInput = cleanInput.replace(/\s+/g, ' ');

  // 1. If input matches preset sentence, return preset directly
  const matchedPreset = PRESET_SENTENCES.find(p => {
    const pNorm = p.arrowKorean.replace(/\s+/g, ' ');
    return pNorm === normalizedInput || p.arrowKorean.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '');
  });
  if (matchedPreset) return matchedPreset;

  // 2. Custom sentence: Require API key
  if (!apiKey || apiKey.trim().length <= 10) {
    throw new Error("API_KEY_REQUIRED: Gemini API 키가 입력되지 않았습니다. 상단 [⚙️ API 키 설정] 버튼을 눌러 Google Gemini API 키를 입력해 주세요.");
  }

  // 3. Translate via Gemini
  return translateWithGemini(cleanInput, apiKey);
}
