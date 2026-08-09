import ExcelJS from 'exceljs';

export class ExcelUtils {

    // Load workbook
    async loadWorkbook(filePath: string): Promise<ExcelJS.Workbook> 
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    }

    // Read a single cell
    async readCell(filePath: string, sheetName: string, row: number, col: number): Promise<ExcelJS.CellValue> 
    {
        const workbook = await this.loadWorkbook(filePath);
        const sheet = workbook.getWorksheet(sheetName);

        if (!sheet) {
            throw new Error(`Worksheet '${sheetName}' not found in file.`);
        }

        return sheet.getCell(row, col).value;
    }

    // Update a single cell
    async updateCell(filePath: string, sheetName: string, row: number, col: number, value: ExcelJS.CellValue): Promise<void> 
    {
        const workbook = await this.loadWorkbook(filePath);
        const sheet = workbook.getWorksheet(sheetName);

        if (!sheet) {
            throw new Error(`Worksheet '${sheetName}' not found in file.`);
        }

        sheet.getCell(row, col).value = value;
        await workbook.xlsx.writeFile(filePath);
    }

    // Print all data from a sheet
    async printSheet(filePath: string, sheetName: string): Promise<void> 
    {
        const workbook = await this.loadWorkbook(filePath);
        const sheet = workbook.getWorksheet(sheetName);

        if (!sheet) {
            throw new Error(`Worksheet '${sheetName}' not found in file.`);
        }

        sheet.eachRow((row: ExcelJS.Row) => {
            row.eachCell((cell: ExcelJS.Cell) => {
                console.log(cell.value);
            });
        });
    }

    // Find row by searching a value
    async findRow(filePath: string, sheetName: string, searchValue: string | number): Promise<number> 
    {
        const workbook = await this.loadWorkbook(filePath);
        const sheet = workbook.getWorksheet(sheetName);

        if (!sheet) {
            throw new Error(`Worksheet '${sheetName}' not found in file.`);
        }

        let rowNumber = -1;

        sheet.eachRow((row: ExcelJS.Row, rowNo: number) => {
            row.eachCell((cell: ExcelJS.Cell) => {
                if (cell.value === searchValue) {
                    rowNumber = rowNo;
                }
            });
        });

        return rowNumber;
    }
}