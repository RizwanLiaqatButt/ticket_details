import { AnchorComponent } from '../../data.grid/grid.anchor.component';

export function getColumnDefs() {
  const colDefs = [
    {
      headerName: 'Post Date', field: 'POST_DT', width: 150
    },
    {
      headerName: 'Trans. Type', field: 'TRN_TP_CD', width: 150
    },
    {
      headerName: 'Trans Type Descr.', field: 'DES', width: 150
    },
    {
      headerName: 'Trans Method', field: 'MOP_CD', width: 150
    },
    {
      headerName: 'Debit', field: 'Debit', width: 150
    },
    {
      headerName: 'Credit', field: 'Credit', width: 150
    },
    {
      headerName: 'Amount', field: 'Amount', width: 150
    }
  ];
  return colDefs;
}
