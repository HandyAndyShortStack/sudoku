require_relative "../factorial"

describe "factorial" do
  
  it "returns the factorial of the given number" do
    expect(factorial(2)).to eq(2)
    expect(factorial(5)).to eq(120)
    expect(factorial(10)).to eq(3628800)
  end

  it "returns 1 for negative numbers" do
    expect(factorial(-10)).to eq(1)
  end
end
