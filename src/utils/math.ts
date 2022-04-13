export const dot = (v1: number[], v2: number[]) => {
  return v1.reduce((res, _, i) => res + v1[i] * v2[i], 0);
};

export const norm = (a: number[]) => {
  return Math.sqrt(a.reduce((s, c) => s + Math.pow(c, 2), 0));
};

export const cosineSimilarity = (v1: number[], v2: number[]) => {
  const denominator = norm(v1) * norm(v2);
  return denominator !== 0 ? dot(v1, v2) / denominator : 0;
};

export const charHistogram = (text: string) => {
  // prettier-ignore
  const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','å','ä','ö'];
  const histogram = chars.map((_) => 0);

  const textChars = text.toLowerCase().split('');
  for (const char of textChars) {
    const i = chars.findIndex((c) => c === char);
    if (i >= 0) histogram[i] += 1;
  }

  return histogram;
};

export const sentenceSimilarity = (s1: string, s2: string) => {
  const s1Words = s1.replaceAll(/[^A-ZÅÄÖa-zåäö\s]+/g, '').split(' ');
  const s2Words = s2.replaceAll(/[^A-ZÅÄÖa-zåäö\s]+/g, '').split(' ');

  const s1Histograms = s1Words.map((w) => charHistogram(w));
  const s2Histograms = s2Words.map((w) => charHistogram(w));

  const sMatrix = s1Histograms.map((h1, i1) =>
    s2Histograms.map((h2, i2) => {
      const l1 = s1Words[i1].length;
      const l2 = s2Words[i2].length;
      const multiplier = l1 < l2 ? l1 / l2 : l2 / l1;
      return cosineSimilarity(h1, h2) * multiplier;
    }),
  );

  const rMatrix = sMatrix.map((r) => r.map((_) => 0));

  for (let row = 0; row < sMatrix.length; row++) {
    const maxInd = sMatrix[row].reduce((mi, v, i) => (v > sMatrix[row][mi] ? i : mi), 0);
    rMatrix[row][maxInd] = sMatrix[row][maxInd];
  }

  const maxValues: number[] = [];

  for (let row = 0; row < rMatrix.length; row++) {
    for (let col = 0; col < rMatrix[row].length; col++) {
      if (!maxValues[col] || maxValues[col] < rMatrix[row][col]) {
        maxValues[col] = rMatrix[row][col];
      }
    }
  }

  const threshold = 0.7;
  const result = maxValues.reduce((r: number[], c) => (c > threshold ? [...r, c] : r), []);
  return result.reduce((s, c) => s + c, 0) * (result.length / s2Words.length);
};

export const randomEntry = <T>(arr: T[]): T | undefined => {
  if (!arr) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};
