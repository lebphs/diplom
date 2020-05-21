import {Injectable} from "@angular/core";
import * as XLSX from "xlsx";

@Injectable()
export class FileService {
  fileName= 'ExcelSheet.xlsx';

  exportToExcel(element): void
  {

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    ws.D2 = {};

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
