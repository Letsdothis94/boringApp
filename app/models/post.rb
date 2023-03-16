class Post < ApplicationRecord
    has_one_attached :featured_image
    
    belongs_to :user
    has_many :comments

    validates :title, presence: true
    validates :caption, presence: true

end
