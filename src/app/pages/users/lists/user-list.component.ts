import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from "@angular/core"
import { UsersResDto } from "../../../dto/user/users.res.dto"
import { UserService } from "../../../services/user.service"

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{

    users!: UsersResDto[] 

    constructor(private userService: UserService){ }

    ngOnInit() {
        this.getData()
    }

    getData(){
        this.userService.getAll('',true).subscribe(result => {
            this.users = result
        })
    }
}