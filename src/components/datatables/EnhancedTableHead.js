import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const EnhancedTableHead = (props) => {
    const {onSelectAllClick, order, orderBy, onRequestSort, numSelected, rowCount, rows} = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {rows.map(
                    row => (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? "right" : "left"}
                            padding={row.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            {
                                row.disableSort ? <>{row.label}</> :
                                    <Tooltip
                                        title="Ordenar"
                                        placement={row.numeric ? "bottom-end" : "bottom-start"}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>

                            }
                        </TableCell>
                    ),
                    this
                )}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;
