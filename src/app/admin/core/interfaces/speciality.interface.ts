import {Model} from "@core/models/interface/model.interface";

export interface Speciality extends Model {
  id?: number,
  name: string,
  slug: string
}
