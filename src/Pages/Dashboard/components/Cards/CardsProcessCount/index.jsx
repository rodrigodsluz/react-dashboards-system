import React from 'react';

import { useSelector } from 'react-redux';

import cx from 'clsx';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';

import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';

import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import { useStyles } from './styles';

const CardsProcessCount = () => {
  const classes = useStyles();

  const totalProcess = useSelector((state) => state.Document.totalProcess);

  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: false });
  return (
    <Box className={classes.wrapper}>
      <Card className={cx(classes.infoCard, cardShadowStyles.root)}>
        {totalProcess ? (
          <CardContent className={classes.cardContent}>
            <Box className={classes.boxContent}>
              <Typography className={classes.data}>
                {totalProcess.count}
              </Typography>
              <Typography className={classes.label}>
                Total de processos
              </Typography>
            </Box>
            <Box
              className={cx(classes.boxIcon, classes.boxIconBackgroundClose)}
            >
              <DoneAllRoundedIcon className={classes.icon} />
            </Box>
          </CardContent>
        ) : (
          <CardContent className={classes.cardContentProgress}>
            <LinearProgress />
          </CardContent>
        )}
      </Card>
      <Card className={cx(classes.infoCard, cardShadowStyles.root)}>
        {totalProcess ? (
          <CardContent className={classes.cardContent}>
            <Box className={classes.boxContent}>
              <Typography className={classes.data}>
                {totalProcess.open}
              </Typography>
              <Typography className={classes.label}>
                Total de processos em andamento
              </Typography>
            </Box>
            <Box
              className={cx(classes.boxIcon, classes.boxIconBackgroundCreate)}
            >
              <OpenInNewRoundedIcon className={classes.icon} />
            </Box>
          </CardContent>
        ) : (
          <CardContent className={classes.cardContentProgress}>
            <LinearProgress />
          </CardContent>
        )}
      </Card>

      <Card className={cx(classes.infoCard, cardShadowStyles.root)}>
        {totalProcess ? (
          <CardContent className={classes.cardContent}>
            <Box className={classes.boxContent}>
              <Typography className={classes.data}>
                {totalProcess.finished}
              </Typography>
              <Typography className={classes.label}>
                Total de processos finalizados
              </Typography>
            </Box>
            <Box className={cx(classes.boxIcon, classes.boxIconBackgroundOpen)}>
              <ImportContactsRoundedIcon className={classes.icon} />
            </Box>
          </CardContent>
        ) : (
          <CardContent className={classes.cardContentProgress}>
            <LinearProgress />
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default CardsProcessCount;
