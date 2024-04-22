import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.animation import FuncAnimation

# Define the function to optimize
def f(x, y):
    return x**2 + y**2

# Define the gradient of the function
def grad_f(x, y):
    return np.array([2*x, 2*y])

# Define the gradient descent algorithm
def gradient_descent(learning_rate=0.1, num_iterations=100):
    # Initial starting point
    x = 3
    y = 3
    # Lists to store the history of parameter values and function values
    x_history = [x]
    y_history = [y]
    z_history = [f(x, y)]
    # Perform gradient descent
    for i in range(num_iterations):
        gradient = grad_f(x, y)
        x -= learning_rate * gradient[0]
        y -= learning_rate * gradient[1]
        x_history.append(x)
        y_history.append(y)
        z_history.append(f(x, y))
    return x_history, y_history, z_history

# Create a figure and axes
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('f(X, Y)')
ax.set_title('Gradient Descent Optimization')

# Plot the 3D surface
x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)
surface = ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.5)

# Initialize the trajectory line
line, = ax.plot([], [], [], marker='o', color='r')

# Function to update the animation
def update(iteration):
    if iteration > 0:
        x_history, y_history, z_history = gradient_descent(num_iterations=iteration)
        line.set_data(x_history, y_history)
        line.set_3d_properties(z_history)
    return line,

# Create the animation
ani = FuncAnimation(fig, update, frames=range(100), blit=True)

plt.show()
