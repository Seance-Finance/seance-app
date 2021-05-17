import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

const PoolTitle = ({
  name,
  logo,
  description,
  buyTokenUrl,
  addLiquidityUrl,
  removeLiquidityUrl,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderLink = (url, label) => (
    <a className={classes.url} href={url} target="_blank" rel="noopener noreferrer">
      <span>{label}</span>
    </a>
  );

  return (
    <Grid item xs={12} sm={11} className={classes.container}>
      <div className={classes.section}>
        <div className={classes.summary}>
          <Avatar
            alt={name}
            variant="square"
            imgProps={{ style: { objectFit: 'contain' } }}
            src={require(`images/${logo}`)}
          />
          <div className={classes.texts}>
            <Typography className={classes.title} variant="body2">
              {name}
            </Typography>
            {description && (
              <Typography className={classes.subtitle} variant="body2">
                {description}
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.buyLinks}>
          {buyTokenUrl && renderLink(buyTokenUrl, t('Buy-Token'))}
          {addLiquidityUrl && renderLink(buyTokenUrl, t('Add-Liquidity'))}
          {removeLiquidityUrl && renderLink(buyTokenUrl, t('Remove-Liquidity'))}
        </div>
      </div>
    </Grid>
  );
};

export default memo(PoolTitle);
