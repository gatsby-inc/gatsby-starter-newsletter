## Guidelines

- This exercise should take you 4-6 hours to complete
  - They don’t need to be consecutive hours, and we won’t be timing you! This is simply a guideline.
- We recognize this time frame might not let you be as comprehensive as you’d like. That’s okay!

## Requirements

For this exercise, you will implement the sign-up flow based on a set of provided designs. The zip folder for the project is available at [https://drive.google.com/drive/folders/1M4wIUtPAlktGpi-Tg0h6JH1UsUYe8_7s]. (Designs for both desktop and mobile views can be found in the /designs folder).

Your engineering team has already been provided an API endpoint where form data can be posted. The Additional Docs section includes more information about how the endpoint works. For this exercise, you'll only be building the frontend that communicates with the API endpoint. (You won't need to make any additional changes to the API itself.)

Your implementation should meet the following requirements:

- Post your form data to the API provided (see Additional Docs below).
- Gracefully handle any errors that come back from the API.
- Include automated tests for your implementation.
- Persist the form submissions locally using [json-server][]
- The front-end styling should roughly match the desktop designs

[json-server]: https://npmjs.com/package/json-server

Along with your code submission, please include a **brief** README to cover the following:

- Explain any decisions you made when working on the assignment. (Trade-offs or other considerations.)
- What are some questions you would ask the designer about this design?
- We are always looking to improve our interviewing process! Please let us know what your experience was completing this project. (Your answer here won't count for/against you, but we'll use your feedback to make improvements to this assignment.)
  - Was the scope too large to finish within the given time requirement? Was it not large enough? Are there any improvements we could make the prompt easier to understand?

Your goal is to finish as much of this as you can in the time that you have!

## Additional Docs

- [Form submission API endpoint](#form-submission-api-endpoint)
- [Countries and regions](#countries-and-regions)
- [Testing conventions](#testing-conventions)

### Form submission API endpoint

Your engineering team has already built an endpoint (**/api/form**) that you can use to submit form data. To submit form data, you can make a POST request to the endpoint, as shown in the code block below:

```jsx
const response = await window
  .fetch(`/api/form`, {
    method: `POST`,
    headers: {
      "content-type": "application/json",
    },
    body: {
      // Insert whatever data you want to send in the request.
      // For example:
      hello: "world",
    },
  })
  .then(res => res.json())
```

A successful response will look like the object below:

```jsx
{
  status: 200,
  data: {
    message: "Successful registration"
  }
}
```

If something is wrong with the request that was sent (like it's not a POST request or there's some data missing), the endpoint will respond with a 400 error similar to the one below. (Your client-side validation of the form inputs should check for any data problems before calling the form endpoint.)

```jsx
{
  status: 400,
  errors: [{
    message: "Missing required field: name"
  }]
}
```

Unfortunately, the form endpoint isn't super reliable. Sometimes, things go wrong on the server, and requests will return a 500 error code. In that case, the response will look something like this:

```jsx
{
  status: 500,
  errors: [{
    message: ["Internal server error, please try again."]
  }]
}
```

Note that the error property returns an *array* of errors; there may be more than one error message returned.

### Countries and regions

The project code includes a JSON file (**src/data/countryRegionSelect.json**) that contains all the countries to be included in the Country dropdown.

Some of the countries will also require an additional Region field:

- If the country is USA, the Region dropdown should list the U.S. states.
- If the country is Canada, the Region dropdown should list the Canadian provinces.
- If the country is something else, the Region dropdown should not display.

The available states and provinces can also be found in the **src/data/countryRegionSelect.json** file.

### Testing conventions

The project is already set up to use Jest. If you decide to add automated tests for your form, look at the **src/tests/layout.test.js** file for an example of how to use the testing framework.

## How to Submit

Use the files in this project as an initial commit to a new private Github repository. Submit your solution as a pull request to that repository. Please include a PR description that explains the approach to the problems. You may also use that opportunity to explain how you prioritized the items or communicate anything else of importance.

When you’ve completed your project, please send the link to the private repository to [caitlin.byrnes@gatsbyjs.com](mailto:caitlin.byrnes@gatsbyjs.com). Please make sure to share the private repository with the following Github users:

- vitaliy-at-gatsby
- rmatambo8
- jxnblk
- thinkybeast
- aghreed
- fk

Once you’ve submitted your work, you can expect to hear from Rachel about payment details within 2 business days.
