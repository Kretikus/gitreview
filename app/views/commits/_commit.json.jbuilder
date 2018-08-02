json.extract! commit, :id, :sha, :description, :author, :commit_date, :created_at, :updated_at
json.url commit_url(commit, format: :json)
