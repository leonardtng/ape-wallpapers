export const ipfs = {
  baycMetadata: "QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
  // baycImage: (baycId: number) =>
  //   `QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ/${baycId}.png`,
  maycImage: (maycImageHash: string) => `${maycImageHash}`,
};

export const bayc = {
  maycDetails: (maycId: number) => `mutants/${maycId}`,
};
