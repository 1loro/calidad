export interface Resident {
  id: string;
  name: string;
  dateOfBirth: string;
  photo: string;
  medicalConditions: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medications: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    schedule: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
    taken: boolean;
    lastTakenTime?: string;
  }[];
  // Agrega esta línea para la propiedad `lastExam`
  lastExam?: File | null; // Añade esta propiedad como opcional
}
