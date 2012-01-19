require 'liquid'
require 'fleakr'

Fleakr.api_key = "c794c3f00be2130085e3cdef2f06aeb6"
CACHED_IMAGES = {}

module Flickr
  def flickr_image(url)
    CACHED_IMAGES[url] ||= Fleakr.resource_from_url(url)
    return "<img class='flickr-image align-center' alt='#{CACHED_IMAGES[url].title}' src='#{CACHED_IMAGES[url].large.url}'>"
  end
end

Liquid::Template.register_filter(Flickr)
