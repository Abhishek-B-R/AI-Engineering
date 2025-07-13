
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.8.0'

// Reference the elements that we will need
const status = document.getElementById('status')
const image = document.getElementById('image')

// Load model and create a new object detection pipeline
status.textContent = 'Loading model...'

const objectDetector = await pipeline('image-object-detection', 'Xenova/yolos-tiny')

// Update the status
status.textContent = 'Detecting objects...'

// Run the object detection pipeline
const results = await objectDetector(image.scroll,{
    threshold: 0.5, // Set a threshold for detection confidence
    percentage: true // Return scores as percentages
})

// Log the results to the console
console.log(results)

// Update the status
status.textContent = 'Done!'

// Draw the bounding boxes on the image
results.forEach((result) => {
const { box, label, score } = result
image.getContext('2d').strokeRect(box[0], box[1], box[2] - box[0], box[3] - box[1])
image.getContext('2d').fillText(`${label} (${(score * 100).toFixed(2)}%)`, box[0], box[1] > 10 ? box[1] - 5 : box[1] + 10)
})
