import { useCallback, type ChangeEvent, type FC } from "react";
import { useTranslation } from "react-i18next";

import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import {
  loginReducer,
  setPassword,
  setUsername,
} from "../../model/slice/loginSlice";

import styles from "./LoginForm.module.css";

import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  classNames,
} from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDeprecated,
  ButtonTheme,
  Text as TextDeprecated,
  TextTheme,
} from "@/shared/ui";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Input } from "@/shared/ui/redesigned/Input";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  isOpen?: boolean;
  onSuccess?: () => void;
}

const initialReducer = {
  loginForm: loginReducer,
};

export const LoginForm: FC<Props> = ({ className, isOpen, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useAsyncReducer(initialReducer);

  const {
    password = "",
    username = "",
    isLoading,
    error,
  } = useAppSelector(getLoginState) ?? {};

  const handleChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setUsername(e.target.value));
    },
    [dispatch],
  );

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setPassword(e.target.value));
    },
    [dispatch],
  );

  const handleLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ password, username }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess?.();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <div className={classNames(styles.loginForm, {}, [className])}>
          <Text title={t("Login")} />
          {error && <Text text={error} variant="error" />}
          <Input
            label="Username"
            autoFocus={isOpen}
            onChange={handleChangeUsername}
            value={username}
          />
          <Input
            label="Password"
            type="password"
            onChange={handleChangePassword}
            value={password}
          />
          <Button
            className={styles.loginBtn}
            variant="outline"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {t("Login")}
          </Button>
        </div>
      }
      off={
        <div className={classNames(styles.loginForm, {}, [className])}>
          <TextDeprecated title={t("Login")} />
          {error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
          <InputDeprecated
            label="Username"
            autoFocus={isOpen}
            onChange={handleChangeUsername}
            value={username}
          />
          <InputDeprecated
            label="Password"
            type="password"
            onChange={handleChangePassword}
            value={password}
          />
          <ButtonDeprecated
            className={styles.loginBtn}
            theme={ButtonTheme.Outline}
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {t("Login")}
          </ButtonDeprecated>
        </div>
      }
    />
  );
};
