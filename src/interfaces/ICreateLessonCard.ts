import { TheoryMaterial } from "@prisma/client";

export interface ICreateLessonCard {
    name: string;
    teacher: string;
    coverImage?: string;
    lessonLink: string;
    theoryMaterials?: TheoryMaterial[];
}