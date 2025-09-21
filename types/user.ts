import Language from "./language";

interface User {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  language: Language;
}

export default User;
