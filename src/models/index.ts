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
import { UserInputState as UserInputStateInterface } from "./common/UserInput";

export type Status = StatusInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type BaycTraits = BaycTraitsInterface;
export type Bayc = BaycInterface;
export type BaycMetadata = BaycMetadataInterface;
export type BaycMetadataState = BaycMetadataStateInterface;
export type UserInputState = UserInputStateInterface;
