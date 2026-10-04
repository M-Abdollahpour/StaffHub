import { useState } from "react";
import ProfileView from "~/components/profile/profileView";
import ProfileEdit from "~/components/profile/profileEdit";
const Profile = () => {
  const [isEditing, setIsediting] = useState(false);
  return (
    <div>
      {isEditing ? (
        <ProfileEdit
          onSave={() => setIsediting(false)}
          onCancel={() => setIsediting(false)}
        />
      ) : (
        <ProfileView onEdit={() => setIsediting(true)} />
      )}
    </div>
  );
};
export default Profile;
