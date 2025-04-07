import { TheoryMaterial } from "@prisma/client";

export interface IUpdateLessonCard {
    name?: string;
    teacher?: string;
    coverImage?: string;
    lessonLink?: string;
    theoryMaterials?: TheoryMaterial[];
}