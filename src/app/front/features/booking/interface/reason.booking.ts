import { StepBooking } from "@core/utilities/type";
import {Reason} from "@core/models/reason";

export interface ReasonBooking extends StepBooking {
  reason: Reason
}
