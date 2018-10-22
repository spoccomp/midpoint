class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :address
      t.float :lat
      t.float :long
      t.string :type
      t.references :user
      t.timestamps
    end
  end
end
