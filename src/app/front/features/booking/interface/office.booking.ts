import {Office} from "@core/models/office";
import {StepBooking} from "@features/booking/interface/step.booking";

export interface OfficeBooking extends StepBooking {
  office: Office
}
