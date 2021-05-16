import React from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';

import { formatApy, formatTvl } from 'features/helpers/format';
import { byDecimals } from 'features/helpers/bignumber';
import styles from './styles';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  toggleCard,
  isOpen,
  balanceSingle,
  sharesBalance,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice) : '';

  return (
    <AccordionSummary
      className={classes.details}
      onClick={event => {
        event.stopPropagation();
        toggleCard();
      }}
    >
      <Grid container alignItems="center" justify="space-around" className={classes.container}>
        <PoolTitle
          name={pool.name}
          logo={pool.logo}
          description={t('Vault-Description', { vault: pool.tokenDescription })}
          addLiquidityUrl={pool.addLiquidityUrl}
          removeLiquidityUrl={pool.removeLiquidityUrl}
          buyTokenUrl={pool.buyTokenUrl}
        />

        <Grid item xs={12} sm={11} className={classes.section}>
          <LabeledStat
            value={formatDecimals(balanceSingle)}
            subvalue={balanceUsd}
            label={t('Vault-Balance')}
            isLoading={!fetchBalancesDone}
            xs={4}
          />
          <LabeledStat
            value={formatDecimals(deposited)}
            subvalue={depositedUsd}
            label={t('Vault-Deposited')}
            isLoading={!fetchBalancesDone}
            xs={4}
            align="start"
          />
          <LabeledStat
            value={formatApy(apy)}
            label={t('Vault-APY')}
            isLoading={!fetchApysDone}
            xs={4}
            align="start"
          />
        </Grid>

        <Grid item xs={12} align="center">
          {isOpen ? (
            <ExpandLessIcon className={classes.expandIcon} />
          ) : (
            <ExpandMoreIcon className={classes.expandIcon} />
          )}
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

export default PoolSummary;
