import { Component, OnInit } from '@angular/core';
import { BankService } from '../../service/bank.service';
import { IBank, IBankFilter, IBankList } from '../../models/bank';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
  public banks: IBankList = {} as IBankList;

  public listPages: number[] = [];
  public pageNumber: number = 0;
  public interval: any;
  public totalPages: number = 0;
  public isLoading: boolean = false;

  constructor(
    private bankService: BankService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBanks();
  }

  public getBanks(params?: Partial<IBankFilter>) {
    this.isLoading = true;
    this.bankService.get(params).subscribe((data: any) => {
      this.banks = data;
      this.totalPages = data.totalPages;
      this.isLoading = false;
    });
  }

  public viewBankById(id: string) {
    this.router.navigate([`/application/bank/form/${id}`]);
  }

  public toggleSelectAll(target: EventTarget | null) {
    const checkbox = target as HTMLInputElement;
    this.banks.content.forEach((item) => (item.selected = checkbox.checked));
  }

  public setPageSelected(_pageNumber: number) {
    this.pageNumber = _pageNumber;
    this.getBanks({ pageNumber: _pageNumber });
  }

  public hasSelectedBanks(): boolean {
    return this?.banks?.content?.some((bank) => bank.selected!);
  }

  public everySelectedBanks(): boolean {
    return this?.banks?.content?.every((bank) => bank.selected);
  }

  public selectedBanks(): IBank[] {
    return this?.banks?.content?.filter((bank) => bank.selected);
  }

  public deleteSelectedBanks() {
    this.selectedBanks().map((bank) => {
      this.bankService.deleteById(bank.id).subscribe((data) => {
        this.toastr.success(
          `Banco ${bank.descricao} deletado com sucesso!`,
          'Sucesso'
        );
        this.getBanks({ pageNumber: this.pageNumber });
      });
    });
  }
  public buscar(input: EventTarget | null) {
    if (input) {
      clearInterval(this.interval);
      this.interval = setTimeout(
        () => this.getBanks({ descricao: (input as HTMLInputElement).value }),
        1000
      );
    }
  }
}
