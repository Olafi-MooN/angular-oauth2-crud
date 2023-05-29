import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages: number = 0;
  @Output() onPageSelected = new EventEmitter<number>();
  @Input() disabled: boolean = false;

  public listPages: number[] = [];
  public pageNumber: number = 0;
  public changePage: (page: number) => void = () => {};

  ngOnChanges() {
    this.listPages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  public onChangePage(page: number) {
    this.pageNumber = page;
    this.onPageSelected.emit(page);
  }

  public onNextPage() {
    this.pageNumber++;
    this.onPageSelected.emit(this.pageNumber);
  }

  public onPreviousPage() {
    this.pageNumber--;
    this.onPageSelected.emit(this.pageNumber);
  }
}
