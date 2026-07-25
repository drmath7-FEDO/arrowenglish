const KOREAN_PARENTHESIS_PATTERN = /\([\u3131-\u318E\uAC00-\uD7A3\s]+\)/g;

export function toSpeakableEnglish(text) {
  return (text || '')
    .replace(KOREAN_PARENTHESIS_PATTERN, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakEnglishText(text, callbacks = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  const cleanText = toSpeakableEnglish(text);
  if (!cleanText) return false;

  const { onStart, onEnd, onError } = callbacks;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onError?.();

  window.speechSynthesis.speak(utterance);
  return true;
}
