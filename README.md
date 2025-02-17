
# Sorting Visualizer

A web-based sorting visualizer that demonstrates various sorting algorithms in action using HTML, CSS, and JavaScript. The project features animated, color-coded visualizations along with pause/resume functionality to help you understand how different sorting algorithms work.

## Live Demo

Check out the live demo: [Sorting Visualizer Live](https://sorting-visualizer-weld-eta.vercel.app/)

## Screenshot

![Screenshot 2025-02-17 102050](https://github.com/user-attachments/assets/252aa96c-a0f9-4f20-865a-a22b40c0411a)

## Features

- **Multiple Sorting Algorithms:**
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Quick Sort
  - Merge Sort

- **Color-Coded Visualization:**
  - **Default Elements:** Cyan
  - **Comparisons:** Red
  - **Key/Selected Elements:** Yellow
  - **Pivot (Quick Sort):** Purple
  - **Merge (Left Subarray):** Orange
  - **Merge (Right Subarray):** Pink
  - **Sorted/Final:** Green

- **Interactive Controls:**
  - **Generate New Array:** Create a random array of bars.
  - **Sorting Buttons:** Start any of the included sorting algorithms.
  - **Pause/Resume:** Control the sorting process.
  - **Status Display:** View the current state of the sorting process.

## Project Structure

```
sorting-visualizer/
├── index.html    # Main HTML file with controls and container for visualization
├── style.css     # CSS styling for the visualizer
└── script.js     # JavaScript logic for array generation, sorting algorithms, and animations
```

## How to Use

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YourUsername/Sorting-Visualizer.git
   cd Sorting-Visualizer
   ```

2. **Open the Application:**

   - Open `index.html` directly in your web browser, or
   - Use a local server (e.g., [VSCode Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) for a better experience.

3. **Using the Controls:**

   - Click **Generate New Array** to create a new set of random bars.
   - Click on one of the sorting algorithm buttons (e.g., **Bubble Sort**, **Quick Sort**, etc.) to start the visualization.
   - Use the **Pause** and **Resume** buttons to control the sorting process.
   - The **Status** display will update to show which algorithm is running or when sorting is complete.

## Customization

- You can modify the colors, delay intervals, or any part of the sorting algorithms in `script.js`.
- The color variables (default, compare, key, pivot, etc.) are defined at the top of `script.js` for easy customization.

## Deployment

This is a static project, so you can deploy it on any static hosting platform such as GitHub Pages, Vercel, or Netlify.

### Deploying on Vercel

1. **Install Vercel CLI (if not already installed):**

   ```bash
   npm install -g vercel
   ```

2. **Deploy the Project:**

   ```bash
   vercel
   ```

   Follow the prompts to deploy your project.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This project was built for educational purposes to help visualize how sorting algorithms work.
- Inspired by various online sorting visualizer projects and educational resources.
```

---

Feel free to modify or expand the README as needed. Enjoy your Sorting Visualizer project!
