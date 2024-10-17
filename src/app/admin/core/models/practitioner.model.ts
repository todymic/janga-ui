import {Practitioner as IPractitioner} from "../interfaces/practitioner.interface";
import {Language} from "../interfaces/language.interface";
import {Speciality} from "../interfaces/speciality.interface";
import {Office} from "../interfaces/office.interface";

export class Practitioner implements IPractitioner {
  id!: string;
  active!: boolean;
  degrees!: string;
  description!: string | null;
  email!: string;
  firstname!: string;
  languages!: Language[] | null;
  lastname!: string;
  specialities!: Speciality[] | null;
  office!: Office;

  static fromJson(practitionerJson: IPractitioner): Practitioner {
    return Object.assign(new Practitioner(), practitionerJson)
  }

  static toJson(): IPractitioner {
    const practitioner: IPractitioner = Object.assign(new Practitioner(), this);
    delete practitioner.id;

    return practitioner;
  }

}
