import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const FullSizeImage = ({ childImageSharp }) => {
  const imageStyle = {
    width: `calc(${childImageSharp.sizes.aspectRatio} * 100vh - 3rem)`
  };
  return (
    <Img
      className="full-size-image"
      style={imageStyle}
      sizes={childImageSharp.sizes}
    />
  );
};

FullSizeImage.propTypes = {
  childImageSharp: PropTypes.object
};

export default FullSizeImage;
