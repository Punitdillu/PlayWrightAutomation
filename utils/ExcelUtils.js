const ExcelJS = require('exceljs');

class ExcelUtils {

    // Load workbook
    async loadWorkbook(filePath) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    }

    // Read a single cell
    async readCell(filePath, sheetName, row, col) {
        const workbook = await this.loadWorkbook(filePath);

        return workbook
            .getWorksheet(sheetName)
            .getCell(row, col)
            .value;
    }

    // Update a single cell
    async updateCell(filePath, sheetName, row, col, value) {

        const workbook = await this.loadWorkbook(filePath);

        workbook
            .getWorksheet(sheetName)
            .getCell(row, col)
            .value = value;

        await workbook.xlsx.writeFile(filePath);
    }

    // Print all data from a sheet
    async printSheet(filePath, sheetName) {

        const workbook = await this.loadWorkbook(filePath);

        const sheet = workbook.getWorksheet(sheetName);

        sheet.eachRow((row) => {

            row.eachCell((cell) => {

                console.log(cell.value);

            });

        });

    }

    // Find row by searching a value
    async findRow(filePath, sheetName, searchValue) {

        const workbook = await this.loadWorkbook(filePath);

        const sheet = workbook.getWorksheet(sheetName);

        let rowNumber = -1;

        sheet.eachRow((row, rowNo) => {

            row.eachCell((cell) => {

                if (cell.value === searchValue) {
                    rowNumber = rowNo;
                }

            });

        });

        return rowNumber;

    }

}

module.exports = {ExcelUtils};