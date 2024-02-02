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

// interfaces de controller
export interface ControllerProps {
  end?: () => void;
  body?: any;
  params?: {
    path?: {
      establishmentId?: string;
      boletoId?: string;
      addressId?: string;
      boletoOrderId?: string;
      transferOrderId?: string;
      shortUrlId?: string;
      cep?: string;
    };
    query?: {
      userId?: string;
      month?: string;
      email?: string;
    };
  };
  requestMetadata?: {
    clientIP: string;
    userAgent: string;
    userId?: string;
  };
  headers?: any;
}
