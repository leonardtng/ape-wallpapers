import {
  Status as StatusInterface,
  GenericState as GenericStateInterface,
} from "./common/GenericState";
import {
  BaycTraits as BaycTraitsInterface,
  Bayc as BaycInterface,
  BaycMetadata as BaycMetadataInterface,
  BaycMetadataState as BaycMetadataStateInterface,
} from "./api/BaycMetadata";
import {
  MaycTraits as MaycTraitsInterface,
  MaycDetails as MaycDetailsInterface,
  MaycDetailsState as MaycDetailsStateInterface,
} from "./api/MaycDetails";
import { UserInputState as UserInputStateInterface } from "./common/UserInput";

export type Status = StatusInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type BaycTraits = BaycTraitsInterface;
export type Bayc = BaycInterface;
export type BaycMetadata = BaycMetadataInterface;
export type BaycMetadataState = BaycMetadataStateInterface;
export type MaycTraits = MaycTraitsInterface;
export type MaycDetails = MaycDetailsInterface;
export type MaycDetailsState = MaycDetailsStateInterface;
export type UserInputState = UserInputStateInterface;
