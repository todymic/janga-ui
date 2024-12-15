import {Reason} from "@core/models/reason";

export interface StatusResponse {
  status: boolean
}
export interface GetReasonResponse extends StatusResponse {
  reasons: Reason[]
}
