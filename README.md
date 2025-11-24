# bucks2bar Project

## Overview
The bucks2bar project is a web application that utilizes Bootstrap for responsive design and custom styles and scripts for enhanced functionality. This project aims to provide a user-friendly interface and seamless user experience.

## Project Structure
```
bucks2bar
├── src
│   ├── index.html       # Main HTML document
│   ├── css
│   │   └── styles.css   # Custom styles
│   ├── js
│   │   └── main.js      # Custom JavaScript
├── README.md            # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bucks2bar
   ```
3. Open the `src/index.html` file in your web browser to view the application.

## Usage
- The application is built using the latest version of Bootstrap. Ensure you have an internet connection to load Bootstrap from the CDN.
- Customize the styles in `src/css/styles.css` to fit your design needs.
- Add interactivity by modifying `src/js/main.js`.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Running Tests

This project uses Jest for testing. There are two main sets of tests:

1.  **Unit/Integration Tests (Non-DOM related):** These tests are located in the `tests/` directory. To run them, use the following command:
    ```bash
    npm test
    ```
2.  **DOM-related Tests:** These tests interact with the DOM and are located in the `tests_DOM/` directory. To run them, use the following command:
    ```bash
    npm run test:dom
    ```
3.  **Visual Tests:** These tests use Playwright to perform visual validation of the application. They are located in the `tests_VISUAL/` directory. To run them, use the following command:
    ```bash
    npm run test:visual
    ```

### Creating New Visual Tests (BDD Style)

To create a new visual test with a BDD (Behavior-Driven Development) style, follow these steps inside a `.test.js` file within the `tests_VISUAL/` directory:

1.  **Feature**: Use a `describe` block to define the feature you are testing.
    - `describe('Feature: Mi nueva funcionalidad', () => { ... });`
2.  **Scenario**: Inside the feature, use another `describe` block for each scenario.
    - `describe('Scenario: Comportamiento esperado', () => { ... });`
3.  **Given/When/Then**: Use `test` blocks for each step, naming them with "GIVEN", "WHEN", "THEN", and "AND" to make the flow clear.
    - `test('GIVEN: Un estado inicial', async () => { ... });`
    - `test('WHEN: Ocurre una acción', async () => { ... });`
    - `test('THEN: Se espera un resultado', async () => { ... });`