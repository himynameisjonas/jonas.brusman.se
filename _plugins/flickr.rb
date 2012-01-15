#require 'fleakr'
#module Jekyll
  #class FlickrImage < Liquid::Tag
    #    #def initialize(tag_name, text, tokens)
      #super
      #@image = text #    #end

    #def render(context)
      #"<img src='#{@image}' />"
    #end
  #end
#end

#Liquid::Template.register_tag('flickr_image', Jekyll::FlickrImage)

require 'liquid'
require 'fleakr'
Fleakr.api_key = "c794c3f00be2130085e3cdef2f06aeb6"

# Percent encoding for URI conforming to RFC 3986.
# Ref: http://tools.ietf.org/html/rfc3986#page-12
module Flickr
  def flickr_image(url)
    image = Fleakr.resource_from_url(url)
    return "<img class='flickr-image align-center' alt='#{image.title}' src='#{image.large.url}'>"
  end
end

Liquid::Template.register_filter(Flickr)
