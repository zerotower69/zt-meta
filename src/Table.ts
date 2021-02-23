import * as Type  from '../types';

class Table implements Type.Table {
  constructor() {
    this.table_name = null;
    this.table_type = null;
    this.table_rows = null;
    this.version = null;
    this.create_time = null;
    this.update_time = null;
    this.table_comment = null;
    this.primary_key = null;
    this.columns = [];
  }
  columns: Type.Column[];
  table_name: string | null;
  table_type: string | null;
  table_rows: string | null;
  version: string | null;
  create_time: string | null;
  update_time: string | null;
  table_comment: string | null;
  primary_key: Type.Column | null;
  // columns: Type.Column[];
}
export =Table