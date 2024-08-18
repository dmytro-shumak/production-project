import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { useCallback, type ChangeEvent, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, useAsyncReducer } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import {
  loginReducer,
  setPassword,
  setUsername,
} from "../../model/slice/loginSlice";
import styles from "./LoginForm.module.css";

interface Props {
  className?: string;
  isOpen?: boolean;
}

const initialReducer = {
  loginForm: loginReducer,
};

export const LoginForm: FC<Props> = ({ className, isOpen }) => {
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

  const handleLoginClick = useCallback(() => {
    dispatch(loginByUsername({ password, username }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(styles.loginForm, {}, [className])}>
      <Text title={t("Login")} />
      {error && <Text text={error} theme={TextTheme.ERROR} />}
      <Input
        label="Username"
        autoFocus={isOpen}
        onChange={handleChangeUsername}
        value={username}
      />
      <Input
        label="Password"
        onChange={handleChangePassword}
        value={password}
      />
      <Button
        className={styles.loginBtn}
        theme={ButtonTheme.Outline}
        onClick={handleLoginClick}
        disabled={isLoading}
      >
        {t("Login")}
      </Button>
    </div>
  );
};
