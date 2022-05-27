import { GenericState } from "..";

export interface BaycTraits {
  background: string;
  hat: string;
  eyes: string;
  clothes: string;
  mouth: string;
  fur: string;
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

export interface BaycMetadataState extends GenericState<BaycMetadata | null> {}
