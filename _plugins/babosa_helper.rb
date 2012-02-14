# encoding: UTF-8
require 'babosa'

module Babosa
  module Transliterator
    class Swedish < Latin
      APPROXIMATIONS = {
        "&" => "and"
        "å" => "aa",
        "ä" => "ae",
        "ö" => "oe",
        "Å" => "Aa",
        "Ä" => "Ae",
        "Ö" => "Oe"
      }
    end
  end
end


module Jekyll
  module SlugFilter
    def to_slug(tag)
      tag.to_slug.transliterate(:swedish).normalize.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::SlugFilter)