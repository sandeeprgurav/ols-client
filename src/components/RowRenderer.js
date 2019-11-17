import React , { Component } from "react";
import '../style/dataGrid.less';
import { Row, Cell } from 'react-data-grid';

class CellRenderer extends Component {
    render() {
        const hl = this.context.shouldHighlight(this.props.rowData.id, this.props.column.key);
        //console.log("h1====>>>0"+hl);
        return <Cell {...this.props} className={ hl ? 'highlight-cell' : ''}/>;
    }
}

CellRenderer.contextTypes = {
    shouldHighlight: React.PropTypes.func
};

class RowRenderer extends Component {
    render() {
        return <Row cellRenderer={CellRenderer} ref="row" {...this.props} />;
    }
}


export default RowRenderer;
