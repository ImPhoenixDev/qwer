import React, { useState } from "react"
import axios from "axios"
import Layout from "../components/layout"

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3"

const IndexPage = () => {
  const [token, setToken] = useState()

  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  })
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg }
    })
    if (ok) {
      form.reset()
    }
  }
  const handleOnSubmit = e => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })
    const data = new FormData(form)
    data.append("g-recaptcha-response", token)

    console.log(data, "data")
    axios({
      method: "post",
      url: "https://getform.io/f/b22f10be-75a6-40c0-9ec6-3519dc38fe29",
      data
    })
      .then(r => {
        handleServerResponse(true, "Thanks!", form)
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form)
      })
  }
  return (
    <Layout>
      <div className="col-md-8 mt-5">
        <h3>Getform.io Gatsby Form Example</h3>
        <GoogleReCaptchaProvider reCaptchaKey="6LfSJOoUAAAAACo5FptLy5inFhJmhIPF9E9ekwsN">
          <form onSubmit={handleOnSubmit}>
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="name" placeholder="Your Name" />
            <input type="text" name="message" placeholder="Your Message" />
            <button type="submit">Send</button>
            <GoogleReCaptcha
              onVerify={token => {
                setToken(token)
              }}
            />
          </form>
        </GoogleReCaptchaProvider>
      </div>
    </Layout>
  )
}

export default IndexPage
