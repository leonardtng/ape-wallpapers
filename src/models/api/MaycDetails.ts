import { GenericState } from "..";

export interface MaycTraits {
  traitType: string;
  value: string;
}

export interface MaycDetails {
  image: string;
  attributes: MaycTraits[];
}

export interface MaycDetailsState extends GenericState<MaycDetails | null> {}
