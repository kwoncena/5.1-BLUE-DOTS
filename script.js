
        // Datasets
        const datasets = [
            [
                { x: 50, y: 50, label: "Point A" },
                { x: 150, y: 150, label: "Point B" },
                { x: 250, y: 250, label: "Point C" },
                { x: 350, y: 350, label: "Point D" },
                { x: 450, y: 450, label: "Point E" }
            ],
            [
                { x: 50, y: 50, r: 10, label: "Point A" },
                { x: 150, y: 50, r: 20, label: "Point B" },
                { x: 250, y: 50, r: 30, label: "Point C" },
                { x: 350, y: 50, r: 40, label: "Point D" },
                { x: 450, y: 50, r: 50, label: "Point E" }
            ],
            [
                { x: 50, y: 50, r: 10, label: "Point A" },
                { x: 50, y: 150, r: 20, label: "Point B" },
                { x: 50, y: 250, r: 30, label: "Point C" },
                { x: 50, y: 350, r: 40, label: "Point D" },
                { x: 50, y: 450, r: 50, label: "Point E" }
            ],
            [
                { x: 50, y: 450, r: 10, label: "Point A" },
                { x: 150, y: 450, r: 20, label: "Point B" },
                { x: 250, y: 450, r: 30, label: "Point C" },
                { x: 350, y: 450, r: 40, label: "Point D" },
                { x: 450, y: 450, r: 10, label: "Point E" }
            ],
            [
                { x: 450, y: 50, r: 10, label: "Point A" },
                { x: 450, y: 150, r: 40, label: "Point B" },
                { x: 450, y: 250, r: 30, label: "Point C" },
                { x: 450, y: 350, r: 20, label: "Point D" },
                { x: 450, y: 450, r: 10, label: "Point E" }
            ]
        ];

        // Array of shades of blue for the circles
        const blueShades = ["#add8e6", "#87cefa", "#6495ed", "#4682b4", "#4169e1"];

        // List of currently active SVGs
        const activeSVGs = [];

        // Function to create and randomly position SVG
        function createSVGWithData(data) {
            // Random positioning for the SVG
            const randomX = Math.random() * (window.innerWidth - 500);
            const randomY = Math.random() * (window.innerHeight - 500);

            const container = d3.select("body")
                .append("div")
                .attr("class", "svg-container")
                .style("left", `${randomX}px`)
                .style("top", `${randomY}px`);

            // Create SVG element
            const svg = container.append("svg")
                .attr("width", 500)
                .attr("height", 500);

            // Append circles to SVG
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", d => d.r || 20) // Use 'r' from data, default to 20 if undefined
                .style("fill", (d, i) => blueShades[i % blueShades.length]);

            // Keep track of the created SVG container
            activeSVGs.push(container);
        }

        // Event listener for key presses
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                // Prevent scrolling
                event.preventDefault();

                // Randomly pick a dataset
                const randomDataset = datasets[Math.floor(Math.random() * datasets.length)];
                createSVGWithData(randomDataset);
            }

            // Delete the most recent SVG if 'Backspace' or 'Delete' is pressed
            if (event.code === 'Backspace' || event.code === 'Delete') {
                if (activeSVGs.length > 0) {
                    const lastSVG = activeSVGs.pop();
                    lastSVG.remove();
                }
            }
        });