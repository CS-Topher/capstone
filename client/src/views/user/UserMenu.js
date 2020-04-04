import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {
  ADD_POST,
  ADD_LIST,
  PROFILE_SETTINGS,
  LOG_OUT
} from 'config/view/constants';

export const UserMenu = (props) => {
  const [state, setState] = React.useState({
    menu: false
  });

  // The direction the menu enters from.
  const menuAnchor = 'left';

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, 'menu': open });
  };

  const userMenuOptions = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => props.onAddPost()}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary={ADD_POST} />
        </ListItem>
        <ListItem button onClick={() => props.onAddList()}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary={ADD_LIST} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={PROFILE_SETTINGS} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ExitToAppIcon />
          <ListItemText primary={LOG_OUT} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge={props.edge}
        onClick={toggleDrawer(true)}
        aria-label="open drawer">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={menuAnchor}
        open={state.menu}
        onClose={toggleDrawer(false)}
       >
        {userMenuOptions()}
      </Drawer>
    </div>
  );
}
