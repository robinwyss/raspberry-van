import React from 'react'
import { Box, Text, defaultProps } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSolarPanel, faCarBattery, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { MpptData } from '../../lib/types'
import { getMpptData } from '../../lib/api'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './index.module.css';
import theme from '../../lib/theme'

interface Props { }

interface State {
    MpptData: MpptData
}

class Dashboard extends React.Component<Props, State> {

    componentDidMount = () => {
        getMpptData().then(MpptData => {
            this.setState({ MpptData })
        })
    }

    render() {


        if (this.state && this.state.MpptData) {
            var { batteryVoltage, chargingCurrent, solarCurrent, solarVoltage } = this.state.MpptData
        } else {
            var batteryVoltage = 0, chargingCurrent = 0, solarCurrent = 0, solarVoltage = 0
        }

        const maxWatts = 240;
        const watts = solarCurrent * solarVoltage
        const wattPercentage = (watts / maxWatts) * 100
        const batteryLevel = 90;

        return (
            <Box
                fill="vertical"
                align="center"
                alignContent="center"
                justify="center"
                gap="large"
                direction="row">
                <Box align="center" direction="column">
                    <FontAwesomeIcon size="6x" icon={faSolarPanel} />
                    <div className={styles.progress}>
                        <CircularProgressbarWithChildren value={wattPercentage}
                            circleRatio={0.75}
                            styles={buildStyles({
                                rotation: 1 / 2 + 1 / 8
                            })} >
                            <Text size="large">{watts}W</Text>
                            <Text size="small">{solarVoltage}V {solarCurrent}A</Text>
                        </CircularProgressbarWithChildren>
                    </div>
                </Box>
                <Box>
                    <FontAwesomeIcon size="6x" icon={faAngleDoubleRight} />
                </Box>
                <Box align="center" direction="column">
                    <FontAwesomeIcon size="6x" icon={faCarBattery} />
                    <div className={styles.progress}>
                        <CircularProgressbarWithChildren value={batteryLevel}
                            circleRatio={0.75}
                            styles={buildStyles({
                                pathColor: theme.global.colors.control.dark,
                                trailColor: theme.global.colors.control.light,
                                rotation: 1 / 2 + 1 / 8
                            })} >
                            <Text size="large">{batteryLevel}%</Text>
                            <Text size="small">{batteryVoltage}V</Text>
                        </CircularProgressbarWithChildren>
                    </div>
                </Box>
            </Box >
        )
    }
}

export default Dashboard