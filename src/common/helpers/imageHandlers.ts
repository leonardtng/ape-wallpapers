import BaycPurple from "../../assets/bayc/bayc-backgrounds/bayc-purple.png";
import BaycYellow from "../../assets/bayc/bayc-backgrounds/bayc-yellow.png";
import BaycAquamarine from "../../assets/bayc/bayc-backgrounds/bayc-aquamarine.png";
import BaycArmyGreen from "../../assets/bayc/bayc-backgrounds/bayc-yellow.png";
import BaycBlue from "../../assets/bayc/bayc-backgrounds/bayc-blue.png";
import BaycGray from "../../assets/bayc/bayc-backgrounds/bayc-gray.png";
import BaycNewPunkBlue from "../../assets/bayc/bayc-backgrounds/bayc-new-punk-blue.png";
import BaycOrange from "../../assets/bayc/bayc-backgrounds/bayc-orange.png";

import BaycLogoBlack from "../../assets/bayc-logo-overlay/bayc-logo-black.png";
import BaycLogoWhite from "../../assets/bayc-logo-overlay/bayc-logo-white.png";
import { UserInputState } from "../../models/common/UserInput";

export const getBackground = (type: "bayc" | "mayc", background: string) => {
  switch (background) {
    case "Purple":
      return BaycPurple;
    case "Yellow":
      return BaycYellow;
    case "Aquamarine":
      return BaycAquamarine;
    case "Bayc Army Green":
      return BaycArmyGreen;
    case "Blue":
      return BaycBlue;
    case "Gray":
      return BaycGray;
    case "New Punk Blue":
      return BaycNewPunkBlue;
    case "Orange":
      return BaycOrange;
    default:
      return BaycPurple;
  }
};

export const getLogoOverlay = (
  type: "bayc" | "mayc",
  logoOverlay: UserInputState["selectedBaycLogoOverlay"]
) => {
  switch (logoOverlay) {
    case "baycLogoBlack":
      return BaycLogoBlack;
    case "baycLogoWhite":
      return BaycLogoWhite;
    default:
      return BaycLogoBlack;
  }
};

export const toDataURL = (
  url: string,
  callback: (result: string | ArrayBuffer | null) => void
) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};
