import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { apiURL } from '../../Utilities/apiURL'
import { useInput } from '../../Utilities/CustomHookery'
import { addRegistration } from '../UserWorkshopsAgenda/RegisterWorkshopSlice'

import AddToCalendarHOC from 'react-add-to-calendar-hoc'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import EventIcon from '@material-ui/icons/Event';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import StepConnector from '@material-ui/core/StepConnector';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
        'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
        'linear-gradient(90deg, hsla(238, 34%, 32%, 1) 0%, hsla(333, 100%, 53%, 1) 50%, hsla(33, 94%, 57%, 1) 100%)',
  },
  
});


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            outlineColor: '#36386D',
            border: 'none',
        },
    },
    container: {
        width: '50%',
        flex: 1,
    },
    image : {
        width: '100%',
        [theme.breakpoints.down('sm')]:{
          width: '50%'
      },
    },
    button: {
        marginRight: theme.spacing(1),
  },
  stepperContent: {
      width: '100%',
      marginTop: theme.spacing(1),
      '& * + *' : {
          marginBottom: theme.spacing(1)
      }
  },
  profileLink: {
        color: '#FF0F7B',
        '&:hover': {
            color: '#36386D'
        },
  },
  input: {
    width: '100%',
    fontFamily: 'audiowide',
    marginBottom: theme.spacing(1)
  }, 
  stepper: {
    padding: theme.spacing(2),
    backgroundColor: '#F5F5F5'
  },
  text: {
    width: '100%',
    marginBottom: theme.spacing(1),
    flex: 1
  }
}))

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#A3A3A3',
    borderRadius: 1,
  },
})(StepConnector);

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <InfoOutlinedIcon />,
    2: <EventIcon />,
    3: <CheckCircleOutlinedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const getSteps = () => {
  return ['Details', 'Register', 'Confirmation'];
}


const WorkshopRegistration = ({ workshop, handleCloseModal, dateTime, participantsData }) => {
  
    const dispatch = useDispatch()
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

 

    const WorkshopDescription = () => {

      return (
          <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
              <Typography align='center' style={{color: '#FF0F7B'}} className={classes.text} variant='h6'>{workshop.title}</Typography>
              <Grid className={classes.root} container item display="flex" direction="row" justify="center" alignItems="center" sm={12}>
                <Grid className={classes.container} item container display="flex" direction="column" justify="flex-start" alignItems="stretch">
                    <Link to={`/Profile/${workshop.user_id}`} className={classes.profileLink}>
                    <Typography align='left' className={classes.text} variant='subtitle1'>  Facilitator: {`${workshop.firstn} ${workshop.lastn}` }</Typography>
                    </Link>
                    <Typography align='left' className={classes.text} variant='body2'>{`${dateTime.date} ${dateTime.time}`}</Typography>
                    <Typography align='left' className={classes.text} variant='body2'>Description: {workshop.descriptions}</Typography>
                    <Typography align='left' className={classes.text} variant='body2'>Category: {workshop.category}</Typography>
                    <Typography align='left' className={classes.text} variant='body2' className={workshop.participants !== workshop.workshop_count ? classes.text : classes.participants}>{participantsData}</Typography>
                </Grid>
                <Grid className={classes.container} item container display="flex" direction='row' justify="center" alignItems="center">
                  <img className={classes.image} src={workshop.workshop_img} alt={workshop.title} />
                </Grid>
              </Grid>
              {workshop.participants !== workshop.workshop_count ?
                  <Grid className={classes.root} item container display="flex" direction="row" justify="space-around" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleCloseModal}> RETURN TO WORKSHOPS </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}> BEGIN REGISTRATION </Button> 
                  </Grid>
                : <Button variant="contained" color="primary" onClick={handleCloseModal}> AT CAPACITY : RETURN TO SEARCH </Button>}
          </Grid>
      )
    }


    const WorkshopRegistration = () => {

        const message = useInput("")

        const handleSubmit = (event) => {
            event.preventDefault()
            handleNext()
            try {
              setTimeout(() => {
                dispatch(addRegistration(workshop.workshop_id))
              }, 5000);
              let facilitatorEmail = axios.post(`${apiURL()}/email`, {
                  to: 'nilberremon@pursuit.org',
                  from: 'WeRiseFacilitator@werise.org',
                  subject: 'WeRise - A User Registered for Your Workshop',
                  content: message.value
              })
            } catch (error) {
                throw Error(error)
            }
        }

        return (
            <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">                
                <form onSubmit={handleSubmit}>
                    <Typography variant='h6'>Introduce Yourself to the Facilitator</Typography>
                    <TextField id="message" className={classes.input} label="Your Message" placeholder="Tell the Facilitator About Your Interest in the Workshop" variant="filled" multiline rows={10} {...message} required />
                    <Grid className={classes.root} container display="flex" direction="row" justify="space-around" alignItems="center">
                        <Button variant="contained" color="primary" onClick={handleBack}> BACK </Button>
                        <Button variant="contained" color="primary" type="submit"> REGISTER </Button>
                    </Grid> 
                </form>
            </Grid>
        )
    }

    const WorkshopConfirmation = () => {

        const [calendar, setCalendar] = useState("")

        let calendarEventDetails = {
          title: workshop.title,
          description: workshop.descriptions,
          location: 'WeRise VideoChat',
          startTime: workshop.start_time,
          endTime: workshop.end_time
        };

        const handleSelect = (event) => {

        }

        return (
            <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
                <Typography variant='h6'>Registration Complete</Typography>
                <Typography variant='body1'>Thank you for Registering for {workshop.title}</Typography>
                {/* <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="addToCalendar">Add to Calendar</InputLabel>
                  <Select
                    value={calendar}
                    onChange={handleSelect}
                    inputProps={{
                      name: 'Add to Calendar',
                      id: 'addToCalendar',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={'Apple'}>Apple</option>
                    <option value={'Google'}>Google</option>
                    <option value={'Outlook'}>Outlook</option>
                  </Select>
                </FormControl> */}
                <Button variant="contained" color="primary" onClick={handleCloseModal}> CLOSE </Button>
            </Grid>
        )
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
            return <WorkshopDescription />
            case 1:
            return <WorkshopRegistration />
            case 2:
            return <WorkshopConfirmation />
            default:
            return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
        <Stepper className={classes.stepper} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
        </Stepper>
        <Grid className={classes.stepperContent} container display="flex" direction="column" justify="space-evenly" alignItems="center">{getStepContent(activeStep)}</Grid>
    </div>
    )
}


export default WorkshopRegistration;
