import React, { useEffect, useState, useRef, useContext } from 'react';
import { Avatar, Button, IconButton, List, ListItem, Paper, Popover } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NightsStay from '@material-ui/icons/NightsStay';
import WbSunny from '@material-ui/icons/WbSunny';
import { renderIcon } from '@download/blockies';
import { AppContext } from '../../features/home/context';
import clsx from 'clsx';
import { useStyles } from './styles';

const HomePageActions = () => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shortAddress, setShortAddress] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const { address, connectWallet, disconnectWallet, connected, isNightMode, setNightMode } =
    useContext(AppContext);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!connected) {
      return;
    }

    const canvas = canvasRef.current;
    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas.toDataURL();
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
    if (address.length < 11) {
      setShortAddress(address);
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [dataUrl, address, connected]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderLink = (link, label, icon) => {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={classes.link}>
        <i className={`${icon} ${classes.icon}`} />
        <span>{label}</span>
      </a>
    );
  };

  return (
    <div className={classes.container}>
      <Button
        disableElevation
        className={clsx(classes.button, classes.walletButton)}
        onClick={connected ? disconnectWallet : connectWallet}
      >
        {connected ? (
          <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Avatar alt="address" src={dataUrl} className={classes.avatar} />
            {shortAddress}
          </>
        ) : (
          <>
            <i className={classes.icon + ' far fa-question-circle'} />
            Connect to a wallet
          </>
        )}
      </Button>

      <IconButton className={clsx(classes.button, classes.iconButton)} onClick={setNightMode}>
        {isNightMode ? <WbSunny /> : <NightsStay />}
      </IconButton>
      <IconButton className={clsx(classes.button, classes.iconButton)} onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ paper: classes.popover }}
      >
        <Paper className={classes.paper}>
          <List>
            <ListItem className={classes.listItem}>
              {renderLink(
                'https://docs.seance.finance/', // TODO: change
                'Docs',
                'fas fa-book'
              )}
            </ListItem>
            <ListItem className={classes.listItem}>
              {renderLink('https://github.com/Seance-Finance', 'Code', 'fab fa-github')}
            </ListItem>
            <ListItem className={classes.listItem}>
              {renderLink('https://discord.gg/xxYUxuAQkW', 'Discord', 'fab fa-discord')}
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </div>
  );
};

export default HomePageActions;
