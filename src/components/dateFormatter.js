import React from 'react';
import config from '../config';
import moment from 'moment';

export default class DateFormatter extends React.Component {
  constructor(props){
    super();
  }

  render() {
    const value = this.props.value;
    return (
      <div>
            {
               (value!==undefined && value !== null && value !== '' && value !== 'null' && value !== 0) && moment(value).format(config.DATE_FORMAT)
            }
            {
              (value===undefined ||value === null || value === '' || value === 'null') && "No Value"
            }
      </div>
   );
  }

  static propTypes = {
     //value: PropTypes.string.isRequired
   };
}
