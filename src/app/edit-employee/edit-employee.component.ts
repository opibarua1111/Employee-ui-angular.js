import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent {
  editEmployeeForm!: FormGroup;
  message = '';
  employee!: Employee;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getEmployee(id).subscribe((res: any) => {
        this.employee = res;
      });
    });
    this.editEmployeeForm = this.fb.group({
      firstName: [
        '',
        [Validators.minLength(2), Validators.pattern('[a-zA-Z].*')],
      ],
      lastName: [
        '',
        [Validators.minLength(2), Validators.pattern('[a-zA-Z].*')],
      ],
      description: [''],
      salary: [''],
      age: [''],
      designation: [''],
    });
  }

  editEmployee() {
    let id: any = this.employee.id;
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
    this.navigationService.editEmployee(employee, id).subscribe((res: any) => {
      this.message = res.toString();
      setTimeout(() => {
        this.router.navigateByUrl('/employees?Page=1');
      }, 5000);
    });
  }

  // Region Getters
  get FirstName(): FormControl {
    return this.editEmployeeForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.editEmployeeForm.get('lastName') as FormControl;
  }
  get Description(): FormControl {
    return this.editEmployeeForm.get('description') as FormControl;
  }
  get Salary(): FormControl {
    return this.editEmployeeForm.get('salary') as FormControl;
  }
  get Age(): FormControl {
    return this.editEmployeeForm.get('age') as FormControl;
  }
  get Designation(): FormControl {
    return this.editEmployeeForm.get('designation') as FormControl;
  }
}
