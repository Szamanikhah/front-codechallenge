export interface RowData {
    id: number;
    name: string;
    age: number;
    occupation: string;
  }

export interface ColumnData {
    id: number;
    name: string;
    show: boolean;
  }


export type Order = 'asc' | 'desc';