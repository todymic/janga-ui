import {AuthRequest} from "@core/services/interface/auth-request";

export interface LoginRequest extends AuthRequest {
  email: string,
  password: string,
}

