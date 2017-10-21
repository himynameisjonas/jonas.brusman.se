require 'liquid'
require 'flickraw'
require 'uri'


module Flickr
  FlickRaw.api_key = ENV['FLICKR_API_KEY']
  FlickRaw.shared_secret = ENV['FLICKR_SHARED_SECRET']

  CACHE_VERSION = ENV['FLICKR_CACHE_VERSION'] || "1"
  CACHE_DIR = "node_modules/flickr-cache"

  def flickr_image(url)
    image = image_object(url)
    "<figure class='flickr-image align-center' #{image[:sizes].map{|s| "data-media#{s.first}='#{s.last}'"}.join(" ")} alt='#{image[:title]}' title='#{image[:title]}'>
    <noscript>
      <img class='flickr-image align-center' alt='#{image[:title]}' src='#{image[:sizes]["1024"]}'>
    </noscript>
    </figure>
    "
  end

  def flickr_og_image(url)
    image = image_object(url)
    image[:sizes]["1600"] || image[:sizes]["1024"] || image[:sizes]["800"] || image[:sizes]["640"] || image[:sizes]["500"]
  end

  def flickr_medium_image(url)
    image = image_object(url)
    "<img class='flickr-image align-center' alt='#{image[:title]}' src='#{image[:sizes]["500"]}'>"
  end

  def flickr_set(url)
    photos = set_object(url)
    photos.map do |photo_url|
      "<img class='flickr-image align-center' alt='' src='#{photo_url}'>"
    end.join(" ")
  end

  private

  def flickr
    @flicker ||= FlickRaw::Flickr.new.tap do |flickr|
      flickr.access_token = ENV['FLICKR_AUTH_TOKEN']
      flickr.access_secret = ENV['FLICKR_AUTH_SECRET']
    end
  end

  def set_object(url)
    from_cache(url) do
      id = url.match(/photos\/\S*\/sets\/(\d+)/)[1]
      set = flickr.photosets.getPhotos(photoset_id: id, extras: "url_q")
      set.photo.map do |photo|
        photo.url_q
      end
    end
  end

  def image_object(url)
    from_cache(url) do
      id = url.match(/photos\/\S*\/(\d+)/)[1]
      sizes = flickr.photos.getSizes(photo_id: id)
      info = flickr.photos.getInfo(photo_id: id)

      image = {sizes: {}}

      sizes.each do |size|
        image[:sizes][size.width] = size.source
      end
      image[:sizes][nil] = sizes.find{|s| s.label == "Medium"}.source
      image[:title] = info.title
      image
    end
  end

  def from_cache(url)
    sha = Digest::SHA1.hexdigest(url + CACHE_VERSION)
    filename = File.join(CACHE_DIR, sha)
    if File.exists?(filename)
      image = YAML.load(File.read(filename))
    else
      image = yield
      FileUtils.mkdir_p(CACHE_DIR)
      File.open(filename, "w") do |f|
        f.write(YAML.dump(image))
      end
    end
    return image
  end
end

Liquid::Template.register_filter(Flickr)
