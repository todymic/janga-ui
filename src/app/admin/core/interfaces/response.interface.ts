import {Practitioner} from "./practitioner.interface";
import {Office} from "./office.interface";
import {Language} from "./language.interface";
import {Speciality} from "./speciality.interface";
export interface GetPractitionerResponse {
  status: boolean,
  practitioner: Practitioner;
}

export interface GetPractitionersResponse {
  status: boolean,
  practitioners: Practitioner[];
}

// Office API response
export interface GetOfficeResponse {
  status: boolean,
  office: Office;
}

export interface GetOfficesResponse {
  status: boolean,
  offices: Office[];
}

// Language API response
export interface GetLanguageResponse {
  status: boolean,
  language: Language;
}

export interface GetLanguagesResponse {
  status: boolean,
  languages: Language[];
}

// Speciality API response
export interface GetSpecialityResponse {
  status: boolean,
  speciality: Speciality;
}

export interface GetSpecialitiesResponse {
  status: boolean,
  specialities: Speciality[];
}
export interface StatusExceptedResponse {
  status: boolean,
  message: string
}




