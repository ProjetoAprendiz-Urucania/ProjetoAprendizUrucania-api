export interface IStudent {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  church?: string;
  status: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  classId?: string;
}
