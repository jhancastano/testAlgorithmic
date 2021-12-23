# testAlgorithmic
The coding challenge is a great opportunity to showcase how you approach and solve a
problem. Feel free to use any programming language. Please make sure you provide the proper
test coverage and prove that your solution is complete. As a minimum, use the provided test
data to indicate that the solution works as expected. Please provide your solution in English.
Drawing tool
You're given the task of writing a simple drawing tool. In a nutshell, the program reads the
input.txt, executes a set of commands from the file, step by step, and produces output.txt.
At this time, the functionality of the program is quite limited but this might change in the future.
At the moment, the program should support the following set of commands:
- C w h Create Canvas: Should create a new canvas of width w and height h.
- L x1 y1 x2 y2 Create Line: Should create a new line from (x1,y1) to (x2,y2). Currently
only horizontal or vertical lines are supported. Horizontal and vertical lines will be drawn
using the 'x' character.
- R x1 y1 x2 y2 Create Rectangle: Should create a new rectangle, whose upper left corner
is (x1,y1) and lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
using the 'x' character.
- B x y c Bucket Fill: Should fill the entire area connected to (x,y) with "colour" c.
The behaviour of this is the same as that of the "bucket fill" tool in paint programs.
Please take into account that you can only draw if a canvas has been created.

Example
Please use the two attached files as an example. input.txt produces output.txt.

### input.txt
- C 20 4
- L 1 2 6 2
- L 6 3 6 4
- R 16 1 20 3
- B 10 3 o

### output.txt
```
- **********************
- |                    |
- |                    |
- |                    |
- |                    |
- **********************
```
```
- **********************
- |                    |
- |xxxxxx              |
- |                    |
- |                    |
- **********************
```
```
- **********************
- |                    |
- |xxxxxx              |
- |     x              |
- |     x              |
- **********************
```
```
- **********************
- |               xxxxx|
- |xxxxxx         x   x|
- |     x         xxxxx|
- |     x              |
- **********************
```

```
- **********************
- |oooooooooooooooxxxxx|
- |xxxxxxooooooooox   x|
- |     xoooooooooxxxxx|
- |     xoooooooooooooo|
- **********************
```
