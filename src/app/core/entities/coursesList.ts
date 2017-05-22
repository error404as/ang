import { CourseItem } from '.';

export class CoursesList {
     constructor(
          public page: number,
          public items: CourseItem[]
      ) { }
}
