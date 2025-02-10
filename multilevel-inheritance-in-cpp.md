Multilevel inheritance is a way to build a class hierarchy in which one class is derived from another class, which in turn is derived from a third class. In other words, a class can inherit from a class that already inherits from another class. This creates a "chain" of inheritance, allowing the most derived class to access members (methods and properties) from all of its ancestor classes.

Below is an example that uses a real-world scenario from the workplace—modeling a company's employee hierarchy—to illustrate multilevel inheritance. In this example, we have a base class representing a general employee, a derived class for a manager, and a further derived class for a director. Each level adds more specific information and responsibilities.

Imagine a company where every employee has a unique ID, name, and salary. A manager is an employee who also oversees a specific department. A director is a manager who is responsible for multiple departments or has additional strategic responsibilities.

Here's the C++ code example:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Base class: Employee represents a general employee in the company.
class Employee {
protected:
    int id;
    string name;
    double salary;
public:
    Employee(int id, string name, double salary)
        : id(id), name(name), salary(salary) { }
        
    // Method to display basic employee information.
    void displayEmployeeInfo() {
        cout << "Employee ID: " << id << "\n"
             << "Name: " << name << "\n"
             << "Salary: $" << salary << "\n";
    }
};

// Derived class: Manager inherits from Employee and adds a department.
class Manager : public Employee {
protected:
    string department;
public:
    Manager(int id, string name, double salary, string department)
        : Employee(id, name, salary), department(department) { }
        
    // Method to display manager-specific information.
    void displayManagerInfo() {
        // First, show the basic employee details.
        displayEmployeeInfo();
        cout << "Department: " << department << "\n";
    }
};

// Further derived class: Director inherits from Manager and adds additional responsibilities.
class Director : public Manager {
private:
    int numberOfDepartments;
public:
    Director(int id, string name, double salary, string department, int numberOfDepartments)
        : Manager(id, name, salary, department), numberOfDepartments(numberOfDepartments) { }
        
    // Method to display director-specific information.
    void displayDirectorInfo() {
        // First, show the manager details (which include employee info).
        displayManagerInfo();
        cout << "Number of Departments Managed: " << numberOfDepartments << "\n";
    }
};

int main() {
    // Create a Director object. This person is also a Manager and an Employee.
    Director dir(101, "Alice Johnson", 150000.0, "Operations", 3);
    
    // Call the director's method to display all related information.
    dir.displayDirectorInfo();
    
    return 0;
}
```

**Explanation:**

- The **Employee** class is the base class. It stores common details such as `id`, `name`, and `salary` and has a method `displayEmployeeInfo()` to show these details.

- The **Manager** class is derived from **Employee**. It inherits the basic information and adds the `department` attribute along with a method `displayManagerInfo()` that displays both the employee and department information.

- The **Director** class is further derived from **Manager**. It inherits all the attributes and methods from both **Employee** and **Manager**, and adds its own attribute `numberOfDepartments`. The method `displayDirectorInfo()` shows all the details gathered from the entire inheritance chain.

**Real-World Use:**

This multilevel inheritance model reflects many real-world company structures. In a business application, you might have various functions that work with an `Employee` object. For higher-level roles (like a director), additional responsibilities and information can be added without duplicating the basic employee features. This layered design helps in writing flexible, reusable, and maintainable code.
