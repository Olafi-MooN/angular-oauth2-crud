export interface IBank {
  id: string;
  status: {
    id: string;
    descricao: string;
  };
  descricao: string;
  codigo: string;
  selected?: boolean;
}

export interface IBankList {
  content: IBank[];
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
  pageable: IPagination;
}

export interface IStatus {
  id: string;
  descricao: string;
}

export interface IPagination {
  sort: ISort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IBankFilter {
  codigo: string;
  descricao: string;
  direction: string;
  pageNumber: number;
  pageSize: number;
  pesquisa: string;
  sort: string;
  status: string;
}
