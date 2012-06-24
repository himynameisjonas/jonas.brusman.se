require 'liquid'
require 'fleakr'

Fleakr.api_key = "c794c3f00be2130085e3cdef2f06aeb6"
Fleakr.shared_secret = "12661a297b1dfd88"
Fleakr.auth_token = "72157629177895598-293ceaacc4143984"

CACHED_IMAGES = {}

module Flickr
  def flickr_image(url)
    image = image_object(url)
    sizes = {}
    sizes[nil] = image.medium.url unless image.medium.nil?
    sizes[320] = image.small_320.url unless image.small_320.nil?
    sizes[500] = image.medium.url unless image.medium.nil?
    sizes[640] = image.medium_640.url unless image.medium_640.nil?
    sizes[800] = image.medium_800.url unless image.medium_800.nil?
    sizes[1024] = image.large.url unless image.large.nil?
    sizes[1600] = image.large_1600.url unless image.large_1600.nil?
    sizes[2048] = image.large_2048.url unless image.large_2048.nil?

    "<figure class='flickr-image align-center' #{sizes.map{|s| "data-media#{s.first}='#{s.last}'"}.join(" ")} alt='#{image.title}' title='#{image.title}'>
    <noscript>
      <img class='flickr-image align-center' alt='#{image.title}' src='#{image.large.url}'>
    </noscript>
    </figure>
    "
  end

  def flickr_medium_image(url)
    return "<img class='flickr-image align-center' alt='#{image_object(url).title}' src='#{image_object(url).medium.url}'>"
  end

  private

  def image_object(url)
    CACHED_IMAGES[url] ||= Fleakr.resource_from_url(url)
  end
end

Liquid::Template.register_filter(Flickr)
