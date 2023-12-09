import React from "react";
import { SxProps, ListItemIcon } from "@mui/material";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, FeedbackIcon, LogoutIcon, MoonIcon, SettingIcon, SwitchAccountIcon, TranslateIcon } from "@/components/icons";
import Typography from "@/components/Typography";
import UserCardForMenu from "./UserCardForMenu";
import Divider from "@/components/Divider";
import { Menu, MenuItem } from "@/components/Menu";

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  isVisible: boolean;
  onClose: () => void;
  onSwitchAccount: () => void;
  onSetting: () => void;
  onLogout: () => void;
  onClickProfile: () => void;
  onAppearance: () => void;
  onTranslation: () => void;
  onShareFeedback: () => void;
}

export default function UserMenu({ anchorEl, isVisible, onClose, onSwitchAccount, onSetting, onClickProfile, onLogout, onAppearance, onTranslation, onShareFeedback }: UserMenuProps) {
  const { t } = useTranslation();

  const menuItemStyle = useThemeStyles<SxProps>((theme) => ({
    width: theme.spacing(40),
  }));

  const createMenuItem = (icon: React.ReactNode, label: string, onClick: () => void, hasChevron: boolean = false) => (
    <MenuItem sx={menuItemStyle} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography variant="h6" color="primary">
        {label}
      </Typography>
      {hasChevron && (
        <ListItemIcon sx={{ marginLeft: "auto" }}>
          <ChevronRightIcon />
        </ListItemIcon>
      )}
    </MenuItem>
  );

  return (
    <Menu anchorEl={anchorEl} open={isVisible} onClose={onClose} onClick={onClose}>
      <MenuItem sx={menuItemStyle} disableRipple>
        <UserCardForMenu onClick={onClickProfile} />
      </MenuItem>
      <Divider />
      {createMenuItem(<SwitchAccountIcon />, t("Layout.AppBar.UserMenu.switchAccount"), onSwitchAccount)}
      {createMenuItem(<SettingIcon />, t("Layout.AppBar.UserMenu.settings"), onSetting)}
      {createMenuItem(<LogoutIcon />, t("Layout.AppBar.UserMenu.logout"), onLogout)}
      <Divider />
      {createMenuItem(<MoonIcon />, t("Layout.AppBar.UserMenu.appearance"), onAppearance, true)}
      {createMenuItem(<TranslateIcon />, t("Layout.AppBar.UserMenu.translation"), onTranslation, true)}
      {createMenuItem(<FeedbackIcon />, t("Layout.AppBar.UserMenu.shareFeedback"), onShareFeedback)}
    </Menu>
  );
}
