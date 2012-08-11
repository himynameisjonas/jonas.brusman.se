require 'liquid'
require 'fleakr'
require 'dalli'

Fleakr.api_key = "c794c3f00be2130085e3cdef2f06aeb6"
Fleakr.shared_secret = "12661a297b1dfd88"
Fleakr.auth_token = "72157629177895598-293ceaacc4143984"

CACHE = Dalli::Client.new

module Flickr
  def flickr_image(url)
    image = image_object(url)
    "<figure class='flickr-image align-center' #{image[:sizes].map{|s| "data-media#{s.first}='#{s.last}'"}.join(" ")} alt='#{image[:title]}' title='#{image[:title]}'>
    <noscript>
      <img class='flickr-image align-center' alt='#{image[:title]}' src='#{image[:sizes][1024]}'>
    </noscript>
    </figure>
    "
  end

  def flickr_medium_image(url)
    image = image_object(url)
    "<img class='flickr-image align-center' alt='#{image[:title]}' src='#{image[:sizes][500]}'>"
  end

  private

  def image_object(url)
    CACHE.fetch(url) do
      fleakr_image = Fleakr.resource_from_url(url)
      image = {:sizes => {}}
      image[:sizes][nil] = fleakr_image.medium.url unless fleakr_image.medium.nil?
      image[:sizes][320] = fleakr_image.small_320.url unless fleakr_image.small_320.nil?
      image[:sizes][500] = fleakr_image.medium.url unless fleakr_image.medium.nil?
      image[:sizes][640] = fleakr_image.medium_640.url unless fleakr_image.medium_640.nil?
      image[:sizes][800] = fleakr_image.medium_800.url unless fleakr_image.medium_800.nil?
      image[:sizes][1024] = fleakr_image.large.url unless fleakr_image.large.nil?
      image[:sizes][1600] = fleakr_image.large_1600.url unless fleakr_image.large_1600.nil?
      image[:sizes][2048] = fleakr_image.large_2048.url unless fleakr_image.large_2048.nil?
      image[:title] = fleakr_image.title
      CACHE.set(url, image)
      image
    end
  end
end

Liquid::Template.register_filter(Flickr)
