import BaycPurple from "../../assets/bayc-backgrounds/bayc-purple.png";
import BaycYellow from "../../assets/bayc-backgrounds/bayc-yellow.png";
import BaycAquamarine from "../../assets/bayc-backgrounds/bayc-aquamarine.png";
import BaycArmyGreen from "../../assets/bayc-backgrounds/bayc-yellow.png";
import BaycBlue from "../../assets/bayc-backgrounds/bayc-blue.png";
import BaycGray from "../../assets/bayc-backgrounds/bayc-gray.png";
import BaycNewPunkBlue from "../../assets/bayc-backgrounds/bayc-new-punk-blue.png";
import BaycOrange from "../../assets/bayc-backgrounds/bayc-orange.png";

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
