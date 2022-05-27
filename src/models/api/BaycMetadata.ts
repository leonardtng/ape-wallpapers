import { GenericState } from "..";

export interface BaycTraits {
  Background: string;
  Hat: string;
  Eyes: string;
  Clothes: string;
  Mouth: string;
  Fur: string;
}

export interface Bayc {
  tokenId: number;
  image: string;
  imageHash: string;
  traits: BaycTraits;
}

export interface BaycMetadata {
  provenance: string;
  collection: Bayc[];
}

export interface BaycMetadataState extends GenericState<BaycMetadata | null> {
  selectedBaycId: number;
}
