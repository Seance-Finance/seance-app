import React, { useState, useCallback, memo } from 'react';
import { Accordion, Divider, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';

import { byDecimals } from 'features/helpers/bignumber';
import PoolSummary from '../PoolSummary/PoolSummary';
import PoolDetails from '../PoolDetails/PoolDetails';
import styles from './styles';

const useStyles = makeStyles(styles);

const Pool = ({
  pool,
  index,
  tokens,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const toggleCard = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);

  return (
    <Grid item xs={12}>
      <Paper elevation={8} className={classes.paper}>
        <Accordion
          expanded={isOpen}
          className={classes.accordion}
          TransitionProps={{ unmountOnExit: true }}
          style={{
            borderRadius: 24,
          }}
        >
          <PoolSummary
            pool={pool}
            balanceSingle={balanceSingle}
            toggleCard={toggleCard}
            isOpen={isOpen}
            sharesBalance={sharesBalance}
            apy={apy}
            fetchBalancesDone={fetchBalancesDone}
            fetchApysDone={fetchApysDone}
            fetchVaultsDataDone={fetchVaultsDataDone}
          />
          <Divider variant="middle" className={classes.divider} />
          <PoolDetails
            pool={pool}
            balanceSingle={balanceSingle}
            sharesBalance={sharesBalance}
            index={index}
          />
        </Accordion>
      </Paper>
    </Grid>
  );
};

export default memo(Pool);
