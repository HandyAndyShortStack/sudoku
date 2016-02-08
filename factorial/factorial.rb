def factorial x
  (2..x).reduce(:*) || 1
end
