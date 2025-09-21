"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "@/redux/services/nonAuthApi";
import Language from "@/types/language";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ad 2 karakterden az olamaz")
    .max(50, "Ad 50 karakterden fazla olamaz")
    .required("Ad gerekli"),
  surname: Yup.string()
    .min(2, "Soyad 2 karakterden az olamaz")
    .max(50, "Soyad 50 karakterden fazla olamaz")
    .required("Soyad gerekli"),
  email: Yup.string().email("E-posta geçersiz").required("E-posta gerekli"),
  password: Yup.string()
    .min(8, "Şifre en az 8 karakterden oluşmalı")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.",
    )
    .required("Şifre gerekli"),
  keepSignedIn: Yup.boolean(),
});

const Signup = () => {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    keepSignedIn: false,
  };

  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  const handleSubmit = (values, { setSubmitting }) => {
    registerUser({ ...values, language: Language.TURKISH })
      .unwrap()
      .then((response) => {
        router.push("/");
        setSubmitting(false);
      })
      .catch((err) => {
        if (err.originalStatus === 409) {
          toast.error("This account already exists", {
            position: "bottom-right",
          });
        } else {
          toast.error("Something went wrong", {
            position: "bottom-right",
          });
        }
        setSubmitting(false);
      });
  };

  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <section className="pt-32.5 pb-12.5 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
        <div className="max-w-c-1016 relative z-1 mx-auto px-7.5 pt-10 pb-7.5 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute top-0 left-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            whileInView="visible"
            viewport={{ once: true }}
            className="shadow-solid-8 dark:border-strokedark rounded-lg bg-white px-7.5 pt-7.5 xl:px-15 xl:pt-15 dark:border dark:bg-black"
          >
            <h2 className="xl:text-sectiontitle2 mb-15 text-center text-3xl font-semibold text-black dark:text-white">
              Hesap Oluştur
            </h2>

            <div className="flex items-center gap-8">
              <button
                aria-label="signup with google"
                className="text-body-color dark:text-body-color-dark dark:shadow-two border-stroke hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary mb-6 flex w-full items-center justify-center rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none"
              >
                <span className="mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_95:967)">
                      <path
                        d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_95:967">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Signup with Google
              </button>
            </div>
            <div className="mb-10 flex items-center justify-center">
              <span className="dark:bg-stroke-dark bg-stroke dark:bg-strokedark hidden h-[1px] w-full max-w-[200px] sm:block"></span>
              <p className="text-body-color dark:text-body-color-dark w-full px-5 text-center text-base">
                Or, register with your email
              </p>
              <span className="dark:bg-stroke-dark bg-stroke dark:bg-strokedark hidden h-[1px] w-full max-w-[200px] sm:block"></span>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                    <div className="w-full lg:w-1/2">
                      <Field
                        name="name"
                        type="text"
                        placeholder="Ad"
                        className={`border-stroke focus:border-waterloo dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black focus-visible:outline-hidden dark:focus:placeholder:text-white ${
                          errors.name && touched.name
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div className="w-full lg:w-1/2">
                      <Field
                        name="surname"
                        type="text"
                        placeholder="Soyad"
                        className={`border-stroke focus:border-waterloo dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black focus-visible:outline-hidden dark:focus:placeholder:text-white ${
                          errors.surname && touched.surname
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="surname"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                    <div className="w-full lg:w-1/2">
                      <Field
                        name="email"
                        type="email"
                        placeholder="E-posta"
                        className={`border-stroke focus:border-waterloo dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black focus-visible:outline-hidden dark:focus:placeholder:text-white ${
                          errors.email && touched.email
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div className="w-full lg:w-1/2">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Şifre"
                        className={`border-stroke focus:border-waterloo dark:border-strokedark dark:focus:border-manatee w-full border-b bg-transparent pb-3.5 focus:placeholder:text-black focus-visible:outline-hidden dark:focus:placeholder:text-white ${
                          errors.password && touched.password
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-10 md:justify-between xl:gap-15">
                    <div className="mb-4 flex items-center">
                      <Field
                        id="keepSignedIn"
                        name="keepSignedIn"
                        type="checkbox"
                        className="peer sr-only"
                      />
                      <span className="group peer-checked:bg-primary mt-1 flex h-5 min-w-[20px] items-center justify-center rounded-sm border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700">
                        <svg
                          className="opacity-0 peer-checked:opacity-100"
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <label
                        htmlFor="keepSignedIn"
                        className="flex max-w-[425px] cursor-pointer pl-3 select-none"
                      >
                        Keep me signed in
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="signup with email and password"
                      className="hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="border-stroke dark:border-strokedark mt-12.5 border-t py-5 text-center">
                    <p>
                      Already have an account?{" "}
                      <Link
                        className="hover:text-primary dark:hover:text-primary text-black dark:text-white"
                        href="/giris/hesap-giris"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  );
};

export default Signup;
