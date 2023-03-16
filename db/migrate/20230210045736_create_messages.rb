class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :user_id
      t.string :username

      t.timestamps
    end
  end
end
