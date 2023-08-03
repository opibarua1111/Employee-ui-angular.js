import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenEditEmployee]',
})
export class OpenEditEmployeeDirective {
  @Input() employeeId: string = '';
  @HostListener('click') openProductDetails() {
    window.scrollTo(0, 0);
    this.router.navigate(['/edit-employee'], {
      queryParams: {
        id: this.employeeId,
      },
    });
  }
  constructor(private router: Router) {}
}
