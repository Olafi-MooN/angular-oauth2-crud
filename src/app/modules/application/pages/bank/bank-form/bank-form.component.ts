import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../../service/bank.service';
import { IStatus } from '../../../models/bank';
import { AuthService } from '../../../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss'],
})
export class BankFormComponent implements OnInit {
  public bankForm: UntypedFormGroup = {} as UntypedFormGroup;
  public bankStatus: IStatus[] = [
    { descricao: 'INATIVO', id: 'I' },
    { descricao: 'ATIVO', id: 'A' },
  ];
  public title: string = '';
  public hasPermissionUpdAdd = this.authService.checkRolePermission([
    'ROLE_BANCO_UPD',
    'ROLE_BANCO_ADD',
  ]);
  public id: string = '';

  constructor(
    private router: Router,
    private bankService: BankService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.title = this.hasPermissionUpdAdd
        ? 'Editar banco'
        : 'Visualizar banco';

      this.getBankById(this.id);
    } else {
      this.title = 'Novo banco';
    }
  }

  public getBankById(id: string) {
    this.bankService.getById(id).subscribe((data) => {
      this.bankForm.patchValue(data);
    });
  }

  public deleteBankById(id: string) {
    this.bankService.deleteById(id).subscribe((data) => {
      this.toastr.success('Banco deletado criado com sucesso!', 'Sucesso');
      this.router.navigate(['/application/bank']);
    });
  }

  public async onSubmit() {
    if (this.bankForm.valid) {
      const createOrUpdate = !this.id
        ? this.bankService.create(this.bankForm.value)
        : this.bankService.update({ id: this.id, ...this.bankForm.value });
      createOrUpdate.subscribe((data) => {
        if (data.id) {
          this.toastr.success('Banco criado', 'Sucesso');
        } else {
          this.toastr.error('Não foi possível adicionar o banco!', 'Error');
        }
      });
      this.router.navigate(['/application/bank']);
    }
  }

  private buildForm(): void {
    this.bankForm = new UntypedFormGroup({
      codigo: new UntypedFormControl(
        { value: '', disabled: !this.hasPermissionUpdAdd },
        { validators: Validators.required }
      ),
      descricao: new UntypedFormControl(
        { value: '', disabled: !this.hasPermissionUpdAdd },
        {
          validators: Validators.required,
        }
      ),
      status: new UntypedFormControl(
        { value: '', disabled: !this.hasPermissionUpdAdd },
        { validators: Validators.required }
      ),
    });
  }
}
