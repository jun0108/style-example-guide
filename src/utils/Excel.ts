import dayjs from 'dayjs';
import ExcelJS, { type Workbook, type Column } from 'exceljs';

class Excel {
  workbook: Workbook | undefined = undefined;

  createWorkbook() {
    this.workbook = new ExcelJS.Workbook();
  }

  createWorksheet(columns: Partial<Column>[], data: Record<string, any>[], sheetname: string = 'Sheet 1') {
    if (!this.workbook) {
      console.error('Not defined workbook');
      return Promise.reject('Not defined workbook');
    }

    const worksheet = this.workbook.addWorksheet(sheetname);
    worksheet.columns = columns;
    worksheet.addRows(data);
    return Promise.resolve();
  }

  download(filenamePrefix: string) {
    if (!this.workbook) {
      console.error('Not defined workbook');
      return Promise.reject('Not defined workbook');
    }
    const filename = filenamePrefix + '_' + dayjs().format('YYYYMMDDHHmmsss') + '.xlsx';
    this.workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_self';
      link.download = filename;
      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    });
  }
}

export default Excel;
