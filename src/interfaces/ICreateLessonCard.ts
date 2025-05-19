import { TheoryMaterial } from "@prisma/client";

export interface ICreateLessonCard {
    name: string;
    teacher: string;
    lessonLink: string;
    theoryMaterials?: TheoryMaterial[];
}