import React, { useState } from "react"
import { Formik, Form, Field, FieldProps } from "formik"
import Dropdown from "./dropdown"
import countryRegionData from "../data/countryRegionSelect.json"

const countries = countryRegionData.map(country => country.countryName)
const regionPlaceholderValue = "Select a region"
const regions = countryRegionData.reduce(
  (prev, current) =>
    current.regions && current.regions.length > 0
      ? [...prev, ...current.regions.map(region => region.name)]
      : prev,
  []
)

console.log("regions: ", regions)

const showServerErrors = (serverError: ServerError) =>
  serverError.status !== 200

const renderFormHeader = (serverError: ServerError) => {
  if (showServerErrors(serverError)) {
    return (
      <div key="error" className="error-message-container">
        <h4>
          {serverError.status === 500
            ? "Our server returned an error 🚨 (it's us, not you)"
            : "Something went wrong :("}
        </h4>
        {serverError.status === 500 ? (
          <p>
            Please click the <strong>Sign me up</strong> button to try again. We
            saved your input below:
          </p>
        ) : (
          <div>
            <p>Please review the following fields:</p>
            <ul>
              {serverError.errorMessages.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
  return (
    <div key="default">
      <h4>Newsletter</h4>
      <p>
        I'm sending an update once a month — I'll never sell your email. And you
        can really, truly unsubscribe anytime.
      </p>
    </div>
  )
}

type FormValues = {
  name: string
  email: string
  country: string
  region?: string
}

const initialValues: FormValues = {
  name: "",
  email: "",
  country: "Select a country",
  region: regionPlaceholderValue,
}

type ServerError = {
  status: number
  errorMessages: string[]
}

const NewsletterSignup = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false)
  const [serverError, setServerError] = useState<ServerError>({
    status: 200,
    errorMessages: [],
  })
  return (
    <section className="newsletter-signup">
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          const response = await window.fetch(
            `http://localhost:3000/newsletter-signup`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                email: values.email,
                country: values.country,
                region:
                  values.region === regionPlaceholderValue
                    ? null
                    : values.region,
              }),
            }
          )

          const { errors } = await response.json()
          if (response.ok) {
            setSubmissionSuccess(true)
          } else {
            const errorMessages = errors?.map(error => error.message)
            setServerError({
              status: response.status,
              errorMessages,
            })
            return Promise.reject(errorMessages.join("\n"))
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, submitCount, isValid }) => (
          <div
            className={`newsletter-signup-form-container ${
              (!isValid && submitCount > 0) || serverError.status !== 200
                ? "error"
                : ""
            } ${submissionSuccess && "success"}`}
          >
            {submissionSuccess ? (
              <div>
                <h4>Successfully signed up to the newsletter ✅</h4>
                <p>See you soon in an inbox near you ;)</p>
              </div>
            ) : (
              <>
                {renderFormHeader(serverError)}
                <Form>
                  <div className={`input-group`}>
                    <label htmlFor="name">Name *</label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Johnny Appleseed"
                    />
                  </div>

                  <div className={`input-group`}>
                    <label htmlFor="email">Email *</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johnny@example.com"
                    />
                  </div>

                  <div className={`input-group`}>
                    <label htmlFor="country">Country *</label>
                    <Field id="country" name="country">
                      {({ field }: FieldProps) => (
                        <Dropdown
                          items={countries}
                          selectedItem={field.value}
                          handleSelectedItemChange={({ selectedItem }) => {
                            setFieldValue("country", selectedItem)
                            setFieldValue("region", regionPlaceholderValue)
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  <div className={`input-group`}>
                    <label htmlFor="region">
                      {values.country === "Canada" ? "Province" : "State"} *
                    </label>
                    <Field id="region" name="region">
                      {({ field }) => (
                        <Dropdown
                          items={[regionPlaceholderValue, ...regions]}
                          selectedItem={field.value}
                          handleSelectedItemChange={({ selectedItem }) => {
                            setFieldValue("region", selectedItem)
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  <button
                    name="submit"
                    className="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign me up
                  </button>
                  <span>* required fields</span>
                </Form>
              </>
            )}
          </div>
        )}
      </Formik>
    </section>
  )
}

export default NewsletterSignup
