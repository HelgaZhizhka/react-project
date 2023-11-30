import { CountryAutocomplete } from '@/components/CountryAutocomplete';

const UnControlForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CountryAutocomplete />
      <label>
        name:
        <input type="text" />
      </label>
      <label>
        age:
        <input type="number" />
      </label>
      <label>
        Email:
        <input type="email" />
      </label>
      <label>
        password:
        <input type="password" />
      </label>
      <label>
        password:
        <input type="password" />
      </label>
      <label>
        Gender:
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        <input type="checkbox" />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default UnControlForm;
