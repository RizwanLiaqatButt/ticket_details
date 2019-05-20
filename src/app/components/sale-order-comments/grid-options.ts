import { AnchorCommentComponent } from '../../data.grid/grid.anchor.comment.component';

export function getColumnDefs() {
  const colDefs = [
    {
      headerName: 'ID', field: 'ID', width: 76, cellRendererFramework: AnchorCommentComponent
    },
    {
      headerName: 'Comment', field: 'TEXT', width: 588
    }
  ];
  return colDefs;
}
