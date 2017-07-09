var validGrid = [
    8, 2, 7, 1, 5, 4, 3, 9, 6, 9, 6, 5, 3, 2, 7, 1, 4, 8, 3, 4, 1, 6, 8, 9, 7, 5, 2, 5, 9, 3, 4, 6, 8, 2, 7, 1, 4, 7, 2, 5, 1, 3, 6, 8, 9, 6, 1, 8, 9, 7, 2, 4, 3, 5, 7, 8, 6, 2, 3, 5, 9, 1, 4, 1, 5, 4, 7, 9, 6, 8, 2, 3, 2, 3, 9, 8, 4, 1, 5, 6, 7
];
var invalidGrid = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    2, 3, 4, 5, 6, 7, 8, 9, 1,
    3, 4, 5, 6, 7, 8, 9, 1, 2,
    4, 5, 6, 7, 8, 9, 1, 2, 3,
    5, 6, 7, 8, 9, 1, 2, 3, 4,
    6, 7, 8, 9, 1, 2, 3, 4, 5,
    7, 8, 9, 1, 2, 3, 4, 5, 6,
    8, 9, 1, 2, 3, 4, 5, 6, 7,
    9, 1, 2, 3, 4, 5, 6, 7, 8

];

//validate grid
//accepts format of single array of numbers
//reading from top left to bottom right of sudoku grid
function checkGrid(grid) {
    grid = addDetail(grid);
    return validGroupings(getRows(grid)) && validGroupings(getColumns(grid)) && validGroupings(getSections(grid));
}

//converts unformatted grid to include x/y coridnates for easier manipulation
function addDetail(grid) {
    var detailedGrid = [];
    for (var i = 0; i < grid.length; i++) {
        xVal = i % 9;
        yVal = Math.floor(i / 9);
        var detailedCell = { x: xVal, y: yVal, v: grid[i] };
        detailedGrid.push(detailedCell);
    }
    return detailedGrid
};

function getRows(grid) {
    var rows = [];
    for (var i = 0; i < 9; i++) {
        var row = $.grep(grid, function (cell) {
            return cell.y == i;
        });
        rows.push(row);
    }
    return rows;
}

function getColumns(grid) {
    var columns = [];
    for (var i = 0; i < 9; i++) {
        var column = $.grep(grid, function (cell) {
            return cell.x == i;
        });
        columns.push(column);
    }
    return columns;
}

function getSections(grid) {
    var sections = [];
    for (var i = 0; i < 9; i++) {
        var section = $.grep(grid, function (cell) {
            var columnSection = Math.floor(cell.x / 3);
            var rowSection = Math.floor(cell.y / 3);
            return columnSection + (rowSection * 3) == i;
        });
        sections.push(section);
    }
    return sections;
}

//expects a multideminsional array of numbers (in our case rows, columns, or sections)
//returns true if all values are unique and legal (numbers 0-9)
function validGroupings(groupings) {    
    for (var i = 0; i < groupings.length; i++) {
        var grouping = groupings[i];
        var checkArray = [];
        for (var j = 0; j < grouping.length; j++) {
            var cell = grouping[j];
            if ($.inArray(cell.v, checkArray) == -1 && cell.v > 0 && cell.v < 10) {
                checkArray.push(cell.v);
            } else {
                return false;
            }
        }
    }
    return true;
}
