import { memo, useCallback, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { profileActions } from "../../model/slice/profileSlice";
import type { Profile } from "../../model/types/profile";

import styles from "./ProfileCard.module.css";

import { Country, CountrySelect } from "@/entities/Country";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { classNames, useAppDispatch } from "@/shared/lib";
import { HStack, VStack } from "@/shared/ui";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Card } from "@/shared/ui/redesigned/Card";
import { Input } from "@/shared/ui/redesigned/Input";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCardRedesigned = memo(
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
          <Card padding="24">
            <VStack gap={32}>
              <HStack justify="center">
                <Skeleton borderRadius="100%" width={128} height={128} />
              </HStack>
              <HStack gap={32}>
                <VStack
                  gap={16}
                  justify="stretch"
                  className={styles.inputColumnWrapper}
                >
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                </VStack>
                <VStack
                  gap={16}
                  justify="stretch"
                  className={styles.inputColumnWrapper}
                >
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                  <Skeleton width="100%" height={38} />
                </VStack>
              </HStack>
            </VStack>
          </Card>
        </div>
      );
    }

    if (error) {
      return (
        <div className={classNames(styles.profileCard, {}, [className])}>
          <Text
            variant="error"
            align="center"
            title={t("ErrorOccurred")}
            text={t("TryToRefreshPage")}
          />
        </div>
      );
    }

    return (
      <Card padding="24" className={classNames("", {}, [className])}>
        <VStack gap={32}>
          {data?.avatar && (
            <HStack align="center">
              <Avatar src={data?.avatar} alt="avatar" size={120} />
            </HStack>
          )}
          <HStack gap={24}>
            <VStack
              gap={16}
              justify="stretch"
              className={styles.inputColumnWrapper}
            >
              <Input
                value={data?.firstName}
                placeholder={t("Name")}
                label={t("Name")}
                onChange={handleChangeFirstName}
                readOnly={readOnly}
                data-testid="ProfileCard.firstName"
              />
              <Input
                value={data?.lastName}
                placeholder={t("LastName")}
                label={t("LastName")}
                onChange={handleChangeLastName}
                readOnly={readOnly}
                data-testid="ProfileCard.lastName"
              />
              <Input
                value={data?.age}
                placeholder={t("Age")}
                label={t("Age")}
                type="number"
                onChange={handleChangeAge}
                readOnly={readOnly}
              />
              <Input
                value={data?.city}
                placeholder={t("City")}
                label={t("City")}
                onChange={handleChangeCity}
                readOnly={readOnly}
              />
            </VStack>
            <VStack
              gap={16}
              justify="stretch"
              className={styles.inputColumnWrapper}
            >
              <Input
                value={data?.username}
                placeholder={t("Username")}
                label={t("Username")}
                onChange={handleChangeUsername}
                readOnly={readOnly}
              />
              <Input
                value={data?.avatar}
                placeholder={t("YourUrlAvatar")}
                label={t("UrlAvatar")}
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
          </HStack>
        </VStack>
      </Card>
    );
  },
);
