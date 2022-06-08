export interface UserInputState {
  nftMode: "bayc" | "mayc";
  imageDisplayMode: "preview" | "jpeg";
  showLockscreenOverlay: boolean;

  isGeneratingBaycImage: boolean;
  selectedBaycId: number;
  generatedBaycBackground: string;
  selectedBaycLogoOverlay:
    | "none"
    | "black"
    | "white"
    | "apeFestDefault"
    | "apeFest1"
    | "apeFest2"
    | "apeFest3"
    | "apeFest4";

  isGeneratingMaycImage: boolean;
  selectedMaycId: number;
  generatedMaycBackground: string;
  selectedMaycLogoOverlay:
    | "none"
    | "slime"
    | "black"
    | "white"
    | "apeFestDefault"
    | "apeFest1"
    | "apeFest2"
    | "apeFest3"
    | "apeFest4";
}
