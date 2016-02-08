#include <assert.h>

#include "../factorial.c"

int main() {
  assert(factorial(2) == 2);
  assert(factorial(5) == 120);
  assert(factorial(10) == 3628800);
  assert(factorial(-10) == 1);
}
