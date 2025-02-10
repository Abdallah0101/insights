### What Is Overriding?

- **Definition:** Overriding occurs when a derived class redefines a member function that it inherits from a base class.
- **Purpose:** It allows the derived class to offer specialized behavior for functions that are declared in the base class.
- **Key Requirement:** The function in the base class must be declared with the `virtual` keyword. This signals to the compiler that you intend for the function to be overridden.

### A Simple Example

Consider the following example with a base class `Base` and a derived class `Derived`:

```cpp
#include <iostream>

class Base {
public:
    // Declare the function as virtual to allow overriding
    virtual void show() {
        std::cout << "Base::show() called" << std::endl;
    }
    
    // Virtual destructor ensures proper cleanup of derived objects
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    // Override the base class function
    // The 'override' specifier (introduced in C++11) is optional but recommended
    void show() override {
        std::cout << "Derived::show() called" << std::endl;
    }
};

int main() {
    // Base pointer pointing to a Derived object
    Base* obj = new Derived();
    obj->show();  // Calls Derived::show() because of runtime polymorphism
    delete obj;
    return 0;
}
```

### Explanation

1. **Virtual Function:**  
   - In `Base`, the function `show()` is declared as `virtual`. This means that when a derived class provides its own implementation, calls to `show()` through a `Base*` or `Base&` will use the derived class’s version if available.

2. **The `override` Specifier:**  
   - In `Derived`, the `show()` function is marked with `override`. This tells the compiler, “I intend to override a virtual function from the base class.” If there’s a mismatch in the function signature, the compiler will issue an error, helping catch bugs early.

3. **Polymorphic Behavior:**  
   - When you call `obj->show()`, the program checks the actual object type at runtime (which is `Derived` in this case) and calls `Derived::show()`, demonstrating runtime polymorphism.

---

## 2. Advanced Topics

### Covariant Return Types

C++ supports **covariant return types**, which means that an overriding function in a derived class can return a pointer or reference to a type that is derived from the return type of the base class function. For example:

```cpp
class Base {
public:
    virtual Base* clone() const {
        return new Base(*this);
    }
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    // The return type 'Derived*' is covariant with 'Base*'
    Derived* clone() const override {
        return new Derived(*this);
    }
};
```

### Final Functions

Sometimes you may want to prevent further overriding of a function. C++11 introduced the `final` specifier to do just that:

```cpp
class Base {
public:
    virtual void display() final {
        std::cout << "Base::display()" << std::endl;
    }
};

class Derived : public Base {
public:
    // This will cause a compile-time error because 'display' is marked final in Base.
    // void display() override { 
    //     std::cout << "Derived::display()" << std::endl;
    // }
};
```

### Pitfalls and Best Practices

- **Non-Virtual Functions:**  
  If a function is not declared as `virtual` in the base class, then redefining it in the derived class does not override the base version—it simply hides it. Always declare functions as `virtual` in the base class when you intend them to be overridden.

- **Signature Matching:**  
  The function in the derived class must have the exact same signature (name, parameter types, const qualifiers, etc.) as in the base class for proper overriding. Otherwise, it may lead to function overloading (or hiding) rather than overriding.

- **Calling Virtual Functions in Constructors/Destructors:**  
  Be cautious: calling virtual functions in constructors or destructors does not result in the derived class version being called. During construction and destruction, the dynamic type of the object is not fully established, so the base class’s version is used.

- **Virtual Destructors:**  
  Always declare a virtual destructor in a polymorphic base class. This ensures that when an object is deleted through a base pointer, the destructor for the derived class is invoked, avoiding resource leaks.

---

## 3. Summary

- **Function Overriding:** Allows a derived class to provide its own implementation of a function defined in the base class.
- **Virtual Keyword:** Must be used in the base class to enable overriding and achieve runtime polymorphism.
- **Override Specifier:** Helps the compiler ensure that you are correctly overriding a virtual function.
- **Advanced Features:** Include covariant return types and the use of `final` to restrict further overriding.
- **Best Practices:** Ensure signature consistency, use virtual destructors, and be careful with virtual calls in constructors and destructors.

