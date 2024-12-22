class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  field :titulo, type: String
  field :descripcion, type: String
  field :fecha_inicio, type: Time
  field :fecha_fin, type: Time
  field :categoria, type: String

  validates :titulo, :descripcion, :fecha_inicio, :fecha_fin, :categoria, presence: true
end
