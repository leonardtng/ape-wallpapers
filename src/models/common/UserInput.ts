export interface UserInputState {
  nftMode: "bayc" | "mayc";
  imageDisplayMode: "preview" | "jpg";
  showLockscreenOverlay: boolean;
  isGeneratingImage: boolean;
  selectedBaycId: number;
  generatedBaycBackground: string;
}
