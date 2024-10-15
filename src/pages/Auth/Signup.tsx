import { AuthImageContainer, Button, Input } from "components/ui";
import { EMAIL_REGEX } from "data/Auth/authData";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../components/ui/Checkbox";
import axios from "axios";

interface IProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  overTwenty: boolean;
  agreeOfTerm: boolean;
  agreeOfPersonalInfo: boolean;
  agreeOfMarketing: boolean;
  etc: boolean;
}

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      overTwenty: false,
      agreeOfTerm: false,
      agreeOfPersonalInfo: false,
      agreeOfMarketing: false,
      etc: false,
    },
  });

  const submit = async (data: IProps) => {
    console.log(data);

    try {
      // const userInput = {
      //     username: data.username,
      //     email: data.email,
      //     password: data.password,
      // }
      const url = "http://localhost:8000/api/auth/signup";
      const { status } = await axios.post(url, data);
      if (status === 201) {
        alert("signup ss");
        navigate("/login");
      }
    } catch (e) {
      console.log("errorrrr", e);
    }
  };

  const agreements = [
    { id: 1, label: "14세 이상입니다 (필수)", key: "overTwenty" },
    { id: 2, label: "이용약관(필수)", key: "agreeOfTerm" },
    {
      id: 3,
      label: "개인정보수집 및 이용동의 (필수)",
      key: "agreeOfPersonalInfo",
    },
    {
      id: 4,
      label: "개인정보 마케팅 활용 동의 (선택)",
      key: "agreeOfMarketing",
    },
    { id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신 (선택)", key: "etc" },
  ];

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Welcome!</h2>
          <p className="text-slate-500">for your first visit! </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <form
            className="flex w-full max-w-sm flex-col"
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <Input
              {...register("username", {
                required: "Please provide an Username",
              })}
              error={errors.username?.message}
              ariaInvalid={isDirty}
              labelText="Username"
              type="text"
              className={"mb-3"}
              autocomplete="on"
              autofocus
            />

            <Input
              {...register("email", {
                required: "Please provide an email",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please provide a properly formatted email address",
                },
              })}
              error={errors.email?.message}
              ariaInvalid={isDirty}
              labelText="Email"
              type="email"
              className="mb-3"
              autocomplete="on"
            />

            <Input
              {...register("password", {
                required: "Please provide a password",
                minLength: {
                  value: 6,
                  message: "Password needs to be between 6 to 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password needs to be between 6 to 20 characters",
                },
              })}
              error={errors.password?.message}
              ariaInvalid={isDirty}
              labelText="Password"
              type="password"
              className="mb-3"
              autocomplete="off"
            />

            <Input
              {...register("confirmPassword", {
                required: "Please provide a confirm password",
              })}
              error={errors.confirmPassword?.message}
              ariaInvalid={isDirty}
              labelText={"Confirm password"}
              type={"password"}
              className={"mb-10"}
              autocomplete="off"
            />

            <div
              className={
                "border peer rounded-lg py-2 px-4 border-gray-300 mb-4"
              }
            >
              {/* {agreements.map((item) => (
                <div
                  className="flex items-center space-x-2 text-gray-500"
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    id={item.key}
                    {...register(item.key as keyof IProps)}
                    className="hidden peer"
                  />
                  <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-lg peer-checked:bg-violet-500 peer-checked:border-violet-300" />
                  <label htmlFor={item.key}>{item.label}</label>
                </div>
              ))} */}

              {agreements.map((item) => (
                <Checkbox
                  type="checkbox"
                  {...register(item.key as keyof IProps, {
                    required: "Please provide a password",
                  })}
                  labelText={item.label}
                  id={item.key}
                />
              ))}
            </div>

            <Button
              text={"Signup"}
              disabled={isSubmitting}
              className="rounded-lg bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
            />
          </form>

          <div className={"mt-10 text-slate-500"}>
            Already have an account?
            <Link to={"/login"} className={"p-2 font-semibold text-violet-500"}>
              Log in
            </Link>
          </div>
        </div>
      </div>
      <AuthImageContainer
        image={"/images/register.webp"}
        firstText="shop smarter"
        secondText="Signup here"
      />
    </section>
  );
};

export default Signup;
