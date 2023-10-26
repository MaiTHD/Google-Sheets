/**
 * Changes the variable validations if needed
 */
var validations = [
    {
        sheet: 'Validation1',
        range: 'A2:A'
    },
    {
        sheet: 'Validation2',
        range: 'A2:A'
    },
    // Thêm các vùng validation khác nếu cần
];

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
    SpreadsheetApp.getUi().createMenu('Sidebar')
        .addItem('Show Sidebar', 'showSidebar')
        .addToUi();
    showSidebar();
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
    SpreadsheetApp.getUi()
        .showSidebar(HtmlService.createHtmlOutputFromFile('SIDEBAR')
            .setTitle('Multiple selector'));
}

function getOptions(validationIndex) {
    if (validationIndex >= 0 && validationIndex < validations.length) {
        var validation = validations[validationIndex];
        return {
            validations: validations,
            values: SpreadsheetApp.getActive().getSheetByName(validation.sheet).getRange(validation.range).getDisplayValues()
                .filter(function(row) {
                    return row[0] !== ''; // Lọc ra các giá trị không rỗng
                })
                .map(function(row) {
                    return row[0];
                })
        };
    } else {
        return {
            validations: validations,
            values: []
        };
    }
}

function process(arr) {
    if (arr.length > 0) {
        SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange().setValue(arr.join("\n"));
    } else {
        SpreadsheetApp.getUi().alert('No options selected');
    }
}
