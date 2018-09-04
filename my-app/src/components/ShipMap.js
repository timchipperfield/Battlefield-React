import React from 'react';
import PropTypes from 'prop-types';
// import Person from './Person';

const ShipMap = ({ships}) => {
  return (
    <div>
      {ships}
    </div>
  )
  // ocean tiles and ships
}

// const PeopleList = ({people}) => {
//   return (
//     <div>
//       {people.map((person) =>
//         <Person key={person.lastname} person={person} />
//       )}
//     </div>
//   );
// };

ShipMap.propTypes = {
  ships: PropTypes.array.isRequired
};

export default ShipMap;
