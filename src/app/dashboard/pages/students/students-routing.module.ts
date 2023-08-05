import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StudentsComponent } from "./students.component";
import { StudentDetailComponent } from "./student-detail/student-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: StudentsComponent,
            },
            {
                path: ':id',
                component: StudentDetailComponent
            },
        ]),
    ],
    exports: [RouterModule],
})

export class StudentsRoutingModule {}