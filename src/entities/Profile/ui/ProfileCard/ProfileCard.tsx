import { useCallback, type ChangeEvent, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib";
import { classNames } from "shared/lib";
import { Avatar, HStack, VStack } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";
import { profileActions } from "../../model/slice/profileSlice";
import type { Profile } from "../../model/types/profile";
import styles from "./ProfileCard.module.css";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCard: FC<Props> = ({
  className,
  data,
  error,
  isLoading,
  readOnly,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();

  const handleChangeFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ firstName: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ lastName: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeAge = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ age: +e.target.value }));
    },
    [dispatch],
  );

  const handleChangeCity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ city: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ username: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ avatar: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const handleChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  if (isLoading) {
    return (
      <div className={classNames(styles.profileCard, {}, [className])}>
        <Loader className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.profileCard, {}, [className])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t("ErrorOccurred")}
          text={t("TryToRefreshPage")}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles.profileCard,
        { [styles.editing]: !readOnly },
        [className],
      )}
    >
      <VStack gap={10} align="stretch">
        {data?.avatar && (
          <HStack align="center">
            <Avatar src={data?.avatar} alt="avatar" size={100} />
          </HStack>
        )}
        <Input
          value={data?.firstName}
          placeholder={t("YourFirstName")}
          label={t("YourFirstName")}
          onChange={handleChangeFirstName}
          readOnly={readOnly}
          data-testid="ProfileCard.firstName"
        />
        <Input
          value={data?.lastName}
          placeholder={t("YourLastName")}
          label={t("YourLastName")}
          onChange={handleChangeLastName}
          readOnly={readOnly}
          data-testid="ProfileCard.lastName"
        />
        <Input
          value={data?.age}
          placeholder={t("YourAge")}
          label={t("YourAge")}
          type="number"
          onChange={handleChangeAge}
          readOnly={readOnly}
        />
        <Input
          value={data?.city}
          placeholder={t("YourCity")}
          label={t("YourCity")}
          onChange={handleChangeCity}
          readOnly={readOnly}
        />
        <Input
          value={data?.username}
          placeholder={t("YourUsername")}
          label={t("YourUsername")}
          onChange={handleChangeUsername}
          readOnly={readOnly}
        />
        <Input
          value={data?.avatar}
          placeholder={t("YourUrlAvatar")}
          label={t("YourUrlAvatar")}
          onChange={handleChangeAvatar}
          readOnly={readOnly}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={handleChangeCurrency}
          readOnly={readOnly}
        />
        <CountrySelect
          value={data?.country}
          onChange={handleChangeCountry}
          readOnly={readOnly}
        />
      </VStack>
    </div>
  );
};
