import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSolarPanel, faCarBattery, faAngleDoubleRight, faPlug } from '@fortawesome/free-solid-svg-icons'
import { MpptData, EmptyMpptData } from '../../lib/types'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './index.module.css';
import theme from '../../lib/theme'
import { getBatteryData } from '../../lib/dataclient'
import { getBatteryPercentage, getSolarPercentage, getLoadPercentage } from '../../lib/utils'

interface Props { }

interface State {
    MpptData: MpptData
}

class Dashboard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            MpptData: EmptyMpptData()
        }
    }

    componentDidMount = () => {
        getBatteryData().then(MpptData => {
            this.setState({ MpptData })
        })
    }

    render() {
        var { battery, solarpanel, load } = this.state.MpptData

        const solarWatts = solarpanel.voltage * solarpanel.current;
        const wattPercentage = getSolarPercentage(solarWatts);
        const batteryPercentage = getBatteryPercentage(battery.voltage);
        const loadPercentage = getLoadPercentage(load.current);

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
                            <Text size="large">{solarWatts}W</Text>
                            <Text size="small">{solarpanel.voltage}V {solarpanel.current}A</Text>
                        </CircularProgressbarWithChildren>
                    </div>
                </Box>
                <Box>
                    <FontAwesomeIcon size="6x" icon={faAngleDoubleRight} />
                </Box>
                <Box align="center" direction="column">
                    <FontAwesomeIcon size="6x" icon={faCarBattery} />
                    <div className={styles.progress}>
                        <CircularProgressbarWithChildren value={batteryPercentage}
                            circleRatio={0.75}
                            styles={buildStyles({
                                pathColor: theme.global.colors.control.dark,
                                trailColor: theme.global.colors.control.light,
                                rotation: 1 / 2 + 1 / 8
                            })} >
                            <Text size="large">{batteryPercentage}%</Text>
                            <Text size="small">{battery.voltage}V</Text>
                        </CircularProgressbarWithChildren>
                    </div>
                </Box>
                <Box>
                    <FontAwesomeIcon size="6x" icon={faAngleDoubleRight} />
                </Box>
                <Box align="center" direction="column">
                    <FontAwesomeIcon size="6x" icon={faPlug} />
                    <div className={styles.progress}>
                        <CircularProgressbarWithChildren value={loadPercentage}
                            circleRatio={0.75}
                            styles={buildStyles({
                                pathColor: theme.global.colors.control.dark,
                                trailColor: theme.global.colors.control.light,
                                rotation: 1 / 2 + 1 / 8
                            })} >
                            <Text size="large">{loadPercentage}%</Text>
                            <Text size="small">{battery.voltage}V {battery.current}A</Text>
                        </CircularProgressbarWithChildren>
                    </div>
                </Box>
            </Box >
        )
    }
}

export default Dashboard