import {Model} from "@core/models/interface/model.interface";

export interface Office extends Model {
  id?: number
  name: string
  street: string
  city: string
  zipcode: string
  country: string
}
