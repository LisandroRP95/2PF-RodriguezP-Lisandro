import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent,
            },
            {
                path: ':id',
                component: UserDetailComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})

export class UsersRoutingModule {}