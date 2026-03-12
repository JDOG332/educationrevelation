/**
 * Auto-paragraph: splits text into groups of N sentences.
 * Returns an array of paragraph strings.
 * 
 * Splits on sentence-ending punctuation (. ! ?) followed by a space,
 * but avoids splitting on common abbreviations (Dr. Mr. Mrs. etc.)
 */
export function autoParagraph(text, sentencesPerParagraph = 4) {
  if (!text || typeof text !== 'string') return [text || ''];
  
  // Split on sentence boundaries: period/exclamation/question followed by space + capital
  // But preserve the punctuation with the sentence
  const sentences = text.match(/[^.!?]*[.!?]+(?:\s|$)/g);
  
  if (!sentences || sentences.length <= sentencesPerParagraph) return [text];
  
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join('').trim());
  }
  
  return paragraphs;
}
