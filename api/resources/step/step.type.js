
export class Step {
    id;
    description;
    image; // Base64 encoded image
    previousStep;
    nextStep;
    module;
}

// module.exports = { Step };