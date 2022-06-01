export const ipfs = {
  baycMetadata: "Qme57kZ2VuVzcj5sC3tVHFgyyEgBTmAnyTK45YVNxKf6hi",
  baycImage: (baycId: number) =>
    `QmQ6VgRFiVTdKbiebxGvhW3Wa3Lkhpe6SkWBPjGnPkTttS/${baycId}.png`,
  maycImage: (maycImageHash: string) => `${maycImageHash}`,
};

export const bayc = {
  maycDetails: (maycId: number) => `mutants/${maycId}`,
};
