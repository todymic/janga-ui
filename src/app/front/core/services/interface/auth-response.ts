import {Model} from "@core/models/interface/model.interface";

export interface AuthResponse {
  user: Model,
  token: string
}
