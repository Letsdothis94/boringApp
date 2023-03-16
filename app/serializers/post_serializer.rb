class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :caption, :user_id, :featured_image

  has_many :comments

 def featured_image
    rails_blob_path(object.featured_image, only_path: true) if object.featured_image.attached?
  end
end
