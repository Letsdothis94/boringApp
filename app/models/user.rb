class User < ApplicationRecord
    has_many :posts
    has_many :comments
    has_many :messages
  
    validates :email, presence: true
    validates :password, presence: true
    validates :email, uniqueness: true
end
