import { IStudent } from "./IStudent";
import { ILesson } from "./ILesson";

export interface IClass {
  id: string;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
  teachers: string;
  coverImage: string;
  students?: IStudent[];
  lessons?: ILesson[];
}
