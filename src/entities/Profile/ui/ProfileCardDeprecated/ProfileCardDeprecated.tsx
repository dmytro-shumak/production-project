import { memo, useCallback, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { profileActions } from "../../model/slice/profileSlice";
import type { Profile } from "../../model/types/profile";

import styles from "./ProfileCard.module.css";

import { Country, CountrySelect } from "@/entities/Country";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { classNames, useAppDispatch } from "@/shared/lib";
import {
  VStack,
  HStack,
  Avatar as AvatarDeprecated,
  TextAlign,
  TextTheme,
  Text as TextDeprecated,
} from "@/shared/ui";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Loader } from "@/shared/ui/deprecated/Loader";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCardDeprecated = memo(
  ({ className, data, error, isLoading, readOnly }: Props) => {
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
          <TextDeprecated
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
              <AvatarDeprecated src={data?.avatar} alt="avatar" size={100} />
            </HStack>
          )}
          <InputDeprecated
            value={data?.firstName}
            placeholder={t("YourFirstName")}
            label={t("YourFirstName")}
            onChange={handleChangeFirstName}
            readOnly={readOnly}
            data-testid="ProfileCard.firstName"
          />
          <InputDeprecated
            value={data?.lastName}
            placeholder={t("YourLastName")}
            label={t("YourLastName")}
            onChange={handleChangeLastName}
            readOnly={readOnly}
            data-testid="ProfileCard.lastName"
          />
          <InputDeprecated
            value={data?.age}
            placeholder={t("YourAge")}
            label={t("YourAge")}
            type="number"
            onChange={handleChangeAge}
            readOnly={readOnly}
          />
          <InputDeprecated
            value={data?.city}
            placeholder={t("YourCity")}
            label={t("YourCity")}
            onChange={handleChangeCity}
            readOnly={readOnly}
          />
          <InputDeprecated
            value={data?.username}
            placeholder={t("YourUsername")}
            label={t("YourUsername")}
            onChange={handleChangeUsername}
            readOnly={readOnly}
          />
          <InputDeprecated
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
  },
);
