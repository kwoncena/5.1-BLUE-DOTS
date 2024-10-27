// Select the SVG container
const svg = d3.select("svg");

// Array of shades of blue for the circles
const blueShades = ["#add8e6", "#87cefa", "#6495ed", "#4682b4", "#4169e1"];

// Function to create circles randomly over the screen
function createRandomCircles(svg) {
    // Random number of circles between 10 to 20
    const numberOfCircles = Math.floor(Math.random() * 10) + 10;

    // Generate circles with random positions and sizes
    const circlesData = Array.from({ length: numberOfCircles }, () => ({
        x: Math.random() * 1000, // Random x-coordinate within viewBox
        y: Math.random() * 1000, // Random y-coordinate within viewBox
        r: Math.random() * 50 + 10, // Random radius between 10 and 60
        color: blueShades[Math.floor(Math.random() * blueShades.length)]
    }));

    // Append circles to SVG
    svg.selectAll(null) // Use 'null' to ensure new circles are appended
        .data(circlesData)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .style("fill", d => d.color);
}

// Event listener for key presses
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling
        createRandomCircles(svg);
    }

    // Delete the most recent set of circles if 'Backspace' or 'Delete' is pressed
    if (event.code === 'Backspace' || event.code === 'Delete') {
        event.preventDefault(); // Prevent navigation or default behavior
        removeLastCircles();
    }
});

// Function to remove the most recently created circles
function removeLastCircles() {
    const circles = svg.selectAll("circle");
    if (!circles.empty()) {
        circles.nodes().slice(-10).forEach(circle => circle.remove());
    }
}

// Variables to track drawing state
let isDrawing = false;
let currentPath;

// Function to start drawing
function startDrawing(event) {
    isDrawing = true;
    const [x, y] = d3.pointer(event);

    // Create a new path element for drawing
    currentPath = svg.append("path")
        .attr("d", `M ${x},${y}`) // Move to the starting point
        .attr("stroke", "#0000FF") // Blue stroke color
        .attr("stroke-width", 2)   // Adjust stroke width as needed
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");
}

// Function to update the drawing as the user drags the mouse
function draw(event) {
    if (!isDrawing) return;

    const [x, y] = d3.pointer(event);

    // Update the path data to include the new point
    const d = currentPath.attr("d");
    currentPath.attr("d", `${d} L ${x},${y}`); // Draw a line to the new point
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Event listeners for drawing
svg.on("mousedown", startDrawing)
   .on("mousemove", draw)
   .on("mouseup", stopDrawing)
   .on("mouseleave", stopDrawing);
