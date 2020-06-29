import React, {
    useState,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Typography,
    makeStyles
} from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        textAlign: 'center',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(3, 2),
        '&:not(:last-of-type)': {
            borderRight: `1px solid ${theme.palette.divider}`
        }
    }
}));

function EarningsSegmentation({ className, ...rest }) {
    const classes = useStyles();
    const [earnings, setEarnings] = useState(
        {
            datasets: [
                {
                    data: [56, 24, 20],
                    backgroundColor: ['#3d72eb', '#4b9e86', '#b658f5']
                }
            ],
            labels: ['Hip-Hop', 'Indie Rock', 'Trip-Hop'],
        }
    );

    if (!earnings) {
        return null;
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader
                title="Genre Breakdown"
            />
            <Divider />
            <Box
                p={3}
                position="relative"
                minHeight={320}
            >
                <Chart data={earnings} />
            </Box>
            <Divider />
            <Box display="flex">
                {earnings.labels.map((label, i) => (
                    <div
                        key={label}
                        className={classes.item}
                    >
                        <Typography
                            variant="h4"
                            color="textPrimary"
                        >
                            {earnings.datasets[0].data[i]}
                            %
              </Typography>
                        <Typography
                            variant="overline"
                            color="textSecondary"
                        >
                            {label}
                        </Typography>
                    </div>
                ))}
            </Box>
        </Card>
    );
}

EarningsSegmentation.propTypes = {
    className: PropTypes.string
};

export default EarningsSegmentation;
