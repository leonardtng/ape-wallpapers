import {
  Status as StatusInterface,
  GenericState as GenericStateInterface,
} from "./common/GenericState";
import {
  BaycMetadata as BaycMetadataInterface,
  BaycMetadataState as BaycMetadataStateInterface,
} from "./api/BaycMetadata";

export type Status = StatusInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type BaycMetadata = BaycMetadataInterface;
export type BaycMetadataState = BaycMetadataStateInterface;
