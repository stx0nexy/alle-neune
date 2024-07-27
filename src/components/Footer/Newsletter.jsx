import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubHeading from "../SubHeading/SubHeading";
import "./Newsletter.css";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    surname: "",
    phoneNumber: "+49",
    countPersons: 1,
    message: "",
    agreeToTerms: false,
    agreeToDataProcessing: false,
  });

  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const times = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!value.startsWith('+49'))
        e.target.value = '+49';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Datum ist erforderlich";
    if (!formData.time) newErrors.time = "Uhrzeit ist erforderlich";
    if (!formData.name) newErrors.name = "Name ist erforderlich";
    if (!formData.surname) newErrors.surname = "Nachname ist erforderlich";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Einverstanden mit den Bedingungen ist erforderlich";
    if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = "Einverstanden mit der Datenverarbeitung ist erforderlich";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    const timeWithSeconds = `${formData.time}:00`;
    const data = {
      DateReservation: formData.date,
      TimeReservation: timeWithSeconds,
      Name: formData.name,
      Surname: formData.surname,
      PhoneNumber: formData.phoneNumber,
      CountPersons: formData.countPersons,
      Message: formData.message,
    };

    fetch("http://localhost:5223/api/reserve/items?api-version=1.0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response Status:", response.status);

        if (response.status === 201) {
          setFormData({
            date: "",
            time: "",
            name: "",
            surname: "",
            phoneNumber: "+49",
            countPersons: 1,
            message: "",
            agreeToTerms: false,
            agreeToDataProcessing: false,
          });
          setLoading(false);
          setMessage("Daten erfolgreich empfangen!");
        } else if (response.status === 204) {
          setLoading(false);
          setMessage("Anfrage erfolgreich bearbeitet, aber keine Daten zum Anzeigen.");
        } else {
          return response.text().then((text) => {
            throw new Error(`Serverfehler: ${response.status} ${text}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setMessage("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      });
  };

  const isFormValid = () => {
    return (
      formData.date &&
      formData.time &&
      formData.name &&
      formData.surname &&
      formData.phoneNumber &&
      formData.message &&
      formData.agreeToTerms &&
      formData.agreeToDataProcessing
    );
  };

  return (
    <div className="app__reservation">
      <div className="app__reservation-heading">
        <SubHeading title="Reservierung" />
        <h1 className="headtext__cormorant">Tisch reservieren</h1>
        <p className="p__opensans">
          Hinterlassen Sie Ihre Reservierungsinformationen und wir werden uns mit Ihnen in Verbindung setzen.
        </p>
        <p className="p__opensans">Sie können auch telefonisch reservieren: 0351 6492118</p>
      </div>
      <form className="app__reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={minDate}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>

        <div className="form-group">
          <select name="time" value={formData.time} onChange={handleChange} required>
            <option value="" disabled>Wählen Sie eine Uhrzeit</option>
            {times.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <div className="error-message">{errors.time}</div>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="surname"
            placeholder="Nachname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          {errors.surname && <div className="error-message">{errors.surname}</div>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Telefonnummer"
            value={formData.phoneNumber}
            onChange={handleChange}
            onInput={handleInput}
            required
            pattern="^\+49\d{10}$"
          />
          {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>

        <div className="form-group">
          <select name="countPersons" value={formData.countPersons} onChange={handleChange} required>
            {[...Array(6).keys()].map((i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Hinterlassen Sie uns eine Nachricht"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group checkbox-wrapper">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            Ich stimme den <Link to="/terms-of-service" className="link">Nutzungsbedingungen</Link> zu.
          </label>
          {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
        </div>

        <div className="form-group checkbox-wrapper">
          <label>
            <input
              type="checkbox"
              name="agreeToDataProcessing"
              checked={formData.agreeToDataProcessing}
              onChange={handleChange}
              required
            />
            Ich stimme der <Link to="/privacy-policy" className="link">Datenschutzrichtlinie</Link> zu.
          </label>
          {errors.agreeToDataProcessing && <div className="error-message">{errors.agreeToDataProcessing}</div>}
        </div>

        <div className="form-group">
          <button type="submit" className="custom__button" disabled={!isFormValid()}>
            {loading ? <span className="loader"></span> : 'Reservieren'}
          </button>
        </div>

        {message && <div className="message-box">{message}</div>}
      </form>
    </div>
  );
};

export default Newsletter;
