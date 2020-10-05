/*
  Uppercases on words or sentences
*/
export default (input: string, splitOption: 'sentence' | 'word' | 'both' = 'word') => {
  const splitters = {
    word: /\s/gm,
    sentence: /(?<=\.)/gm,
    both: /[\s(?<=\.)]/gm
  }

  if (input.length >= 2) {
    const segments = input.split(splitters[splitOption]);
    const uppercasedSegments = segments.map((segment: string) => {
      if (segment[0] === ' ') {
        return segment[0] + segment[1].toUpperCase() + segment.substring(2);
      } else {
        return segment[0].toUpperCase() + segment.substring(1);
      }
    });

    return uppercasedSegments.join(' ');
  }

  return input;
}
