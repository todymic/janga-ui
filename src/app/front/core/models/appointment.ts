export interface Appointment {
  officeId?: number,
  practitionerId: number,
  patientId?: number,
  reasonId?: number,
  relation?: string,
  date?: Date,
  visio?: boolean,
  patientNote?: string
}
