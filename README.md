## Guidelines

- This exercise should take you 4-6 hours to complete
  - They don’t need to be consecutive hours, and we won’t be timing you! This is simply a guideline.
- We recognize this time frame might not let you be as comprehensive as you’d like. That’s okay!

## Requirements

For this exercise, you will implement the backend of a newsletter sign-up form — validating input and persisting successful submissions.

Your engineering team has already been provided a functional UI where users can sign up for the newsletter. For this exercise, you'll only be building the backend that handles requests from the UI (You won't need to make any additional changes to the UI itself.)

Your implementation should meet the following requirements:

- Setup a new server with an endpoint to process newsletter sign-ups.
- Handle the POST requests with form data that the UI provided makes upon submission (see Additional Docs below).
- Gracefully handle any errors per the validation rules.
- The front-end should show any validation errors returned from unsuccessful form submissions.
- Persist successful form submissions locally by writing to a JSON file.
- Include unit tests for your implementation.
- Choose _only one_ of the following requirements:
  - Write your code in TypeScript.
  - Add an additional field to the form and endpoint that might be useful such as phone number, zip code, or desired newsletter frequency.
  - Do something else that shows off your skills! (If you choose this option, explain in your README why this is a valuable addition.)

Along with your code submission, please include a **brief** README to cover the following:

- Explain any decisions you made when working on the assignment. (Trade-offs or other considerations.)
- What are some questions you would ask the technical lead of this project (if any)?
- What are some questions you would ask the designer about this design (if any)?
- We are always looking to improve our interviewing process! Please let us know what your experience was completing this project. (Your answer here won't count for/against you, but we'll use your feedback to make improvements to this assignment.)
- Was the scope too large to finish within the given time requirement? Was it not large enough? Are there any improvements we could make the prompt easier to understand?

Your goal is to finish as much of this as you can in the time that you have!

## Additional Docs

- [Form submission API endpoint](#form-submission-api-endpoint)
- [Countries and regions](#countries-and-regions)
- [Testing conventions](#testing-conventions)

### Form submission API endpoint

Your job is to setup a new Node.js server and build an endpoint that can be used to process submitted form data. The UI is expecting to send a `POST` to `http://localhost:3000/newsletter-signup`. An example of the JSON payload you will be processing can be seen below:

```json
{
  "name": "Johnny Appleseed",
  "email": "johnny@example.com",
  "country": "United States",
  "region": "New York"
}
```

The validation rules that you will need to enforce are:

- All values are required (with the caveat of region when it's not applicable)
- The name must be at least two characters in length
- The email must be a valid email address
- The country and region must be valid values, see [Countries and region](#countries-and-regions) for more information on what that means

A successful response will look like the object below:

```jsx
{
  status: 200,
  data: {
    message: "Successful registration"
  }
}
```

If something is wrong with the request that was sent (missing or invalid input), the endpoint should respond with a 400 error similar to the one below. (Note: The client is not validating any of the form inputs, so it's all on the server to validate the information provided).

```jsx
{
  status: 400,
  errors: [{
    message: "Missing required field: name"
  }]
}
```

Also note that the error property returns an _array_ of errors; there may be more than one error message returned.

### Countries and regions

The project code includes a JSON file (**src/data/countryRegionSelect.json**) that contains all the countries included in the Country dropdown.

Some of the countries will also require an additional Region field:

- If the country is United States, the Region should be validated against the list the U.S. states.
- If the country is Canada, the Region should be validated against list the Canadian provinces.
- If the country is something else, the Region should not be validated.

The available states and provinces can also be found in the **src/data/countryRegionSelect.json** file.

### Testing conventions

The project is already set up to use Jest, however you can decide to use another test framework if you prefer. The point is to see some sort of test coverage on the code you write to satisfy the project requirements.

## How to Submit

Use the files in this project as an initial commit to a new private Github repository. Submit your solution as a pull request to that repository. Please include a PR description that explains how to run the project as well as your approach to the problem. You may also use that opportunity to explain how you prioritized the items or communicate anything else of importance.

When you’ve completed your project, please send the link to the private repository to [caitlin.byrnes@gatsbyjs.com](mailto:caitlin.byrnes@gatsbyjs.com). Please make sure to share the private repository with the following Github users:

- vitaliy-at-gatsby
- rmatambo8
- jxnblk
- greglobinski
- aghreed
- fk

Once you’ve submitted your work, you can expect to hear from Rachel about payment details within 2 business days.
