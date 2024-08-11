import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { useCallback, type ChangeEvent, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import { setPassword, setUsername } from "../../model/slice/loginSlice";
import styles from "./LoginForm.module.css";

interface Props {
  className?: string;
  isOpen?: boolean;
}

export const LoginForm: FC<Props> = ({ className, isOpen }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { password, username } = useAppSelector(getLoginState);

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
      >
        {t("Login")}
      </Button>
    </div>
  );
};
