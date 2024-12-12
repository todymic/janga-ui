import {Office} from "@core/models/office";
import {StepBooking} from "@core/utilities/type";


export interface OfficeBooking extends StepBooking {
  office: Office
}
