import React from 'react';
import { TextCell } from '../components/helperCells';
import moment from 'moment';

const renderCell = (object, type, key, href) => {
  const value = object[key];
  switch (type) {
    case '':
      return '';
    default:
      return TextCell(value);
  }
};


export const MANAGE_COLUMNS = [
  {
    title: 'Name',
    key: 'Name',
    width: 40,
    render: object => renderCell(object, 'TextCell', 'name')
  }
]
