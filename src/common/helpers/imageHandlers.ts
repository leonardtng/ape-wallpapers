import mergeImages from "merge-images";

// Mockup and Overlay
import Mockup from "../../assets/mockup.png";
import Overlay from "../../assets/overlay.png";

// BAYC Backgrounds
import BaycPurple from "../../assets/bayc/bayc-backgrounds/bayc-purple.png";
import BaycYellow from "../../assets/bayc/bayc-backgrounds/bayc-yellow.png";
import BaycAquamarine from "../../assets/bayc/bayc-backgrounds/bayc-aquamarine.png";
import BaycArmyGreen from "../../assets/bayc/bayc-backgrounds/bayc-army-green.png";
import BaycBlue from "../../assets/bayc/bayc-backgrounds/bayc-blue.png";
import BaycGray from "../../assets/bayc/bayc-backgrounds/bayc-gray.png";
import BaycNewPunkBlue from "../../assets/bayc/bayc-backgrounds/bayc-new-punk-blue.png";
import BaycOrange from "../../assets/bayc/bayc-backgrounds/bayc-orange.png";

// MAYC Backgrounds
import MaycPurple from "../../assets/mayc/mayc-backgrounds/mayc-purple.png";
import MaycYellow from "../../assets/mayc/mayc-backgrounds/mayc-yellow.png";
import MaycAquamarine from "../../assets/mayc/mayc-backgrounds/mayc-aquamarine.png";
import MaycArmyGreen from "../../assets/mayc/mayc-backgrounds/mayc-army-green.png";
import MaycBlue from "../../assets/mayc/mayc-backgrounds/mayc-blue.png";
import MaycGray from "../../assets/mayc/mayc-backgrounds/mayc-gray.png";
import MaycNewPunkBlue from "../../assets/mayc/mayc-backgrounds/mayc-new-punk-blue.png";
import MaycOrange from "../../assets/mayc/mayc-backgrounds/mayc-orange.png";
import MaycMega from "../../assets/mayc/mayc-backgrounds/mayc-mega.png";

// BAYC Logo Overlays
import BaycLogoBlack from "../../assets/bayc/bayc-logo-overlay/bayc-logo-black.png";
import BaycLogoWhite from "../../assets/bayc/bayc-logo-overlay/bayc-logo-white.png";

// MAYC Logo Overlays
import MaycLogoSlime from "../../assets/mayc/mayc-logo-overlay/mayc-logo-slime.png";
import MaycLogoBlack from "../../assets/mayc/mayc-logo-overlay/mayc-logo-black.png";
import MaycLogoWhite from "../../assets/mayc/mayc-logo-overlay/mayc-logo-white.png";

export const getBackground = (
  type: "bayc" | "mayc",
  background: string | undefined
) => {
  switch (type) {
    case "bayc":
      switch (background) {
        case "Purple":
          return BaycPurple;
        case "Yellow":
          return BaycYellow;
        case "Aquamarine":
          return BaycAquamarine;
        case "Army Green":
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
    case "mayc":
      switch (background) {
        case "M1 Purple":
        case "M2 Purple":
          return MaycPurple;
        case "M1 Yellow":
        case "M2 Yellow":
          return MaycYellow;
        case "M1 Aquamarine":
        case "M2 Aquamarine":
          return MaycAquamarine;
        case "M1 Army Green":
        case "M2 Army Green":
          return MaycArmyGreen;
        case "M1 Blue":
        case "M2 Blue":
          return MaycBlue;
        case "M1 Gray":
        case "M2 Gray":
          return MaycGray;
        case "M1 New Punk Blue":
        case "M2 New Punk Blue":
          return MaycNewPunkBlue;
        case "M1 Orange":
        case "M2 Orange":
          return MaycOrange;
        default:
          return MaycMega;
      }
    default:
      return BaycPurple;
  }
};

export const getLogoOverlay = (type: "bayc" | "mayc", logoOverlay: string) => {
  switch (type) {
    case "bayc":
      switch (logoOverlay) {
        case "baycLogoBlack":
          return BaycLogoBlack;
        case "baycLogoWhite":
          return BaycLogoWhite;
        default:
          return "none";
      }
    case "mayc":
      switch (logoOverlay) {
        case "maycLogoSlime":
          return MaycLogoSlime;
        case "maycLogoBlack":
          return MaycLogoBlack;
        case "maycLogoWhite":
          return MaycLogoWhite;
        default:
          return "none";
      }
    default:
      return "none";
  }
};

export const generateImage = (
  ipfsUrl: string,
  background: string,
  overlay: string,
  handleResults: (
    generatedImage: string,
    withoutOverlay: string,
    withOverlay: string
  ) => void
) => {
  const toDataURL = (
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

  toDataURL(ipfsUrl, function (dataUrl: string | ArrayBuffer | null) {
    mergeImages(
      [
        {
          src: background,
          x: 0,
          y: 0,
        },
        {
          src: dataUrl as string,
          x: -56,
          y: 1157,
        },
        ...(overlay !== "none"
          ? [
              {
                src: overlay,
                x: 0,
                y: 0,
              },
            ]
          : []),
      ],
      { width: 1151, height: 2419 }
    ).then((generatedImage) => {
      mergeImages([
        {
          src: generatedImage,
          x: 155,
          y: 166,
        },
        {
          src: Mockup,
          x: 0,
          y: 0,
        },
      ]).then((withoutOverlay) => {
        mergeImages([
          {
            src: withoutOverlay,
            x: 0,
            y: 0,
          },
          {
            src: Overlay,
            x: 0,
            y: 0,
          },
        ]).then((withOverlay) => {
          handleResults(generatedImage, withoutOverlay, withOverlay);
        });
      });
    });
  });
};
