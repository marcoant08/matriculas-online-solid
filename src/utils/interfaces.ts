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

export interface ControllerResponse {
  statusCode: number;
  data?: any;
  headers?: any;
}

export interface ControllerProps {
  end?: () => void;
  body?: any;
  params?: {
    path?: {
      studentId?: string;
      enrollmentId?: string;
    };
    query?: any;
  };
  headers?: any;
}
