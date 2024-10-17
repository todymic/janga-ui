import {Practitioner} from "./practitioner.interface";
export interface GetPractitionerResponse {
  status: boolean,
  practitioner: Practitioner;
}

export interface GetPractitionersResponse {
  status: boolean,
  practitioners: Practitioner[];
}

export interface StatusExceptedResponse {
  status: boolean,
  message: string
}

