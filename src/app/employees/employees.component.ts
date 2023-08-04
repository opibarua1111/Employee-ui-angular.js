import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  @Input() employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    salary: '',
    age: '',
    description: '',
    designation: '',
    status: '',
  };
  employees: Employee[] = [];
  message = '';
  Page = 1;
  Size = 10;
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute
  ) {}

  public AddDesignationQuery(event: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        Designation: event.value,
      },
      queryParamsHandling: 'merge',
    });
  }
  public AddNameQuery(event: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        SearchName: event.value,
      },
      queryParamsHandling: 'merge',
    });
  }
  public AddMinAgeQuery(event: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        MinAge: event.value,
      },
      queryParamsHandling: 'merge',
    });
  }
  public AddMaxAgeQuery(event: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        MaxAge: event.value,
      },
      queryParamsHandling: 'merge',
    });
  }
  public AddPageQuery(pageNo: any) {
    this.Page = pageNo;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        Page: pageNo,
      },
      queryParamsHandling: 'merge',
    });
  }
  public deleteEmployee(id: any) {
    this.navigationService.deleteEmployee(id).subscribe((res: any) => {
      this.message = res.toString();
      this.employees = this.employees.filter((employee) => employee.id != id);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let Page = params.Page;
      let SearchName = params.SearchName;
      let Designation = params.Designation;
      let MinAge = params.MinAge;
      let MaxAge = params.MaxAge;
      let Size = this.Size;
      if (Page || SearchName || Designation || MinAge || MaxAge || Size) {
        this.navigationService
          .getQueryEmployees(
            Page,
            SearchName,
            Designation,
            MinAge,
            MaxAge,
            Size
          )
          .subscribe((res: any) => {
            this.employees = res;
          });
      }
    });
  }
}
