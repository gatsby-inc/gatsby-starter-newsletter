import { errorResponse, validateRequiredFields } from "../utils/apiHelpers"

export default function formHandler(req, res) {
  // Validates that the request is a POST request
  if (req.method !== "POST") {
    return res
      .status(404)
      .json(
        errorResponse(404, "This path only accepts requests with method POST")
      )
  }

  // Returns a server error 20% of the time
  const throwRandomError = Math.random() * 100 < 20

  if (throwRandomError) {
    return res
      .status(500)
      .json(errorResponse(500, "Internal server error. Please try again."))
  }

  // Validates that all required fields were sent with the form
  const validationErrors = validateRequiredFields(req.body)

  if (validationErrors.length > 0) {
    return res.status(400).json(errorResponse(400, validationErrors))
  }

  // If input is valid, then return a success response
  const { name, email, country, region } = req.body
  return res.status(200).json({
    status: 200,
    data: {
      message: "Successful registration",
      name,
      email,
      country,
      region,
    },
  })
}
