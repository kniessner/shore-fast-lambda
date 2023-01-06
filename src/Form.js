import React, { Component } from "react"

import "./App.css";
import { useState } from "react";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";

function Form() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pin, setPin] = useState("");
  const [company, setCompany] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("DE");

  countries.registerLocale(enLocale);
    // Returns an object not a list
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
      return {
        label: value,
        value: key
      };
    });



  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(".netlify/functions/createPosAccount", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'x-api-Version': '3' },
        body: JSON.stringify({
          first_name: name,
          last_name: last_name,
          email: email,
          password: pass,
          name: company,
          privacy_policy: "on",
          phone: mobileNumber,
          country: 'DE',
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
       /*  setName("");
        setEmail("");
        setMobileNumber("");
        setCountry("");
        setPass("");
        setPin("");
        setMobileNumber("");
        setLastName("");
        setCompany(""); */
        setMessage("<p class='success'>User created <b>successfully</b> <br/> <a href='"+resJson.url+"'>"+resJson.url+"</a></p>");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="Form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={last_name}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
         <input
          type="text"
          value={company}
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <select name="signUpCountry" id="signUpCountry"  value={country}  onChange={(e) => setCountry(e.target.value)}>
         <option value="DE"> Germany</option>
         {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="password"
          value={pass}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          type="text"
          value={pin}
          placeholder="Pin"
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit">Create</button>
        <div className="message" dangerouslySetInnerHTML={{ __html: message ? message : null }}></div>
      </form>
    </section>
  );
}

export default Form;
