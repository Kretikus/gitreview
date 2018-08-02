class CreateCommits < ActiveRecord::Migration[5.2]
  def change
    create_table :commits do |t|
      t.string :sha
      t.string :description
      t.string :author
      t.datetime :commit_date

      t.timestamps
    end
  end
end
