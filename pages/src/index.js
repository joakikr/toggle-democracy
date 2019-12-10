import React, { useState } from "react";
import ReactDOM from "react-dom";
import useToggleDemocracy from "toggle-democracy";
import { MuiThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { dark } from './themes';

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4),
            fontSize: '30px'
        }
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    card: {
        padding: theme.spacing(3, 2)
    },
    content: {
        minHeight: '200px'
    },
    toggle: {
        margin: theme.spacing(0, 1)
    },
    select: {
        width: '200px'
    }
}));

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const App = () => {
    const classes = useStyles();
    const [options] = useState(['Foo', 'Bar', 'Baz']);
    const [selected, setSelected] = useState(options[0]);
    const [state, api] = useToggleDemocracy(options)

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelected(value);
    }

    const handleChange = (id) => (event) => {
        const pair = state.pairs[id];
        const checked = event.target.checked;
        const selected = checked ? pair.secondValue : pair.firstValue;
        api.updatePair(id, selected);
    };

    return (
        <MuiThemeProvider theme={dark}>
            <Container maxWidth="md">
                <CssBaseline />
                <Grid container justify="center">
                    <Typography className={classes.header} component="h1" variant="h2">Toggle Democracy Demo</Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.card}>
                            <Grid className={classes.content} container direction="column" justify="space-between">
                                <div>
                                    <Typography className={classes.title} component="div" variant="h6">Why choose this...</Typography>
                                    <FormControl className={classes.select}>
                                        <InputLabel id="select-options">Options</InputLabel>
                                        <Select
                                            labelId="select-options"
                                            value={selected}
                                            onChange={handleSelectChange}
                                        >
                                            {options.map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <Typography>
                                    Selected option: {selected}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.card}>
                            <Grid className={classes.content} container direction="column" justify="space-between">
                                <div>

                                    <Typography className={classes.title} component="div" variant="h6">When you can toggle <i>ALL THE THINGS!</i></Typography>
                                    <Grid container>
                                        {Object.keys(state.pairs).map((id) => {
                                            const pair = state.pairs[id];
                                            return (
                                                <Typography className={classes.toggle} key={id} component="div">
                                                    <Grid component="label" container alignItems="center" spacing={1}>
                                                        <Grid item>{pair.firstValue}</Grid>
                                                        <Grid item>
                                                            <PurpleSwitch
                                                                checked={pair.secondValue === pair.selected}
                                                                onChange={handleChange(id)}
                                                                value={pair.selected}
                                                            />
                                                        </Grid>
                                                        <Grid item>{pair.secondValue}</Grid>
                                                    </Grid>
                                                </Typography>
                                            );
                                        })}
                                    </Grid>
                                </div>
                                <Typography>
                                    Elected leader: {state.leader}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
}

ReactDOM.render((
    <App />
), document.getElementById("app"));