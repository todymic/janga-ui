import {Address} from "@admin/core/interfaces/address.interface";
import {Model} from "@core/models/interface/model.interface";

export interface Reason extends Model {
  id?: number
  type: string
  practitionerId?: number

}
