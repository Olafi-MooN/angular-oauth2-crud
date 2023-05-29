import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appRolePermission]',
})
export class RolePermissionDirective {
  @Input('appRolePermission') rolePermission: string[] = []; // Recebe a permissão necessária para acessar o elemento

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const hasPermission = this.authService.checkRolePermission(
      this.rolePermission!
    );

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.element.nativeElement.disabled = true;
    }
  }
}
