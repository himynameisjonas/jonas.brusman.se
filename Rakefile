require "rubygems"
require "bundler/setup"
require "stringex"

# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (defaults to "new-post")
desc "Begin a new post"
task :new do
  title = ARGV[1..-1].join(" ") if ARGV.size > 1
  unless title
    title = get_stdin("Enter a title for your post: ")
  end

  filename = "_posts/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.md"
  if File.exist?(filename)
    abort("#{filename} already exists!")
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "flickr:"
    post.puts " - http://"
    post.puts "tags:"
    post.puts " -"
    post.puts "---"
  end

  system("subl", filename)
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end