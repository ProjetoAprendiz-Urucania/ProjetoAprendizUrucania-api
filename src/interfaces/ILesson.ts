import { ITheoryMaterial } from "./ITheoryMaterial";

export interface ILesson {
  id: string;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
  teachers: string;
  coverImage: string;
  lessonLink: string;
  theoryMaterials: ITheoryMaterial[];
  classId: string;
}
