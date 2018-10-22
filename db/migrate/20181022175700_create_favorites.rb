class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.string :place_id
      t.string :name
      t.string :address
      t.string :phone
      t.float :lat
      t.float :long
      t.references :user
      t.timestamps
    end
  end
end
