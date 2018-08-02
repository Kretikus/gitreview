class Commit < ApplicationRecord
  def to_param
    sha
  end
end
