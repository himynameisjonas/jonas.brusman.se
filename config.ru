require "bundler/setup"
Bundler.require(:default)

module Rackables
  # Request paths with a trailing slash are 301 redirected to the version without, e.g.:
  #
  #   GET /foo/   # => 301 redirects to /foo
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

use Rack::Subdomain, "jonasforsberg.dev", except: ['', 'www'] do
  map '*', to: "/subdomains/:subdomain"
end

map "/subdomains/maskerad" do
  use Rack::Static,
    :urls => ["/img", "/js", "/css"],
    :root => "subdomains/maskerad"

  run lambda { |env|
    [
      200,
      { 'Content-Type'  => 'text/html', 'Cache-Control' => 'public, max-age=86400'},
      File.open('subdomains/maskerad/index.html', File::RDONLY)
    ]
  }
end


# jekyll blog
map "/" do
  use NoWWW
  use Rackables::TrailingSlashRedirect
  use Rackables::CacheControl, :public, :max_age => 60
  run Rack::Jekyll.new(:destination => 'jekyll')
end