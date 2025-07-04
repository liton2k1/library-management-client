export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookResponse {
  success: boolean;
  message: string;
  data: IBook[];
}

export interface ISingleBookResponse {
  success: boolean;
  message: string;
  data: IBook;
}

export interface IBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
}

export interface IBorrowSummary {
    title: string;
    isbn: string;
    totalBorrowed: number;
}
