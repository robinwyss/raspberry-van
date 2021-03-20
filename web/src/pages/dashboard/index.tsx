import React from 'react'
import { Box, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSolarPanel, faCarBattery, faAngleDoubleRight, faPlug } from '@fortawesome/free-solid-svg-icons'
import { MpptData, PageState } from '../../lib/types'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './index.module.css';
import theme from '../../lib/theme'
import { getMpptData } from '../../lib/dataclient'
import { getBatteryPercentage, getSolarPercentage, getLoadPercentage } from '../../lib/utils'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core'

// interface Props { }

interface State {
    PageState: PageState
    MpptData?: MpptData
}

class Dashboard extends React.Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            PageState: PageState.Loading
        }
    }

    componentDidMount = () => {
        getMpptData().then(MpptResult => {
            if (MpptResult.hasData) {
                this.setState({ MpptData: MpptResult.data, PageState: PageState.Ready })
            } else {
                this.setState({ PageState: PageState.NoData })
            }
        })
    }

    render() {
        return (
            <Box
                fill="vertical"
                align="center"
                alignContent="center"
                justify="center"
                gap="large"
                direction="row">
                {this.renderContent()}
            </Box>)
    }

    renderContent() {
        switch (this.state.PageState) {
            case PageState.Ready:
                if (this.state.MpptData !== undefined) {
                    return this.renderData(this.state.MpptData)
                }
                break
            case PageState.Loading:
                return (<Box>
                    Loading
                </Box>)
            case PageState.NoData:
            default:
                return (<Box>
                    No Data
                </Box>)
        }
    }

    navigateToBattery = () => {
        this.props.history.push('/details/battery')
    }

    renderData(mpptData: MpptData) {
        var { battery, solarpanel, load } = mpptData

        const solarWatts = Math.round(solarpanel.voltage * solarpanel.current);
        const wattPercentage = getSolarPercentage(solarWatts);
        const batteryPercentage = getBatteryPercentage(battery.voltage);
        const loadPercentage = getLoadPercentage(load.current);

        const solarPanelStatus = `${solarWatts}W ${solarpanel.voltage}V ${solarpanel.current}A`
        const batteryStatus = `${battery.voltage}V`
        const loadStatus = `${load.voltage}V ${load.current}A`
        return (
            <>
            {this.renderStatus(faSolarPanel, wattPercentage, solarPanelStatus)}
                {/* <Bo?x> */}
                <Box>
                    <FontAwesomeIcon color={solarpanel.current > 0 ? theme.global.colors.control.dark : theme.global.colors.control.light} size="6x" icon={faAngleDoubleRight} />
                </Box>
                {this.renderStatus(faCarBattery, batteryPercentage, batteryStatus)}
                <Box>
                    <FontAwesomeIcon color={load.current > 0 ? theme.global.colors.control.dark : theme.global.colors.control.light} size="6x" icon={faAngleDoubleRight} />
                </Box>
                {this.renderStatus(faPlug, loadPercentage, loadStatus)}
            </>
        )
    }

    renderStatus(icon:IconProp, percentage:number, status:string) {

        return (
            <Box align="center" direction="column">
                <FontAwesomeIcon size="6x" icon={icon} />
                <div className={styles.progress}>
                    <CircularProgressbarWithChildren value={percentage}
                        circleRatio={0.75}
                        styles={buildStyles({
                            pathColor: theme.global.colors.control.dark,
                            trailColor: theme.global.colors.control.light,
                            rotation: 1 / 2 + 1 / 8
                        })} >
                        <Text size="large">{percentage}%</Text>
                        <Text size="small">{status}</Text>
                    </CircularProgressbarWithChildren>
                </div>
            </Box>
        )
    }
}

const DashboardWithRouter = withRouter(Dashboard)
export default DashboardWithRouter