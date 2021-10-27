const url = function (path, {width, height, resize}) {
  params = [`nf_resize=${resize || 'fit'}`]
  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  if (process.env.IMAGE_HOST) {
    return `${process.env.IMAGE_HOST}${path}?${params.join('&amp;')}`

  } else {
    return `${path}?${params.join('&amp;')}`
  }
}

const shortcode = function (imagePath, sharing) {
  if (sharing) {
    return url(imagePath,
      {
        resize: "smartcrop",
        width: 1200,
        height: 630
      },
    );

  } else {
    return url(imagePath,
      {
        resize: "smartcrop",
        width: 500,
        height: 333
      },
    );
  }
}

module.exports = {
  url,
  shortcode
}
