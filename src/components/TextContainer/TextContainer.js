import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h3>Իրական ժամանակում  <div>հաղորդագրությունների փոխանակում</div> <span role="img" aria-label="emoji">💬</span></h3>
     
     
    </div>
    {
      users
        ? (
          <div>
            <h3>Մարդիկ ովքեր զրուցում են:</h3>
            <div className="activeContainer">
              <h3>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h3>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;