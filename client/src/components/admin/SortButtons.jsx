import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

function SortButtons({ sortAscending, sortDescending }) {
  return (
    <div className='container-setinhas'>
      <Button variant='outline-primary' size='sm' onClick={sortAscending}>&#129093;</Button>
      <Button variant='outline-primary' size='sm' onClick={sortDescending}>&#129095;</Button>
    </div>
  );
}

SortButtons.propTypes = {
  sortAscending: PropTypes.func.isRequired,
  sortDescending: PropTypes.func.isRequired,
};

export default SortButtons;
