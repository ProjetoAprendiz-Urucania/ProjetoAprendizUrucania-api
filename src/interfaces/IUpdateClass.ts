import { Lesson, Student } from "@prisma/client";

export interface IUpdateClass {
    name: string;
    teachers: string;
    coverImage: string;
    students: Student[];
    lessons: Lesson[];
}