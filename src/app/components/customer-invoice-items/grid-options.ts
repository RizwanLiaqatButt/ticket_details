import { AnchorComponent } from '../../data.grid/grid.anchor.component';

export function getColumnDefs() {
  const colDefs = [
    {
      headerName: 'Item#', field: 'CO_CD', width: 75
    },
    {
      headerName: 'Qty Ord', field: 'CO_CD', width: 75
    },
    {
      headerName: 'Store', field: 'CO_CD', width: 90
    },
    {
      headerName: 'Type', field: 'CO_CD', width: 90
    },
    {
      headerName: 'Description', field: 'CO_CD', width: 250
    },
    {
      headerName: 'Qty Shpd', field: 'CO_CD', width: 50
    },
    {
      headerName: 'Unit Price', field: 'CO_CD', width: 150
    },
    {
      headerName: 'Net Line', field: 'CO_CD', width: 150
    },
  ];
  return colDefs;
}
