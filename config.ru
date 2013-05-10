Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
require "bundler/setup"
Bundler.require(:default)

module Rackables
  class TrailingSlashRedirect
    HAS_TRAILING_SLASH = %r{^/(.*)/$}

    def initialize(app)
      @app = app
    end

    def call(env)
      if env['PATH_INFO'] =~ HAS_TRAILING_SLASH
        location = "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}/#{$1}"
        location = "#{location}?#{env['QUERY_STRING']}" if env['QUERY_STRING'].to_s =~ /\S/
        [301, {"Location" => location, "Content-Type" => ""}, []]
      else
        @app.call(env)
      end
    end
  end
end

class NoWWW
  STARTS_WITH_WWW = /^www\./i

  def initialize(app)
    @app = app
  end

  def call(env)
    if env['HTTP_HOST'] =~ STARTS_WITH_WWW
      [301, { 'Location' => Rack::Request.new(env).url.sub(/www\./i, ''), "Content-Type" => ""}, ['Redirecting...']]
    else
      @app.call(env)
    end
  end
end

use Rack::Lint

domain = ENV['JEKYLL_DOMAIN'] || "jonasforsberg.se"
use Rack::Subdomain, domain, except: ['', 'www'] do
  map '*', to: "/subdomains/:subdomain"
end

def static_site(folder)
  lambda { |rack_builder|
    rack_builder.use Rack::Static,
      :urls => ["/img", "/js", "/css"],
      :root => "subdomains/#{folder}"

    rack_builder.run lambda { |env|
      [
        200,
        { 'Content-Type'  => 'text/html', 'Cache-Control' => 'public, max-age=86400'},
        File.open("subdomains/#{folder}/index.html", File::RDONLY)
      ]
    }
  }
end

map "/subdomains/maskerad", &static_site("maskerad")

# jekyll blog
map "/" do
  use NoWWW
  use Rackables::TrailingSlashRedirect
  use Rackables::CacheControl, :public, :max_age => 60
  run Rack::Jekyll.new(:destination => 'jekyll')
end