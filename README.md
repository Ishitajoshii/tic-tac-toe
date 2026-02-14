# Tic Tac Toe

A simple Tic Tac Toe game implemented using HTML, CSS, and JavaScript.

## Features

-   Interactive game board
-   Turn indicator
-   Win/draw detection
-   Reset button to start a new game
-   Responsive design for mobile and desktop

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript (ES6+)

## Design System

The game follows a dark theme design system with the following specifications:

-   **Colors:**
    -   Primary: `#6366F1`
    -   Secondary: `#A855F7`
    -   Background: `#111827`
    -   Surface: `#1F2937`
    -   Text: `#E5E7EB`
    -   Text Secondary: `#9CA3AF`
    -   Accent: `#FCD34D`
    -   Error: `#F87171`
    -   Success: `#34D399`
    -   Board Background: `#374151`
    -   X Color: `#F472B6`
    -   O Color: `#6EE7B7`
-   **Typography:**
    -   Font Family: `Roboto, sans-serif`
    -   Heading Font: `Roboto, sans-serif`
    -   Base Size: `16px`
    -   Scale: `1.2`
-   **Spacing:**
    -   Unit: `4px`
    -   Page Padding: `16px`
    -   Card Padding: `12px`
    -   Border Radius: `6px`
    -   Grid Gap: `8px`

## Getting Started

1.  Clone the repository:

    ```bash
    git clone [repository_url]
    ```

2.  Navigate to the project directory:

    ```bash
    cd tic-tac-toe
    ```

3.  Open `index.html` in your browser.

## File Structure

```
tic-tac-toe/
├── index.html       # Main HTML file
├── css/
│   └── style.css    # CSS styles
├── js/
│   └── script.js    # JavaScript game logic
├── test/
│   └── script.test.js # JavaScript tests
├── README.md        # Project documentation
└── package.json     # Node.js package configuration file
```

## Game Logic

The game logic is implemented in `js/script.js`. It handles:

-   Tracking the current player
-   Updating the game board
-   Checking for a win or draw
-   Updating the UI

## Testing

The project includes unit tests written using Jest, located in `test/script.test.js`. To run the tests, you'll need to have Node.js and npm installed.

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Run the tests:

    ```bash
    npm test
    ```

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

[MIT](LICENSE)