require 'liquid'
require 'fleakr'
require 'dalli'

Fleakr.api_key = ENV['FLICKR_API_KEY']
Fleakr.shared_secret = ENV['FLICKR_SHARED_SECRET']
Fleakr.auth_token = ENV['FLICKR_AUTH_TOKEN']

CACHE_VERSION = ENV['FLICKR_CACHE_VERSION'] || "1"

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

  def flickr_set(url)
    photos = set_object(url)
    photos.map do |photo_url|
      "<img class='flickr-image align-center' alt='' src='#{photo_url}'>"
    end.join(" ")
  end

  private

  def set_object(url)
    CACHE.fetch(url) do
      set = Fleakr.resource_from_url(url)
      photos = set.photos.map do |photo|
        photo.large_square.url
      end
    end
  end

  def image_object(url)
    CACHE.fetch(url + CACHE_VERSION) do
      fleakr_image = Fleakr.resource_from_url(url)
      image = {:sizes => {}}
      image[:sizes][nil] = fleakr_image.medium.url unless fleakr_image.medium.nil?
      image[:sizes][fleakr_image.medium.width.to_i] = fleakr_image.medium.url unless fleakr_image.medium.nil?
      image[:sizes][fleakr_image.small_320.width.to_i] = fleakr_image.small_320.url unless fleakr_image.small_320.nil?
      image[:sizes][fleakr_image.medium.width.to_i] = fleakr_image.medium.url unless fleakr_image.medium.nil?
      image[:sizes][fleakr_image.medium_640.width.to_i] = fleakr_image.medium_640.url unless fleakr_image.medium_640.nil?
      image[:sizes][fleakr_image.medium_800.width.to_i] = fleakr_image.medium_800.url unless fleakr_image.medium_800.nil?
      image[:sizes][fleakr_image.large.width.to_i] = fleakr_image.large.url unless fleakr_image.large.nil?
      image[:sizes][fleakr_image.large_1600.width.to_i] = fleakr_image.large_1600.url unless fleakr_image.large_1600.nil?
      image[:sizes][fleakr_image.large_2048.width.to_i] = fleakr_image.large_2048.url unless fleakr_image.large_2048.nil?
      image[:title] = fleakr_image.title
      CACHE.set(url, image)
      image
    end
  end
end

Liquid::Template.register_filter(Flickr)
