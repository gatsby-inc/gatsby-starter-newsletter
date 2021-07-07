const REQUIRED_FIELDS = ["name", "email", "country"]
const emailRegex = /\S+@\S+\.\S+/

const errorMessage = message => ({ message })

export function validateRequiredFields(submittedFields) {
  const errors = []
  const { email, country, region } = submittedFields

  // Validate that required fields exist and are of correct type
  REQUIRED_FIELDS.forEach(field => {
    if (!submittedFields[field]) {
      errors.push(`Missing required field: ${field}`)
    } else if (typeof submittedFields[field] !== "string") {
      errors.push(`The following field must be of type string: ${field}`)
    }
  })

  // Validate that US and CA registrations also have a region
  if ((country === "US" || country === "CA") && !region) {
    errors.push(`Region is required for country: ${country}`)
  }

  if (!emailRegex.test(email)) {
    errors.push(`Email must be in format: abc@def.xyz`)
  }

  return errors
}

// Accepts a status code, and an array of strings or a string
export function errorResponse(status, messages = []) {
  // If a single error message was passed as a string, add it to an array
  if (typeof messages === "string") {
    messages = [messages]
  }

  const errors = messages.map(msg => errorMessage(msg))

  return {
    status,
    errors,
  }
}
