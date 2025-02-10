**Polymorphism** means "many forms." In C++, **runtime polymorphism** lets you decide which function to call at runtime (when the program is running) rather than at compile time (when you build the program). This is mainly achieved using **virtual functions**.

### Key Points:
- **Virtual Functions:** In a base class, you mark a function as `virtual` so that it can be overridden by derived classes.
- **Overriding:** A derived class can provide its own version of that function.
- **Base Class Pointers:** You can use a pointer (or reference) to the base class to point to objects of derived classes. When you call a virtual function through this pointer, the program figures out the right function to call based on the actual object type.

---

## A Simple Example

Imagine we have an **Animal** class and two animals: a **Dog** and a **Cat**. Each animal has its own way of "speaking." We want a common function `speak()` that behaves differently for each animal.

### Code Example:

```cpp
#include <iostream>
using namespace std;

// Base class
class Animal {
public:
    // Declare speak() as virtual so it can be overridden
    virtual void speak() {
        cout << "Animal speaks in its own way." << endl;
    }
    
    // Virtual destructor (good practice when using polymorphism)
    virtual ~Animal() = default;
};

// Derived class: Dog
class Dog : public Animal {
public:
    // Override the speak() method
    void speak() override {
        cout << "Dog barks: Woof! Woof!" << endl;
    }
};

// Derived class: Cat
class Cat : public Animal {
public:
    // Override the speak() method
    void speak() override {
        cout << "Cat meows: Meow! Meow!" << endl;
    }
};

int main() {
    // Base class pointer to a Dog object
    Animal* animal1 = new Dog();
    // Base class pointer to a Cat object
    Animal* animal2 = new Cat();
    
    // Even though both pointers are of type Animal*,
    // the correct speak() method is called based on the actual object type.
    animal1->speak(); // Calls Dog's speak()
    animal2->speak(); // Calls Cat's speak()

    // Clean up the dynamically allocated memory
    delete animal1;
    delete animal2;

    return 0;
}
```

---

## Step-by-Step Explanation

1. **Defining the Base Class (`Animal`):**
   - We define a function `speak()` in the `Animal` class.
   - The keyword `virtual` tells the compiler that this function can be overridden in derived classes.
   - We also include a virtual destructor, which is good practice when working with inheritance and polymorphism.

2. **Creating Derived Classes (`Dog` and `Cat`):**
   - Both `Dog` and `Cat` inherit from `Animal`.
   - They each provide their own implementation of `speak()` using the `override` keyword. This keyword is optional but helps catch errors if the function signature doesn’t match.

3. **Using Base Class Pointers:**
   - In the `main()` function, we create pointers of type `Animal*` but assign them to new `Dog` and `Cat` objects.
   - When we call `speak()` on these pointers, C++ looks at the actual object the pointer is referring to.
     - For `animal1`, which points to a `Dog` object, `Dog::speak()` is called.
     - For `animal2`, which points to a `Cat` object, `Cat::speak()` is called.
     
   This decision happens **at runtime** (when the program is running), which is why it's called runtime polymorphism.

---

## Why Is This Useful?

- **Flexibility:** You can write code that works with a base class pointer or reference, and it will automatically use the correct function for the derived class. This is especially useful when you have many classes that share common behaviors.
- **Maintainability:** You can add new types (e.g., a new animal) without changing the code that uses the base class pointer.

---

## Recap

- **Virtual Functions:** Allow functions to be overridden in derived classes.
- **Overriding:** Derived classes provide their own version of a function.
- **Runtime Polymorphism:** When calling a virtual function through a base class pointer, the program determines at runtime which function to call based on the actual object type.

