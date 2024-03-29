import mergeImages from "merge-images";
import html2canvas from "html2canvas";
import { TextObject } from "../../models";

// Mockup and Overlay
import Mockup from "../../assets/mockup.png";
import Overlay from "../../assets/overlay.png";

// BAYC Backgrounds
import BaycPurple from "../../assets/backgrounds/bayc/bayc-purple.png";
import BaycYellow from "../../assets/backgrounds/bayc/bayc-yellow.png";
import BaycAquamarine from "../../assets/backgrounds/bayc/bayc-aquamarine.png";
import BaycArmyGreen from "../../assets/backgrounds/bayc/bayc-army-green.png";
import BaycBlue from "../../assets/backgrounds/bayc/bayc-blue.png";
import BaycGray from "../../assets/backgrounds/bayc/bayc-gray.png";
import BaycNewPunkBlue from "../../assets/backgrounds/bayc/bayc-new-punk-blue.png";
import BaycOrange from "../../assets/backgrounds/bayc/bayc-orange.png";

// MAYC Backgrounds
import MaycPurple from "../../assets/backgrounds/mayc/mayc-purple.png";
import MaycYellow from "../../assets/backgrounds/mayc/mayc-yellow.png";
import MaycAquamarine from "../../assets/backgrounds/mayc/mayc-aquamarine.png";
import MaycArmyGreen from "../../assets/backgrounds/mayc/mayc-army-green.png";
import MaycBlue from "../../assets/backgrounds/mayc/mayc-blue.png";
import MaycGray from "../../assets/backgrounds/mayc/mayc-gray.png";
import MaycNewPunkBlue from "../../assets/backgrounds/mayc/mayc-new-punk-blue.png";
import MaycOrange from "../../assets/backgrounds/mayc/mayc-orange.png";
import MaycMega from "../../assets/backgrounds/mayc/mayc-mega.png";

// BAYC Logo Overlays
import BaycLogoBlack from "../../assets/logo-overlays/bayc/bayc-logo-black.png";
import BaycLogoWhite from "../../assets/logo-overlays/bayc/bayc-logo-white.png";

// MAYC Logo Overlays
import MaycLogoSlime from "../../assets/logo-overlays/mayc/mayc-logo-slime.png";
import MaycLogoBlack from "../../assets/logo-overlays/mayc/mayc-logo-black.png";
import MaycLogoWhite from "../../assets/logo-overlays/mayc/mayc-logo-white.png";

// Shared Logo Overlays
import ApeFestDefault from "../../assets/logo-overlays/apefest-default.png";
import ApeFest1 from "../../assets/logo-overlays/apefest1.png";
import ApeFest2 from "../../assets/logo-overlays/apefest2.png";
import ApeFest3 from "../../assets/logo-overlays/apefest3.png";
import ApeFest4 from "../../assets/logo-overlays/apefest4.png";

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
  switch (logoOverlay) {
    case "black":
      return type === "bayc" ? BaycLogoBlack : MaycLogoBlack;
    case "white":
      return type === "bayc" ? BaycLogoWhite : MaycLogoWhite;
    case "slime":
      return MaycLogoSlime;
    case "apeFestDefault":
      return ApeFestDefault;
    case "apeFest1":
      return ApeFest1;
    case "apeFest2":
      return ApeFest2;
    case "apeFest3":
      return ApeFest3;
    case "apeFest4":
      return ApeFest4;
    default:
      return "none";
  }
};

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

export const getCustomTextColor = (overlay: string) => {
  switch (overlay) {
    case "black":
      return "#000000";
    case "white":
      return "#ffffff";
    case "slime":
      return "#D0DE40";
    case "apeFestDefault":
    case "apeFest1":
    case "apeFest2":
    case "apeFest3":
    case "apeFest4":
      return "#FBB50F";
    default:
      return "#ffffff";
  }
};

interface ImageGenerationParams {
  ipfsUrl: string;
  background: string;
  overlay: string;
  handleResults: (
    generatedImage: string,
    withoutOverlay: string,
    withOverlay: string
  ) => void;
  customText: TextObject;
  leftOffset: boolean;
  handleImageError: (error: Error) => void;
}

export const generateImage = (params: ImageGenerationParams) => {
  const {
    ipfsUrl,
    background,
    overlay,
    handleResults,
    customText,
    leftOffset,
    handleImageError,
  } = params;

  const mergeImageChain = (
    dataUrl: string | ArrayBuffer | null,
    textCanvas?: HTMLCanvasElement
  ) => {
    mergeImages(
      [
        {
          src: background,
          x: 0,
          y: 0,
        },
        {
          src: dataUrl as string,
          x: leftOffset ? -76 : -56,
          y: 1157,
        },
        ...(textCanvas
          ? [
              {
                src: textCanvas.toDataURL(),
                x: 0,
                y:
                  overlay === "none"
                    ? 900
                    : overlay.includes("mayc")
                    ? 1050
                    : 1020,
              },
            ]
          : []),
        ...(overlay !== "none"
          ? [
              {
                src: overlay,
                x: 0,
                y: textCanvas ? -40 : 0,
              },
            ]
          : []),
      ],
      { width: 1151, height: 2419 }
    )
      .then((generatedImage) => {
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
      })
      .catch(handleImageError);
  };

  toDataURL(ipfsUrl, function (dataUrl: string | ArrayBuffer | null) {
    if (customText.content.length === 0 || overlay === "none") {
      mergeImageChain(dataUrl);
    } else {
      var customElement = document.createElement("div");
      customElement.innerHTML = customText.content;

      Object.assign(customElement.style, {
        fontSize: "64px",
        // fontSize: overlay === "none" ? "112px" : "64px",
        width: "1151px",
        textAlign: "center",
        color: customText.color,
      });

      document.body.appendChild(customElement);

      html2canvas(customElement, { backgroundColor: null, scale: 1 }).then(
        (textCanvas) => {
          mergeImageChain(dataUrl, textCanvas);
        }
      );

      document.body.removeChild(customElement);
    }
  });
};
