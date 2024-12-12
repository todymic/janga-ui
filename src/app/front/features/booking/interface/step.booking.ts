import {ReasonComponent} from "@features/booking/reason/reason.component";
import {OfficeComponent} from "@features/booking/office/office.component";
import {AvailabilitiesComponent} from "@features/booking/availabilities/availabilities.component";
import {RelationComponent} from "@features/booking/relation/relation.component";
import {PatientComponent} from "@features/booking/patient/patient.component";

export interface Step {
  label: string,
  link: string,
  icon: string,
  component: typeof ReasonComponent | typeof OfficeComponent | typeof AvailabilitiesComponent | typeof RelationComponent | typeof PatientComponent
}

