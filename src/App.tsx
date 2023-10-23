import { SubmitHandler, useForm } from "react-hook-form";
import "./App.css";

interface FormInput {
  Username: string;
  Password: number;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="Username">Username</label>
          <input {...register("Username", { required: true })} />
          {errors.Username && <p role="alert">Required Field</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("Password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
            type="text"
          />
          {errors.Password && (
            <p role="alert">
              Required, Minimum eight characters, at least one letter and one
              number:
            </p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
