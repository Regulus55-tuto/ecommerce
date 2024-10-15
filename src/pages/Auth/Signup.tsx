import {AuthImageContainer, Button, Input} from "components/ui";
import {EMAIL_REGEX} from "data/Auth/authData";
import React from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
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
        formState: {isSubmitting, isDirty, errors},
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

        try{
            // const userInput = {
            //     username: data.username,
            //     email: data.email,
            //     password: data.password,
            // }
            const url = 'http://localhost:8000/api/auth/signup'
            const { status} = await axios.post(url, data)
            if(status === 201){
                alert('signup ss')
                navigate('/login')
            }
        }catch(e){
            console.log('errorrrr',e)
        }
    };

    const agreements = [
        {id: 1, label: "14세 이상입니다(필수)", key: "overTwenty"},
        {id: 2, label: "이용약관(필수)", key: "agreeOfTerm"},
        {id: 3, label: "개인정보수집 및 이용동의(필수)", key: "agreeOfPersonalInfo"},
        {id: 4, label: "개인정보 마케팅 활용 동의(선택)", key: "agreeOfMarketing"},
        {id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신(선택)", key: "etc"}
    ];

    return (
        <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
            <div
                className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
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

                        <div className={'border border-gray-500 mb-4'}>


                            <Checkbox type={'checkbox'} {...register('overTwenty')} labelText={"14세 이상입니다(필수)"}/>
                            <Checkbox type={'checkbox'} {...register('agreeOfTerm')} labelText={"이용약관(필수)"}/>
                            <Checkbox type={'checkbox'} {...register('agreeOfPersonalInfo')}
                                      labelText={"개인정보수집동의(필수)"}/>
                            <Checkbox type={'checkbox'} {...register('agreeOfMarketing')}
                                      labelText={"개인정보마케팅 활용동의(선택)"}/>
                            <Checkbox type={'checkbox'} {...register('etc')} labelText={"이벤트 및 SMS 등 수신(선택)"}/>


                            {/*<Input type={'checkbox'} {...register('.agreeOfTerm')} labelText="Agree of Term" />*/}

                            {/*  {...register("consent.agreeOfTerm", {*/}
                            {/*    required: "Please check Consent Terms",*/}
                            {/*  })}*/}
                            {/*  error={errors.consent?.message}*/}
                            {/*  ariaInvalid={isDirty}*/}
                            {/*  labelText={"Agree Of Term"}*/}
                            {/*  type={"checkbox"}*/}
                            {/*  className={"mb-10"}*/}
                            {/*  autocomplete="off"*/}
                            {/*/>*/}
                            {/*<Input*/}
                            {/*    {...register("consent.agreeOfPersonalInfo", {*/}
                            {/*      required: "Please check Consent Terms",*/}
                            {/*    })}*/}
                            {/*    error={errors.consent?.message}*/}
                            {/*    ariaInvalid={isDirty}*/}
                            {/*    labelText={"Agree Of Personal Info"}*/}
                            {/*    type={"checkbox"}*/}

                            {/*    autocomplete="off"*/}
                            {/*/>*/}
                            {/*  <Input*/}
                            {/*      {...register("consent.agreeOfPersonalInfo", {*/}
                            {/*        required: "Please check Consent Terms",*/}
                            {/*      })}*/}
                            {/*      error={errors.consent?.message}*/}
                            {/*      ariaInvalid={isDirty}*/}
                            {/*      labelText={"Agree Of Personal Info"}*/}
                            {/*      type={"checkbox"}*/}
                            {/*      className={"mb-10"}*/}
                            {/*      autocomplete="off"*/}
                            {/*  />*/}
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
