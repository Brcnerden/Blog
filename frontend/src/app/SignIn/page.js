"use client";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export const SignIn = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1200px] text-primaryColor w-full mx-auto flex roboto-regular mt-10 px-4">
      <div className="border-y border-l p-10 border-gray-500 flex-1 h-[700px] max-lg:border-r max-sm:h-auto ">
        <div className="font-bold text-[36px] my-10">Logo</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Geçersiz email adresi")
              .required("Lütfen email giriniz"),
            password: Yup.string().required("Lütfen şifre giriniz"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            axios
              .post("http://localhost:3008/api/signin", values)
              .then((response) => {
                console.log("Success:", response.data);
                router.push("./");

                resetForm();
                setSubmitting(false);
              })
              .catch((error) => {
                console.error("Error:", error);
                setSubmitting(false);
              });
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col w-full">
                <label className="mt-4">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Lütfen email giriniz"
                  className="text-[12px] w-full border mt-4 pl-2 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mt-4">Şifre</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Lütfen şifre giriniz"
                  className="text-[12px] w-full border mt-4 pl-2 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full mt-10">
                <button
                  type="submit"
                  className="bg-primaryColor text-white w-1/2 py-2 mr-2"
                  disabled={isSubmitting}
                >
                  Giriş Yap
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-primaryColor ml-2"
                >
                  Üye Ol
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Image
        src="/Images/leaf.jpg"
        width={500}
        height={500}
        alt="image"
        className="w-[600px] h-[700px] max-lg:hidden"
      />
    </div>
  );
};

export default SignIn;
