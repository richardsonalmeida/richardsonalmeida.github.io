document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const container = document.getElementById(
            "labs-container"
        );

        if (!container) {

            return;
        }

        const labFiles = [
            "assets/data/labs/operational-cockpit.json"
        ];

        for (const file of labFiles) {

            try {

                const response = await fetch(file);

                const lab = await response.json();

                renderLabCard(
                    container,
                    lab
                );

            } catch (error) {

                console.error(
                    `Error loading ${file}:`,
                    error
                );

            }

        }

    }
);

function renderLabCard(
    container,
    lab
) {

    const card = document.createElement(
        "article"
    );

    card.className = "lab-card";

    const stackHTML = lab.stack
        .map(
            tech =>
                `<span>${tech}</span>`
        )
        .join("");

    card.innerHTML = `

        <h3>
            ${lab.title}
        </h3>

        <p>
            ${lab.description}
        </p>

        <div class="stack">
            ${stackHTML}
        </div>

        <a
            href="${lab.repository}"
            target="_blank"
        >
            View Repository
        </a>

    `;

    container.appendChild(card);

}