import prismaClient from "../../prisma";

const ERROR_MESSAGES = {
  STUDENT_NOT_FOUND: "Student not found.",
  STUDENTS_NOT_FOUND: "No students found.",
  INVALID_STUDENT_ID: "Invalid student ID.",
  INTERNAL_ERROR: "An error occurred while fetching student data.",
};

export class GetStudentService {
  async execute(studentId?: string, studentEmail?: string) {
    try {
      if (
        (studentId && typeof studentId !== "string") ||
        (studentEmail && typeof studentEmail !== "string")
      ) {
        throw new Error(ERROR_MESSAGES.INVALID_STUDENT_ID);
      }

      if (studentId) {
        const studentData = await prismaClient.user.findUnique({
          where: { id: studentId },
        });

        if (studentData) return studentData;
      }

      if (studentEmail) {
        const studentData = await prismaClient.user.findUnique({
          where: { email: studentEmail },
        });

        if (studentData) return studentData;
      }

      const studentData = await prismaClient.user.findMany({
        where: { role: "student" },
      });

      if (studentData) {
        studentData.map((student) => {
          student.password = "";
        });
        return studentData;
      }

      throw new Error(ERROR_MESSAGES.STUDENT_NOT_FOUND);
    } catch (err) {
      throw new Error(
        `${ERROR_MESSAGES.INTERNAL_ERROR} ${(err as Error).message}`
      );
    }
  }
}
