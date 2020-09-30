export default (prefix: string, body: string, suffix: string) => {
  const fullSentence = `${prefix} ${body} ${suffix}`;
  return fullSentence;
}