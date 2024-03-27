# StrassenMultiplication

Divide and Conquer:A problem-solving approach that breaks a problem into smaller subproblems, solves them independently, and then combines their solutions to solve the original problem efficiently. Following is simple Divide and Conquer method to multiply two square matrices. Divide matrices A and B in 4 sub-matrices of size N/2 x N/2 as shown in the below diagram. Calculate following values recursively. ae + bg, af + bh, ce + dg and cf + dh.

Strassen's matrix multiplication algorithm is a divide-and-conquer approach that reduces the number of multiplications in matrix multiplication. In the above divide and conquer method, the main component for high time complexity is 8 recursive calls. The idea of Strassen’s method is to reduce the number of recursive calls to 7.

The application includes the following features
The solution we have developed is  a website that offers the following provisions to users:

Virtual Simulator: An animation prototype aimed at facilitating step-by-step depiction of the algorithm, enhancing comprehension through interactive visual representation and improving understanding of Strassen matrix multiplication. 
It accepts user input, where the user specifies the order of the matrix and provides the entries. 
It currently supports maximum dimension of 4x4 for input matrices. 
However, the algorithm is efficient for square matrices of order in powers of 2.

Reading material on Strassen’s Algorithm: Provides theoretical information pertaining to Divide and Conquer Approach, Strassen Matrix Multiplication, and derivation of its Time Complexity through Master Theorem. It also provides  useful links to the user for further reading and understanding of the concept.

Virtual Simulator of Time Complexity Graphs: Provides a clear visualisation of the time complexity of Strassen’s Algorithm, versus the naive approach.

Includes provision for user to provide feedback on the website experience.


