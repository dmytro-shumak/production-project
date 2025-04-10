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
  classNames,
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
} from "@/shared/lib";
import { useForceUpdate } from "@/shared/lib/render/forceUpdate";
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

  const forceUpdate = useForceUpdate();

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
      forceUpdate();
    }
  }, [dispatch, forceUpdate, onSuccess, password, username]);

  return (
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
  );
};
