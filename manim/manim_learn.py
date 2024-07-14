from manim import *

class StrassenMatrixMultiplication(Scene):
    def construct(self):
        # Display the title
        title = Tex("Strassen's Matrix Multiplication").scale(1.5)
        title.move_to(ORIGIN)
        self.play(Write(title))
        self.wait(2)
        self.play(FadeOut(title))
        self.wait(1)

        # Define the matrices
        matrix_A = [[1, 2], [3, 4]]
        matrix_B = [[5, 6], [7, 8]]

        # Create matrix Mobjects
        mat_A = Matrix(matrix_A, left_bracket="(", right_bracket=")")
        mat_B = Matrix(matrix_B, left_bracket="(", right_bracket=")")

        # Position the matrices
        mat_A.move_to(LEFT * 3)
        mat_B.move_to(RIGHT * 3)

        # Label the matrices
        label_A = Tex("A").next_to(mat_A, DOWN)
        label_B = Tex("B").next_to(mat_B, DOWN)

        self.play(Write(mat_A), Write(mat_B), Write(label_A), Write(label_B))
        self.wait(1)

        # Remove labels A and B before division
        self.play(FadeOut(label_A), FadeOut(label_B))

        # Divide matrices into 1x1 matrices (n/2 x n/2 matrices)
        A11 = Matrix([[matrix_A[0][0]]], left_bracket="(", right_bracket=")").move_to(mat_A.get_corner(UL) + LEFT * 0.5 + UP * 0.5)
        A12 = Matrix([[matrix_A[0][1]]], left_bracket="(", right_bracket=")").move_to(mat_A.get_corner(UR) + RIGHT * 0.5 + UP * 0.5)
        A21 = Matrix([[matrix_A[1][0]]], left_bracket="(", right_bracket=")").move_to(mat_A.get_corner(DL) + LEFT * 0.5 + DOWN * 0.5)
        A22 = Matrix([[matrix_A[1][1]]], left_bracket="(", right_bracket=")").move_to(mat_A.get_corner(DR) + RIGHT * 0.5 + DOWN * 0.5)

        B11 = Matrix([[matrix_B[0][0]]], left_bracket="(", right_bracket=")").move_to(mat_B.get_corner(UL) + LEFT * 0.5 + UP * 0.5)
        B12 = Matrix([[matrix_B[0][1]]], left_bracket="(", right_bracket=")").move_to(mat_B.get_corner(UR) + RIGHT * 0.5 + UP * 0.5)
        B21 = Matrix([[matrix_B[1][0]]], left_bracket="(", right_bracket=")").move_to(mat_B.get_corner(DL) + LEFT * 0.5 + DOWN * 0.5)
        B22 = Matrix([[matrix_B[1][1]]], left_bracket="(", right_bracket=")").move_to(mat_B.get_corner(DR) + RIGHT * 0.5 + DOWN * 0.5)

        # Animate the division of matrices and then remove them
        self.play(ReplacementTransform(mat_A, VGroup(A11, A12, A21, A22)),
                  ReplacementTransform(mat_B, VGroup(B11, B12, B21, B22)))
        self.wait(1)

        # Label submatrices A and B
        labels = [
            Tex("A11").next_to(A11, DOWN),
            Tex("A12").next_to(A12, DOWN),
            Tex("A21").next_to(A21, DOWN),
            Tex("A22").next_to(A22, DOWN),
            Tex("B11").next_to(B11, DOWN),
            Tex("B12").next_to(B12, DOWN),
            Tex("B21").next_to(B21, DOWN),
            Tex("B22").next_to(B22, DOWN)
        ]

        self.play(*[Write(label) for label in labels])
        self.wait(1)

        # Remove labels before P1 formula
        self.play(*[FadeOut(label) for label in labels])
        self.wait(1)

        # Remove submatrices before computation
        self.play(*[FadeOut(matrix) for matrix in [A11, A12, A21, A22, B11, B12, B21, B22]])
        self.wait(1)

        # Calculate intermediate products
        P1 = matrix_A[0][0] * (matrix_B[0][1] - matrix_B[1][1])
        P2 = (matrix_A[0][0] + matrix_A[0][1]) * matrix_B[1][1]
        P3 = (matrix_A[1][0] + matrix_A[1][1]) * matrix_B[0][0]
        P4 = matrix_A[1][1] * (matrix_B[1][0] - matrix_B[0][0])
        P5 = (matrix_A[0][0] + matrix_A[1][1]) * (matrix_B[0][0] + matrix_B[1][1])
        P6 = (matrix_A[0][1] - matrix_A[1][1]) * (matrix_B[1][0] + matrix_B[1][1])
        P7 = (matrix_A[0][0] - matrix_A[1][0]) * (matrix_B[0][0] + matrix_B[0][1])

        # Display intermediate results on separate pages
        self.show_computation("P1 = A11 * (B12 - B22)", P1, [A11, B12, B22], "1", "6", "8")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P2 = (A11 + A12) * B22", P2, [A11, A12, B22], "1", "2", "8")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P3 = (A21 + A22) * B11", P3, [A21, A22, B11], "3", "4", "5")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P4 = A22 * (B21 - B11)", P4, [A22, B21, B11], "4", "7", "5")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P5 = (A11 + A22) * (B11 + B22)", P5, [A11, A22, B11, B22], "1", "4", "5", "8")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P6 = (A12 - A22) * (B21 + B22)", P6, [A12, A22, B21, B22], "2", "4", "7", "8")
        self.wait(1)
        self.clear_screen()
        self.show_computation("P7 = (A11 - A21) * (B11 + B12)", P7, [A11, A21, B11, B12], "1", "3", "5", "6")
        self.wait(1)
        self.clear_screen()

        # Calculate final C matrices
        C11 = P5 + P4 - P2 + P6
        C12 = P1 + P2
        C21 = P3 + P4
        C22 = P5 + P1 - P3 - P7

        # Display intermediate results for C matrices on separate pages
        self.show_computation("C11 = P5 + P4 - P2 + P6", C11, [P5, P4, P2, P6], "P5", "P4", "P2", "P6")
        self.wait(1)
        self.clear_screen()
        self.show_computation("C12 = P1 + P2", C12, [P1, P2], "P1", "P2")
        self.wait(1)
        self.clear_screen()
        self.show_computation("C21 = P3 + P4", C21, [P3, P4], "P3", "P4")
        self.wait(1)
        self.clear_screen()
        self.show_computation("C22 = P5 + P1 - P3 - P7", C22, [P5, P1, P3, P7], "P5", "P1", "P3", "P7")
        self.wait(1)
        self.clear_screen()

        # Display the intermediate result matrix C with entries
        intermediate_matrix_C = Matrix([["C_{11}", "C_{12}"], ["C_{21}", "C_{22}"]], left_bracket="(", right_bracket=")")
        self.play(Write(intermediate_matrix_C))
        self.wait(1)
        self.play(FadeOut(intermediate_matrix_C))

        # Display the final result matrix
        result_matrix = Matrix([[C11, C12], [C21, C22]], left_bracket="(", right_bracket=")")
        result_label = Tex("$C = A \\times B$").next_to(result_matrix, DOWN)

        self.play(Write(result_matrix))
        self.wait(1)
        self.play(Write(result_label))
        self.wait(2)

    def show_computation(self, formula, result, matrices, *values):
        # Display formula and result on a new page
        formula_text = Tex(formula)
        result_text = MathTex(f"= {result}")

        formula_text.to_edge(UP)
        result_text.next_to(formula_text, DOWN)

        # Position matrices below the formula
        positions = [LEFT * 3 + DOWN, LEFT * 1 + DOWN, RIGHT * 1 + DOWN, RIGHT * 3 + DOWN]
        if len(matrices) > 2:
            positions = [LEFT * 2 + UP, RIGHT * 2 + UP, LEFT * 2 + DOWN, RIGHT * 2 + DOWN]
        matrix_mobjects = VGroup(*[MathTex(values[i]).move_to(positions[i]) for i in range(len(matrices))])

        # Display formula, matrices, and result
        self.play(Write(formula_text))
        self.play(*[ReplacementTransform(MathTex(str(matrices[i])), MathTex(values[i]).move_to(positions[i])) for i in range(len(values))])
        self.wait(1)
        self.play(Write(result_text))
        self.wait(1)
        self.play(FadeOut(formula_text), FadeOut(result_text), *[FadeOut(matrix) for matrix in matrix_mobjects])
        self.wait(0.5)
    
    def clear_screen(self):
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        self.wait(0.5)