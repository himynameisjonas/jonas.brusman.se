const url = function (path, {width, height, gravity}) {
  params = ["org_if_sml=1"]
  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  if (gravity) {
    params.push(`gravity=${gravity}`)
  }
  if (process.env.IMAGE_HOST) {
    path = path.replace(/^https?:\/\//, '/')
    return `${process.env.IMAGE_HOST}${path}?${params.join('&amp;')}`

  } else {
    return `${path}?${params.join('&amp;')}`
  }
}

const shortcode = function (imagePath, sharing) {
  if (sharing) {
    return url(imagePath,
      {
        width: 1200,
        height: 630,
        gravity: 'smart',
      },
    );

  } else {
    return url(imagePath,
      {
        width: 500,
        height: 333,
        gravity: 'smart',
      },
    );
  }
}

module.exports = {
  url,
  shortcode
}
