function startGame(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (username === '' || email === '') {
        errorMessage.textContent = "Please fill out all fields.";
        return;
    }

    // Hide signup and show game section
    document.getElementById("signup-section").classList.add("hidden");
    document.getElementById("game-section").classList.remove("hidden");

    // Start the game with the player's name
    startStory(username);
}

function startStory(username) {
    const storyElement = document.getElementById("story");
    const choicesElement = document.getElementById("choices");

    const storyData = {
        start: {
            text: `Hello ${username}! You find yourself in a dark forest. There's a path leading north and another leading east. Which way will you go?`,
            choices: [
                { text: "Go north", next: "northPath" },
                { text: "Go east", next: "eastPath" }
            ],
            backgroundClass: "start-section"
        },
        northPath: {
            text: `You walk north and come across a river. Do you want to swim across or follow the river?`,
            choices: [
                { text: "Swim across", next: "swim" },
                { text: "Follow the river", next: "followRiver" }
            ],
            backgroundClass: "north-section"
        },
        eastPath: {
            text: `You walk east and find a small hut. Do you want to knock on the door or keep walking?`,
            choices: [
                { text: "Knock on the door", next: "knockDoor" },
                { text: "Keep walking", next: "keepWalking" }
            ],
            backgroundClass: "east-section"
        },
        swim: {
            text: `You swim across the river and find a hidden treasure chest. Congratulations, ${username}! You've completed the adventure.`,
            choices: [],
            backgroundClass: "swim-section"
        },
        followRiver: {
            text: `You follow the river and discover a peaceful village. The villagers welcome you warmly. Adventure complete!`,
            choices: [],
            backgroundClass: "village-section"
        },
        knockDoor: {
            text: `You knock on the door, and an old man invites you in for tea. He shares stories of the forest. Adventure complete!`,
            choices: [],
            backgroundClass: "hut-section"
        },
        keepWalking: {
            text: `You keep walking and eventually find your way out of the forest. Adventure complete!`,
            choices: [],
            backgroundClass: "exit-section"
        }
    };

    function showStorySection(section) {
        const currentSection = storyData[section];
        
        // Update story text and choices
        storyElement.textContent = currentSection.text;
        choicesElement.innerHTML = "";
        
        // Update background based on section
        document.body.className = currentSection.backgroundClass;
        
        // Display choices as buttons
        currentSection.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.addEventListener("click", () => showStorySection(choice.next));
            choicesElement.appendChild(button);
        });
    }

    showStorySection("start");
}
