export interface Appointment {
  officeId?: number,
  practitionerId: number,
  patientId?: number,
  reasonId?: number,
  relation?: number,
  date?: Date,
  visio?: boolean,
  patientNote?: string
}
