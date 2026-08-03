let sentenceIdCounter = 0;
let paragraphIdCounter = 0;

export function parseTextToParagraphs(text) {
  if (!text) return [];

  // Clean raw markdown syntax if present (e.g. # Header, ## Subheader, **bold**)
  const cleanedText = text
    .replace(/^#+\s+/gm, '') // Remove Markdown headers (# , ## , ### )
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
    .replace(/\*(.*?)\*/g, '$1'); // Remove italic *text*

  // Split by one or more newlines to get paragraphs
  const rawParagraphs = cleanedText.split(/\n+/);
  
  return rawParagraphs
    .map(p => p.trim())
    .filter(p => p.length > 0 && !['English', '한국어(영어식 어순)', '한국어'].includes(p) && !/^Day \d+$/i.test(p))
    .map(p => ({
      id: `p-${++paragraphIdCounter}`,
      sentences: parseParagraphToSentences(p)
    }))
    .filter(p => p.sentences.length > 0);
}

function parseParagraphToSentences(paragraphText) {
  const hasKorean = /[\uac00-\ud7a3]/.test(paragraphText);
  let matches = [];

  if (hasKorean) {
    // For Arrow Korean (영어식 어순 한글), each line is a single sentence unit.
    // We do NOT break on inner periods (e.g. "나는 떠났다. 대구에서, 아침식사 전에, 엄마와 함께.")
    matches = [paragraphText];
  } else {
    // For English text, match standard sentences ending in . ! ?
    const sentenceRegex = /[^.!?]+[.!?]+(?:["']?(?=\s|$))?/g;
    matches = paragraphText.match(sentenceRegex);
    
    if (!matches || matches.length === 0) {
      matches = [paragraphText];
    } else {
      const joinedLength = matches.join(' ').length;
      if (joinedLength < paragraphText.length - 10) {
        matches = paragraphText.split(/(?<=[.!?])\s+/);
      }
    }
  }

  return matches
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => ({
      id: `s-${++sentenceIdCounter}`,
      text: s,
      status: 'idle',
    }));
}
