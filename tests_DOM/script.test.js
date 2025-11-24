const fs = require('fs');
const path = require('path');

// Mocking Chart.js as it's not relevant for the username validation test
// and might cause errors in a Node.js/JSDOM environment without a canvas.
const mockChart = {
    toBase64Image: jest.fn().mockReturnValue('data:image/png;base64,....'),
    update: jest.fn(),
    data: {},
};
global.Chart = jest.fn().mockImplementation(() => mockChart);


describe('Username Validation', () => {
    let usernameInput;

    beforeEach(() => {
        // Set up JSDOM's document body
        const html = `
            <input id="username" type="text">
            <div id="chart-tab"></div>
            <div id="monthly-data-container"></div>
            <canvas id="myBarChart"></canvas>
            <button id="download-chart-btn"></button>
        `;
        document.body.innerHTML = html;

        // Load and execute the script
        const scriptPath = path.join(__dirname, '..', 'src', 'js', 'script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');

        // Mueve esta línea PRIMERO: REGISTRA los listeners antes de simular el evento
        eval(scriptContent);

        // The script is wrapped in a DOMContentLoaded listener. We can simulate that.
        document.dispatchEvent(new Event('DOMContentLoaded', {
            bubbles: true,
            cancelable: true
        }));
        
        usernameInput = document.getElementById('username');

        // Mock reportValidity as it's not fully implemented in JSDOM
        usernameInput.reportValidity = jest.fn();
    });

    const simulateInput = (value) => {
        usernameInput.value = value;
        usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    test('should show red border for username shorter than 8 characters', () => {
        simulateInput('Short1!');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
        // para que guarde un snapshot del input
        expect(usernameInput).toMatchSnapshot(); 
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show red border for username longer than 15 characters', () => {
        simulateInput('ThisIsWayTooLong1!');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show red border for username without an uppercase letter', () => {
        simulateInput('nouppercase1!');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show red border for username without a number', () => {
        simulateInput('NoNumberUser!');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show red border for username without a special character', () => {
        simulateInput('NoSpecialChar1');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show green border for a valid username', () => {
        simulateInput('ValidUser1!');
        expect(usernameInput.style.borderColor).toBe('green');
        expect(usernameInput.validationMessage).toBe('');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show green border for a valid username with unicode characters', () => {
        simulateInput('ValidÜser1$');
        expect(usernameInput.style.borderColor).toBe('green');
        expect(usernameInput.validationMessage).toBe('');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });

    test('should show red border for an empty username', () => {
        simulateInput('');
        expect(usernameInput.style.borderColor).toBe('red');
        expect(usernameInput.reportValidity).toHaveBeenCalled();
    });
});
