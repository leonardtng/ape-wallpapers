export interface UserInputState {
  nftMode: "bayc" | "mayc";
  imageDisplayMode: "preview" | "jpg";
  showLockscreenOverlay: boolean;

  isGeneratingBaycImage: boolean;
  selectedBaycId: number;
  generatedBaycBackground: string;
  selectedBaycLogoOverlay: "none" | "baycLogoBlack" | "baycLogoWhite";

  isGeneratingMaycImage: boolean;
  selectedMaycId: number;
  generatedMaycBackground: string;
  selectedMaycLogoOverlay:
    | "none"
    | "maycLogoSlime"
    | "maycLogoBlack"
    | "maycLogoWhite";
}
