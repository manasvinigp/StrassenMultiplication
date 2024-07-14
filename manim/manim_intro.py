from manim import *

class StrassenMatrixMultiplication(Scene):
    def construct(self):
        title = Text("Strassen's Matrix Multiplication", font_size=48)
        self.play(Write(title))
        self.wait(2)
        self.play(FadeOut(title))

        # Define matrices A and B
        A = [[1, 2], [3, 4]]
        B = [[5, 6], [7, 8]]

        matrix_A = Matrix(A)
        matrix_B = Matrix(B)

        label_A = Text("A", font_size=36).next_to(matrix_A, LEFT)
        label_B = Text("B", font_size=36).next_to(matrix_B, LEFT)

        group = VGroup(matrix_A, label_A, matrix_B, label_B).arrange(RIGHT, buff=1)
        self.play(Write(group))
        self.wait(2)

        # Splitting matrices into 4 sub-matrices
        A11, A12, A21, A22 = [[1]], [[2]], [[3]], [[4]]
        B11, B12, B21, B22 = [[5]], [[6]], [[7]], [[8]]

        submatrices_A = VGroup(
            Matrix(A11), Matrix(A12),
            Matrix(A21), Matrix(A22)
        ).arrange_in_grid(rows=2, buff=0.5)

        submatrices_B = VGroup(
            Matrix(B11), Matrix(B12),
            Matrix(B21), Matrix(B22)
        ).arrange_in_grid(rows=2, buff=0.5)

        self.play(FadeOut(group))
        self.play(submatrices_A.animate.to_edge(LEFT), submatrices_B.animate.to_edge(RIGHT))
        self.wait(2)

        # Show Strassen's sub-expressions (for simplicity, we use placeholder texts)
        P1 = Text("P1 = (A11 + A22)(B11 + B22)", font_size=24)
        P2 = Text("P2 = (A21 + A22)B11", font_size=24)
        P3 = Text("P3 = A11(B12 - B22)", font_size=24)
        P4 = Text("P4 = A22(B21 - B11)", font_size=24)
        P5 = Text("P5 = (A11 + A12)B22", font_size=24)
        P6 = Text("P6 = (A21 - A11)(B11 + B12)", font_size=24)
        P7 = Text("P7 = (A12 - A22)(B21 + B22)", font_size=24)

        expressions = VGroup(P1, P2, P3, P4, P5, P6, P7).arrange(DOWN, buff=0.5).scale(0.7)
        self.play(Write(expressions))
        self.wait(3)

        # Matrix C submatrices
        C11 = Text("C11 = P1 + P4 - P5 + P7", font_size=24)
        C12 = Text("C12 = P3 + P5", font_size=24)
        C21 = Text("C21 = P2 + P4", font_size=24)
        C22 = Text("C22 = P1 - P2 + P3 + P6", font_size=24)

        results = VGroup(C11, C12, C21, C22).arrange(DOWN, buff=0.5).scale(0.7)
        self.play(FadeOut(expressions))
        self.play(Write(results))
        self.wait(3)

        final_matrix = Matrix([[19, 22], [43, 50]])
        label_C = Text("C = ", font_size=36).next_to(final_matrix, LEFT)

        self.play(FadeOut(results))
        self.play(Write(VGroup(label_C, final_matrix)))
        self.wait(2)

        self.play(FadeOut(VGroup(label_C, final_matrix)))

        end_text = Text("Strassen's Algorithm in Action!", font_size=36)
        self.play(Write(end_text))
        self.wait(2)
