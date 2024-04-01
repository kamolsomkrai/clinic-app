import InputField from '../components/inputfield';

const NestedInputFields = ({ parentKey, nestedObject, handleChangeNested }) => {
  const generateInputFieldsForNestedObject = (parentKey, nestedObject) => {
    return Object.entries(nestedObject).map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div key={`${parentKey}-${key}`} className="mb-4">
            <h4 className="font-bold text-base mb-2">{key}</h4>
            {generateInputFieldsForNestedObject(key, value)}
          </div>
        );
      } else {
        return (
          <InputField
            key={`${parentKey}-${key}`}
            label={`${key}`}
            type="text"
            name={key}
            value={value}
            onChange={(e) => handleChangeNested(e, parentKey, key)}
          />
        );
      }
    });
  };

  return (
    <div>
      {generateInputFieldsForNestedObject(parentKey, nestedObject)}
    </div>
  );
};

export default NestedInputFields;
