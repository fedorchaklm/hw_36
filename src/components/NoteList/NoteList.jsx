import './NoteList.css';
import { Component } from "react";
import PropTypes from 'prop-types';

class NoteList extends Component {

static propTypes = {
  children: PropTypes.node
}

  render() {
    return (
        <ul className="note-list">
          {this.props.children}
        </ul>
    );
  }
}

export default NoteList;
