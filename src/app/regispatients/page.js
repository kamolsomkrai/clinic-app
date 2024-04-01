"use client"
import { useState } from 'react';
import InputField from '../../components/inputfield';
import NestedInputFields from '../../components/nestedinputfields'; // Import the new component

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    CID: "",
    PassSportID: "",
    TitleName: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Birthdate: "",
    Gender: "",
    SensitiveInformation: {
      Nationality: "",
      Ethnicity: "",
      Religion: "",
      Gender: "",
      MilitaryStatus: "",
      MaritalStatus: ""
    },
    ContactInformation: {
      Telephone: [{ Number: "", recordDate: "" }],
      Email: "",
      Address: [{
        addr: "",
        moo: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
        country: "",
        locateStatus: ""
      }],
      EmergencyContact: [{
        Title: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Relationship: "",
        Telephone: "",
        Email: ""
      }]
    }
  });

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeNested = (e, parentKey, key) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        [key]: { ...prevState[parentKey][key], [name]: value }
      }
    }));
  };

  const generateInputFields = () => {
    return Object.entries(formData).map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <h3 className="font-bold text-lg mb-2">{key}</h3>
            {/* Integrate NestedInputFields component */}
            <NestedInputFields
              parentKey={key}
              nestedObject={value}
              handleChangeNested={handleChangeNested}
            />
          </div>
        );
      } else {
        return (
          <InputField
            key={key}
            label={key}
            type="text" // Simplification; adjust based on actual data type
            name={key}
            value={value}
            onChange={handleChange}
          />
        );
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-8">Registration</h1>
      <form onSubmit={handleRegistration}>
        {generateInputFields()}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
