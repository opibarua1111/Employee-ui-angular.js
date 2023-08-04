import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  addEmployeeForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      description: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
  }

  addEmployee() {
    let employee: Employee = {
      id: '',
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      salary: this.Salary.value,
      age: this.Age.value,
      designation: this.Designation.value,
      description: this.Description.value,
      status: '',
    };
    this.navigationService.addEmployee(employee).subscribe((res: any) => {
      this.message = res.toString();
      setTimeout(() => {
        this.router.navigateByUrl('/employees?Page=1');
      }, 5000);
    });
  }

  // Region Getters
  get FirstName(): FormControl {
    return this.addEmployeeForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.addEmployeeForm.get('lastName') as FormControl;
  }
  get Description(): FormControl {
    return this.addEmployeeForm.get('description') as FormControl;
  }
  get Salary(): FormControl {
    return this.addEmployeeForm.get('salary') as FormControl;
  }
  get Age(): FormControl {
    return this.addEmployeeForm.get('age') as FormControl;
  }
  get Designation(): FormControl {
    return this.addEmployeeForm.get('designation') as FormControl;
  }
}
