import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubHeading from "../../components/SubHeading/SubHeading";
import "./Reserve.css";
import LoadingButton from '@mui/lab/LoadingButton';

const Reserve = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    title: "",
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
  const titles = [ 'Herr', "Frau"];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "date":
        if (!value) newErrors.date = "Datum ist erforderlich";
        else delete newErrors.date;
        break;

      case "time":
        if (!value) newErrors.time = "Uhrzeit ist erforderlich";
        else delete newErrors.time;
        break;

      case "name":
        if (!value) newErrors.name = "Name ist erforderlich";
        else delete newErrors.name;
        break;

      case "surname":
        if (!value) newErrors.surname = "Nachname ist erforderlich";
        else delete newErrors.surname;
        break;

      case "phoneNumber":
        const phoneNumberDigits = value.replace(/\D/g, '');
        if (phoneNumberDigits.length < 12 || phoneNumberDigits.length > 13) {
          newErrors.phoneNumber = "Telefonnummer muss zwischen 12 und 13 Ziffern enthalten";
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case "agreeToTerms":
        if (!value) newErrors.agreeToTerms = "Einverstanden mit den Bedingungen ist erforderlich";
        else delete newErrors.agreeToTerms;
        break;

      case "agreeToDataProcessing":
        if (!value) newErrors.agreeToDataProcessing = "Einverstanden mit der Datenverarbeitung ist erforderlich";
        else delete newErrors.agreeToDataProcessing;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!value.startsWith('+49')) e.target.value = '+49';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Datum ist erforderlich";
    if (!formData.time) newErrors.time = "Uhrzeit ist erforderlich";
    if (!formData.title) newErrors.title = "Title ist erforderlich";
    if (!formData.name) newErrors.name = "Name ist erforderlich";
    if (!formData.surname) newErrors.surname = "Nachname ist erforderlich";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Einverstanden mit den Bedingungen ist erforderlich";
    if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = "Einverstanden mit der Datenverarbeitung ist erforderlich";

    const phoneNumberDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneNumberDigits.length < 12 || phoneNumberDigits.length > 13) {
      newErrors.phoneNumber = "Telefonnummer muss zwischen 12 und 13 Ziffern enthalten";
    }

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
      Title: formData.title,
      Name: formData.name,
      Surname: formData.surname,
      PhoneNumber: formData.phoneNumber,
      CountPersons: formData.countPersons,
      Message: formData.message,
    };

    fetch("http://stx0nexy-001-site1.etempurl.com/api/v1/Bff/AddReserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response Status:", response.status);

        if (response.status === 200) {
          setFormData({
            date: "",
            time: "",
            title: "",
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
      formData.title &&
      formData.name &&
      formData.surname &&
      formData.phoneNumber &&
      formData.message &&
      formData.agreeToTerms &&
      formData.agreeToDataProcessing
    );
  };

  return (
    <div className="app__reservation" id="reserve">
      <div className="app__reservation-heading">
        <SubHeading title="Reservierung" />
        <h1 className="headtext__cormorant">Tisch reservieren</h1>
        <p className="p__opensans">
          Hinterlassen Sie Ihre Reservierungsinformationen und wir werden uns mit Ihnen in Verbindung setzen.
        </p>
        <p className="p__opensans">Sie können auch telefonisch reservieren: 0351 6492118</p>
      </div>
      <div className="app__reservation-form-container">
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
            <select name="title" value={formData.title} onChange={handleChange} required>
              <option value="" disabled>Wählen Sie 'Frau' oder 'Herr'</option>
              {titles.map((title) => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            {errors.title && <div className="error-message">{errors.title}</div>}
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
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              disabled={!isFormValid()}
            >
              Reservieren
            </LoadingButton>
          </div>

          {message && <div className="message-box">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Reserve;
