import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
