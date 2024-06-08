import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private nextId = 1;

  constructor() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
  }

  getUsers(): User[] {
    return [...this.users];
  }

  addUser(user: User): void {
    user.id = this.nextId++;
    this.users.push(user);
    this.saveToLocalStorage();
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveToLocalStorage();
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
