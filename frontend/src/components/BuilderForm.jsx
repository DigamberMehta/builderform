import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API requests

// Define the styles directly as JavaScript objects
const styles = {
  body: {
    fontFamily: "sans-serif",
    margin: "0 auto",
    maxWidth: "700px",
    padding: "20px",
    background: "#f4f4f4",
  },
  h1: {
    textAlign: "center",
  },
  label: {
    display: "block",
    marginTop: "15px",
  },
  // --- MODIFIED STYLE FOR INPUTS ---
  inputSelectButtonTextarea: {
    // Common styles for these elements
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid black", // Added black border
    cursor: "pointer", // Added cursor pointer for buttons
  },
  // --- END MODIFIED STYLE ---
  flagSelect: {
    textAlign: "right",
    marginBottom: "20px",
  },
  flagSelectImg: {
    width: "30px",
    cursor: "pointer",
    marginLeft: "10px",
    verticalAlign: "middle",
  },
  skillRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  skillRowLabel: {
    flex: 1,
  },
  skillRowSelect: {
    width: "60px",
    border: "1px solid black", // Added black border for selects in skillRow
  },
  dateRange: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  dateRangeInput: {
    width: "100%",
    border: "1px solid black", // Added black border for date inputs
  },
  formContainerFlex: {
    display: "flex",
    gap: "20px",
  },
  formStyle: {
    flex: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: "20px",
  },
  confirmation: {
    display: "none",
    paddingTop: "20px",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: "0.85em",
    marginTop: "2px",
    display: "block",
  },
  // New style for disabled button
  disabledButton: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
};

const texts = {
  en: {
    formTitle: "Builder work in London",
    emailLabel: "Email:",
    nameLabel: "Full Name:",
    ageLabel: "Age:",
    experienceLabel: "Years of Experience:",
    addressLabel: "Address in Poland:",
    phoneLabel: "Phone number:",
    whatsappLabel: "WhatsApp number:",
    englishLabel: "English Language Level:",
    alcoholLabel: "Alcohol Consumption:",
    availabilityLabel: "Able to work in London (from → to):",
    skillsLabel: "Skill Levels (0 = none, 9 = expert):",
    salaryLabel: "Salary expectation (PLN zlotii paid daily in cash):",
    commentsLabel: "Any other relevant information you want to add:",
    submitButton: "Submit Information",
    submittingButton: "Submitting...", // New text for submitting state
    submittedButton: "Submitted!", // New text for submitted state
    bricklaying: "Bricklaying",
    plastering: "Plastering",
    plumbing: "Plumbing",
    electrician: "Electrician",
    roofing: "Roofing",
    painting: "Painting",
    tiling: "Tiling",
    flooring: "Flooring",
    carpentry: "Carpentry",
    build_kitchen: "Build kitchen",
    build_extension: "Build extension to house",
    lay_foundations: "Lay foundations and build cellar",
    labour: "General Labour",
    english_none: "None",
    english_can_understand_a_bit: "Can understand a bit",
    english_can_understand_most: "Can understand most",
    english_can_understand_most_and_speak: "Can understand most and speak",
    english_fluent: "Fluent",
    alcohol_none: "None",
    alcohol_yes_but_not_during_work: "Yes, but not during work",
    alcohol_yes_and_also_during_work: "Yes, and also during work",
    alcohol_i_have_a_drinking_problem_and_it_could_affect_my_work:
      "I have a drinking problem, and it could affect my work",
    infoP1:
      "We have several large projects, and will provide transport to London (and return) either by coach or by Ryanair/Wizz Air if the same price.",
    infoP2:
      "Accommodation, food etc is your responsibility, but you can sleep on-site for free (typically a house that is being renovated; we can get you a mattress).",
    confirmation: "Thank you. Your information has been submitted.",
    valueMissing: "This field is required.",
    typeMismatchEmail: "Please enter a valid email address.",
    typeMismatchTel: "Please enter a valid telephone number.",
    rangeUnderflow: "Please select a value that is no less than {min}.",
    rangeOverflow: "Please select a value that is no more than {max}.",
    dateRangeError: "End date cannot be before start date.", // New error message
  },
  pl: {
    formTitle: "Praca budowlana w Londynie",
    emailLabel: "Adres e-mail:",
    nameLabel: "Imię i nazwisko:",
    ageLabel: "Wiek:",
    experienceLabel: "Lata doświadczenia:",
    addressLabel: "Adres w Polsce:",
    phoneLabel: "Telefon:",
    whatsappLabel: "Numer WhatsApp:",
    englishLabel: "Poziom znajomości języka angielskiego:",
    alcoholLabel: "Konsumpcja alkoholu:",
    availabilityLabel: "Dostępność w Londynie (od → do):",
    skillsLabel: "Poziom umiejętności (0 = brak, 9 = ekspert):",
    salaryLabel: "Oczekiwana dzienna płaca w PLN (gotówka do ręki):",
    commentsLabel: "Dodatkowe informacje lub uwagi, które powinniśmy znać:",
    submitButton: "Wyślij informacje",
    submittingButton: "Wysyłanie...", // New text for submitting state
    submittedButton: "Wysłano!", // New text for submitted state
    bricklaying: "Murowanie",
    plastering: "Tynkowanie",
    plumbing: "Hydraulika",
    electrician: "Elektryka",
    roofing: "Dekarstwo",
    painting: "Malowanie",
    tiling: "Kafelkowanie",
    flooring: "Podłogi",
    carpentry: "Stolarka",
    build_kitchen: "Budowa kuchni",
    build_extension: "Budowa dobudówki do domu",
    lay_foundations: "Wykonanie fundamentów i budowa piwnicy",
    labour: "Prace ogólne",
    english_none: "Brak",
    english_can_understand_a_bit: "Trochę rozumiem",
    english_can_understand_most: "Rozumiem większość",
    english_can_understand_most_and_speak: "Rozumiem większość i mówię",
    english_fluent: "Biegle",
    alcohol_none: "Brak",
    alcohol_yes_but_not_during_work: "Tak, ale nie podczas pracy",
    alcohol_yes_and_also_during_work: "Tak, również podczas pracy",
    alcohol_i_have_a_drinking_problem_and_it_could_affect_my_work:
      "Mam problem z alkoholem i może to wpłynąć na moją pracę",
    infoP1:
      "Mamy kilka dużych projektów i zapewnimy transport do Londynu (i z powrotem) autokarem lub Ryanair/Wizz Air, jeśli cena będzie taka sama.",
    infoP2:
      "Zakwaterowanie, wyżywienie itp. są na twojej odpowiedzialności, ale możesz spać na miejscu za darmo (zazwyczaj w domu będącym w remoncie; możemy zapewnić materac).",
    confirmation: "Dziękujemy. Twoje informacje zostały przesłane.",
    valueMissing: "Proszę wypełnić to pole.",
    typeMismatchEmail: "Proszę wpisać prawidłowy adres e-mail.",
    typeMismatchTel: "Proszę wpisać prawidłowy numer telefonu.",
    rangeUnderflow: "Wybierz wartość nie mniejszą niż {min}.",
    rangeOverflow: "Wybierz wartość nie większą niż {max}.",
    dateRangeError: "Data końca nie może być wcześniejsza niż data rozpoczęcia.", // New error message
  },
};

const skillKeys = [
  "bricklaying",
  "plastering",
  "plumbing",
  "electrician",
  "roofing",
  "painting",
  "tiling",
  "flooring",
  "carpentry",
  "build_kitchen",
  "build_extension",
  "lay_foundations",
  "labour",
];

const BuilderForm = () => {
  const [lang, setLang] = useState("pl");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    experience_years: "",
    address: "",
    phone: "",
    whatsapp: "",
    english_level: "none",
    alcohol: "none",
    london_available_from: "",
    london_available_to: "",
    skills: skillKeys.reduce((acc, skill) => ({ ...acc, [skill]: 0 }), {}),
    salary: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading effect
  const [submitButtonText, setSubmitButtonText] = useState(""); // New state for button text

  useEffect(() => {
    // Initial language setting
    setLang("pl");
    // Set initial button text based on default language
    setSubmitButtonText(texts["pl"].submitButton);
  }, []);

  useEffect(() => {
    // Update button text when language changes
    setSubmitButtonText(texts[lang].submitButton);
  }, [lang]);

  const switchLang = (newLang) => {
    setLang(newLang);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("skill_")) {
      const skillIndex = parseInt(name.split("_")[1]);
      const skillName = skillKeys[skillIndex];
      setFormData((prevData) => ({
        ...prevData,
        skills: {
          ...prevData.skills,
          [skillName]: parseInt(value),
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // Clear the error for the current input as the user types
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    const currentTexts = texts[lang];

    // Basic required field validation
    if (!formData.email) errors.email = currentTexts.valueMissing;
    if (!formData.name) errors.name = currentTexts.valueMissing;
    if (!formData.age) errors.age = currentTexts.valueMissing;
    if (!formData.experience_years)
      errors.experience_years = currentTexts.valueMissing;
    if (!formData.address) errors.address = currentTexts.valueMissing;
    if (!formData.phone) errors.phone = currentTexts.valueMissing;
    if (!formData.london_available_from)
      errors.london_available_from = currentTexts.valueMissing;
    if (!formData.london_available_to)
      errors.london_available_to = currentTexts.valueMissing;
    if (!formData.salary) errors.salary = currentTexts.valueMissing;
    if (!formData.comments) errors.comments = currentTexts.valueMissing;

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = currentTexts.typeMismatchEmail;
    }

    // Phone number validation (basic type check, more robust regex might be needed)
    if (formData.phone && !/^\+?[0-9\s-()]{7,25}$/.test(formData.phone)) {
      errors.phone = currentTexts.typeMismatchTel;
    }

    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age)) errors.age = currentTexts.valueMissing;
    else if (age < 18)
      errors.age = currentTexts.rangeUnderflow.replace("{min}", "18");
    else if (age > 70)
      errors.age = currentTexts.rangeOverflow.replace("{max}", "70");

    // Experience years validation
    const experience_years = parseInt(formData.experience_years);
    if (isNaN(experience_years))
      errors.experience_years = currentTexts.valueMissing;
    else if (experience_years < 0)
      errors.experience_years = currentTexts.rangeUnderflow.replace(
        "{min}",
        "0"
      );
    else if (experience_years > 50)
      errors.experience_years = currentTexts.rangeOverflow.replace(
        "{max}",
        "50"
      );

    // Salary validation
    const salary = parseInt(formData.salary);
    if (isNaN(salary)) errors.salary = currentTexts.valueMissing;
    else if (salary < 0)
      errors.salary = currentTexts.rangeUnderflow.replace("{min}", "0");

    // Date range validation
    const fromDate = new Date(formData.london_available_from);
    const toDate = new Date(formData.london_available_to);
    if (
      formData.london_available_from &&
      formData.london_available_to &&
      fromDate > toDate
    ) {
      errors.london_available_to = currentTexts.dateRangeError;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector(
        Object.keys(formErrors)
          .map((name) => `[name="${name}"]`)
          .join(", ")
      );
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true); // Set loading state to true
    setSubmitButtonText(texts[lang].submittingButton); // Change button text to "Submitting..."

    try {
      const response = await axios.post(
        "https://builderform-dj1u.onrender.com/api/submit-builder-form",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setSubmitted(true);
      setSubmitButtonText(texts[lang].submittedButton); // Change button text to "Submitted!"

      setTimeout(() => {
        setSubmitButtonText(texts[lang].submitButton); // Revert button text after 3 seconds
        setIsSubmitting(false); // Reset loading state
        // Optionally reset form here if needed, but not in original request
        // setFormData({ /* initial state */ });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessage =
        "There was an error submitting your form. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
      setIsSubmitting(false); // Reset loading state on error
      setSubmitButtonText(texts[lang].submitButton); // Revert button text on error
    }
  };

  return (
    <div className="main-container">
      <div style={styles.body}>
        <div style={styles.flagSelect}>
          <img
            alt="English"
            onClick={() => switchLang("en")}
            src="https://flagcdn.com/gb.svg"
            title="English"
            style={styles.flagSelectImg}
          />
          <img
            alt="Polski"
            onClick={() => switchLang("pl")}
            src="https://flagcdn.com/pl.svg"
            title="Polski"
            style={styles.flagSelectImg}
          />
        </div>
        <h1 style={styles.h1}>{texts[lang].formTitle}</h1>
        <div style={styles.formContainerFlex}>
          {/* THE ONLY CHANGE IS HERE: Added noValidate to the form */}
          <form onSubmit={handleSubmit} style={styles.formStyle} noValidate>
            <label htmlFor="email" style={styles.label}>
              {texts[lang].emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.email && (
              <span style={styles.errorText}>{formErrors.email}</span>
            )}
            <label htmlFor="name" style={styles.label}>
              {texts[lang].nameLabel}
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.name && (
              <span style={styles.errorText}>{formErrors.name}</span>
            )}
            <label htmlFor="age" style={styles.label}>
              {texts[lang].ageLabel}
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="18"
              max="70"
              value={formData.age}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.age && (
              <span style={styles.errorText}>{formErrors.age}</span>
            )}
            <label htmlFor="experience_years" style={styles.label}>
              {texts[lang].experienceLabel}
            </label>
            <input
              id="experience_years"
              name="experience_years"
              type="number"
              min="0"
              max="50"
              value={formData.experience_years}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.experience_years && (
              <span style={styles.errorText}>
                {formErrors.experience_years}
              </span>
            )}
            <label htmlFor="address" style={styles.label}>
              {texts[lang].addressLabel}
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.address && (
              <span style={styles.errorText}>{formErrors.address}</span>
            )}
            <label htmlFor="phone" style={styles.label}>
              {texts[lang].phoneLabel}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.phone && (
              <span style={styles.errorText}>{formErrors.phone}</span>
            )}
            <label htmlFor="whatsapp" style={styles.label}>
              {texts[lang].whatsappLabel}
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange}
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.whatsapp && (
              <span style={styles.errorText}>{formErrors.whatsapp}</span>
            )}{" "}
            <label htmlFor="english_level" style={styles.label}>
              {texts[lang].englishLabel}
            </label>
            <select
              id="english_level"
              name="english_level"
              value={formData.english_level}
              onChange={handleChange}
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            >
              <option value="none">{texts[lang].english_none}</option>
              <option value="can_understand_a_bit">
                {texts[lang].english_can_understand_a_bit}
              </option>
              <option value="can_understand_most">
                {texts[lang].english_can_understand_most}
              </option>
              <option value="can_understand_most_and_speak">
                {texts[lang].english_can_understand_most_and_speak}
              </option>
              <option value="fluent">{texts[lang].english_fluent}</option>
            </select>
            <label htmlFor="alcohol" style={styles.label}>
              {texts[lang].alcoholLabel}
            </label>
            <select
              id="alcohol"
              name="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            >
              <option value="none">{texts[lang].alcohol_none}</option>
              <option value="yes_but_not_during_work">
                {texts[lang].alcohol_yes_but_not_during_work}
              </option>
              <option value="yes_and_also_during_work">
                {texts[lang].alcohol_yes_and_also_during_work}
              </option>
              <option value="i_have_a_drinking_problem_and_it_could_affect_my_work">
                {
                  texts[lang]
                    .alcohol_i_have_a_drinking_problem_and_it_could_affect_my_work
                }
              </option>
            </select>
            <label id="availabilityLabel" style={styles.label}>
              {texts[lang].availabilityLabel}
            </label>
            <div style={styles.dateRange}>
              <input
                id="london_available_from"
                name="london_available_from"
                type="date"
                value={formData.london_available_from}
                onChange={handleChange}
                required
                style={styles.dateRangeInput}
                disabled={isSubmitting} // Disable during submission
              />
              {formErrors.london_available_from && (
                <span style={styles.errorText}>
                  {formErrors.london_available_from}
                </span>
              )}
              <input
                id="london_available_to"
                name="london_available_to"
                type="date"
                value={formData.london_available_to}
                onChange={handleChange}
                required
                style={styles.dateRangeInput}
                disabled={isSubmitting} // Disable during submission
              />
              {formErrors.london_available_to && (
                <span style={styles.errorText}>
                  {formErrors.london_available_to}
                </span>
              )}
            </div>
            <label id="skillsLabel" style={styles.label}>
              {texts[lang].skillsLabel}
            </label>
            <div>
              {skillKeys.map((skill, index) => (
                <div key={skill} style={styles.skillRow}>
                  <label
                    htmlFor={`skill_${index}`}
                    style={styles.skillRowLabel}
                  >
                    {texts[lang][skill]}
                  </label>
                  <select
                    id={`skill_${index}`}
                    name={`skill_${index}`}
                    value={formData.skills[skill]}
                    onChange={handleChange}
                    style={styles.skillRowSelect}
                    disabled={isSubmitting} // Disable during submission
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <label htmlFor="salary" style={styles.label}>
              {texts[lang].salaryLabel}
            </label>
            <input
              id="salary"
              name="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            />
            {formErrors.salary && (
              <span style={styles.errorText}>{formErrors.salary}</span>
            )}
            <label htmlFor="comments" style={styles.label}>
              {texts[lang].commentsLabel}
            </label>
            <textarea
              id="comments"
              name="comments"
              rows="4"
              value={formData.comments}
              onChange={handleChange}
              required
              style={styles.inputSelectButtonTextarea}
              disabled={isSubmitting} // Disable during submission
            ></textarea>
            {formErrors.comments && (
              <span style={styles.errorText}>{formErrors.comments}</span>
            )}
            <button
              type="submit"
              style={{
                ...styles.inputSelectButtonTextarea,
                ...(isSubmitting ? styles.disabledButton : {}), // Apply disabled style when submitting
              }}
              disabled={isSubmitting} // Disable the button while submitting
            >
              {submitButtonText}
            </button>
          </form>
          <div id="infoText" style={styles.infoText}>
            <p id="infoP1">{texts[lang].infoP1}</p>
            <p id="infoP2">{texts[lang].infoP2}</p>
          </div>
        </div>

        {submitted && (
          <div
            id="confirmation"
            style={{ ...styles.confirmation, display: "block" }}
          >
            {" "}
            {texts[lang].confirmation}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderForm;