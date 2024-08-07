import './NoteItem.css';
import PropTypes from 'prop-types';

function NoteItem({ note, onDelete }) {
  return (
    <li className="item">
      <p className="item__description">{note}</p>
      <button className="item__delNoteBtn" onClick={onDelete}>Del</button>
    </li>
  );
}

NoteItem.propTypes = {
  note: PropTypes.string,
  onDelete: PropTypes.func
};

export default NoteItem;