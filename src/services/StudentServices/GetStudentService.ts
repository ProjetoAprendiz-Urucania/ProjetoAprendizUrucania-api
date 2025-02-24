import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  STUDENT_NOT_FOUND: "Student not found.",
  STUDENTS_NOT_FOUND: "No students found.",
  INVALID_STUDENT_ID: "Invalid student ID.",
  INTERNAL_ERROR: "An error occurred while fetching student data.",
};

export class GetStudentService {
  async execute(studentId?: string) {
    try {
      if (studentId && typeof studentId !== "string") {
        throw new Error(ERROR_MESSAGES.INVALID_STUDENT_ID);
      }

      if (studentId) {
        const studentData = await prismaClient.user.findUnique({
          where: {
            id: studentId,
          },
        });

        if (!studentData) {
          throw new Error(ERROR_MESSAGES.STUDENT_NOT_FOUND);
        }

        return studentData;
      }

      const students = await prismaClient.user.findMany();

      if (students.length === 0) {
        throw new Error(ERROR_MESSAGES.STUDENTS_NOT_FOUND);
      }

      return students;
    } catch (err) {
      throw new Error(
        `${ERROR_MESSAGES.INTERNAL_ERROR} ${(err as Error).message}`
      );
    }
  }
}