class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :username
  # has_one :user
end
