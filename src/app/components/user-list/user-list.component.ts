import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  searchValue = '';

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
      this.loadUsers();
    }
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '250px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result);
        this.loadUsers();
      }
    });
  }

  searchUsers(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.users = this.userService.getUsers().filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }


}
