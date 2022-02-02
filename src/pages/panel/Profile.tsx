import { useEffect, useState } from "react";
import ProfileForm from "../../components/forms/ProfileForm";
import { useAuth } from "../../store/auth";
import API from "../../utils/axios";
import { handleNotificationException } from "../../utils/notifications";

export interface IProfileData {
  date_of_birth: string;
  height: number;
  sex: "M" | "F" | "O";
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState<number>(0);
  const [sex, setSex] = useState<"M" | "F" | "O">("M");
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user.completed) return setLoading(false);
      try {
        const res = await API.get<any>('/user/profile');
        const {date_of_birth, height, sex} = res.data.response.profile as IProfileData;
        setDateOfBirth(new Date(date_of_birth).toISOString().split("T")[0]);
        setHeight(height);
        setSex(sex);
      } catch (exc) {
        handleNotificationException(exc);
      }
      setLoading(false);
    })()
  }, [user.completed])

  if (loading) return <div>Loading...</div>

  return <div>
    <ProfileForm dateOfBirth={dateOfBirth} height={height} sex={sex} setDateOfBirth={setDateOfBirth} setSex={setSex} setHeight={setHeight} />
  </div>;
};

export default Profile;
