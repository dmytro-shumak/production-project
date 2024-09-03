export type { Profile, ProfileSchema } from "./model/types/profile";

export { profileReducer, profileActions } from "./model/slice/profileSlice";

export { fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData";

export { ProfileCard } from "./ui/ProfileCard/ProfileCard";

export { getProfileData } from "./model/selectors/getProfileData/getProfileData";
export { getProfileError } from "./model/selectors/getProfileError/getProfileError";
export { getProfileLoading } from "./model/selectors/getProfileLoading/getProfileLoading";
