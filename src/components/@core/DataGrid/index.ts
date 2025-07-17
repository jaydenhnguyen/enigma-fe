import dynamic from 'next/dynamic';

export const DataGrid = dynamic(() => import('@mui/x-data-grid-pro').then((mod) => mod.DataGridPro), {
  ssr: false,
});
