import {Address} from "@admin/core/interfaces/address.interface";
import {Model} from "@core/models/interface/model.interface";

export interface Office extends Model {
  id?: number
  name: string
  phone: string
  information: string
  description: string
  address: Address

}
