import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Input } from "@/components/ui/input";
import { useGetCurrentUserQuery } from "@/redux/services/userApi";
import LoaderSpinner from "@/components/LoaderSpinner";

const Profile = () => {
  const { data, isLoading } = useGetCurrentUserQuery();

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Ad en az 2 karakter olmalıdır")
      .max(50, "Ad en fazla 50 karakter olabilir")
      .required("Ad zorunludur"),
    lastName: Yup.string()
      .min(2, "Soyad en az 2 karakter olmalıdır")
      .max(50, "Soyad en fazla 50 karakter olabilir")
      .required("Soyad zorunludur"),
    phone: Yup.string()
      .min(10, "Telefon numarası en az 10 karakter olmalıdır")
      .required("Telefon numarası zorunludur"),
    email: Yup.string()
      .email("Geçerli bir e-mail adresi giriniz")
      .required("E-mail adresi zorunludur"),
    city: Yup.string()
      .min(2, "Şehir en az 2 karakter olmalıdır")
      .required("Şehir zorunludur"),
    country: Yup.string()
      .min(2, "Ülke en az 2 karakter olmalıdır")
      .required("Ülke zorunludur"),
    address1: Yup.string()
      .min(5, "Adres bilgisi en az 5 karakter olmalıdır")
      .required("Adres bilgisi 1 zorunludur"),
    address2: Yup.string(),
  });

  // Initial values from API data
  const initialValues = {
    firstName: data?.name || "",
    lastName: data?.surname || "",
    phone: data?.phoneNumber || "",
    email: data?.email || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Handle form submission here
      console.log("Form submitted with values:", values);
      // You can add your API call here to update user profile
      // await updateUserProfile(values);

      // Show success message
      alert("Profil başarıyla güncellendi!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profil güncellenirken bir hata oluştu!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = () => {
    // Handle password change logic
    console.log("Change password clicked");
    // You can navigate to password change modal or page
  };

  if (isLoading) {
    return (
      <div className="dark:border-strokedark dark:bg-blacksection z-40 col-span-3 flex rounded-lg border border-white bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex w-full items-center justify-center">
          <LoaderSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="dark:border-strokedark dark:bg-blacksection z-40 col-span-3 flex h-full rounded-lg border border-white bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_-4px_12px_rgba(0,0,0,0.06)] lg:h-[580px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // This allows the form to reinitialize when data changes
      >
        {({
          errors,
          touched,
          isSubmitting,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form className="flex w-full flex-col">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Ad*</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ad"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                  {touched.firstName && (errors.firstName as string)}
                </p>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Soyad*</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Soyad"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.lastName && touched.lastName ? "border-red-500" : ""
                  }`}
                />
                <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                  {touched.lastName && (errors.lastName as string)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">
                  Telefon Numarası*
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon Numarası"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.phone && touched.phone ? "border-red-500" : ""
                  }`}
                />

                <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                  {touched.phone && (errors.phone as string)}
                </p>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">
                  E-mail Adresi*
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail adresi"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                  {touched.email && (errors.email as string)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <SecondaryButton onClick={handleChangePassword}>
                Şifremi Değiştir
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
              </PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
