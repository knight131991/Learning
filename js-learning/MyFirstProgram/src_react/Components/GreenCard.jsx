import React from 'react'
import PropTypes from 'prop-types';

export default function GreenCard ({content, width, height}) {
    return (
        <div style={{background: 'green', width, height}}>
            {content}
        </div>
    )
}

GreenCard.propTypes = {
    content: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  };