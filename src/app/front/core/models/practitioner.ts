
import {Appointment} from "@core/models/appointment";
import {Speciality} from "@core/models/speciality";
import {Office} from "@core/models/office";

export interface Practitioner {
  id?: string,
  firstname: string;
  lastname: string;
  email: string;
  description?: string|null;
  active?: boolean;
  degrees?: string;
  languages?: string[] | null;
  specialities?: Speciality[] | null;
  offices: Office[],
  appointments: Appointment[]

}
