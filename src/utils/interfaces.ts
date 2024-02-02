export interface UserProps {
  username: string;
  password: string;
}

export interface StudentProps {
  name: string;
  email: string;
  academicRecord: string;
  documentNumber: string;
}

export interface ClassroomProps {
  name: string;
  teacher: string;
}

export interface EnrollmentProps {
  studentId: string;
  classroomId: string;
}
