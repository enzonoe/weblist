# Project Description

This project is a web application developed in my free time. It aims to create a web server that can read files and generate lists based on their content. The lists will be displayed on the web interface, and users will have the ability to modify the lists by clicking the checkmarks next to the values in the list.

## Functionality

- **Reading Files:** The web server will be capable of reading files.
- **List Generation:** Based on the content of the .txt files (formatted as "Task 1", "Task 2", etc.), the server will generate lists.
- **List Display:** The generated lists will be displayed on the web interface.
- **List Modification:** Users can modify the lists by adding a boolean checkmark to tasks.

## File Format

The files that the web server reads are expected to follow a simple format:

- **One Task per Line:** Each line in the file represents a single task.
- **Task Format:** Tasks should be formatted as plain text, with one task per line.
  - For example:
    ```
    Task 1
    Task 2
    Task 3
    ```
  - Each line represents a separate task.


## Libraries Used

The following libraries are used in this project:

- **React:** A JavaScript library for building user interfaces.
- **Material-UI:** A popular React UI framework for building responsive and customizable UI components.
- **fs-extra:** An extension of the Node.js built-in `fs` module with additional functionality.
