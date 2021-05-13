import { faCalendarDay, faCalendarWeek, faCarBattery, faChartLine, faPlug, faSolarPanel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Config, fromFlux, LineLayerConfig, NINETEEN_EIGHTY_FOUR, Plot } from '@influxdata/giraffe'
import React from 'react'
import { match, RouteComponentProps } from 'react-router-dom'
import { getData } from '../../lib/dataclient'
import { Field, Measurement } from '../../lib/influxclient'
import { PageState } from '../../lib/types'
import Button from '../../components/Button'

interface Params {
    measurement: string
}

interface State {
    state: PageState
    csvData: string,
    measurement: Measurement,
    field: Field
}

class Details extends React.Component<RouteComponentProps<Params>, State> {

    constructor(props: RouteComponentProps<Params>) {
        super(props)

        const measurement = this.getMeasurementFromParam(props.match.params.measurement)
        if (!measurement) {
            props.history.push("/")
            return
        }

        this.state = {
            state: PageState.Loading,
            csvData: "",
            field: Field.Current,
            measurement
        }
    }

    getMeasurementFromParam(param: string) {
        if (Measurement.Battery === param) {
            return Measurement.Battery;
        } else if (Measurement.Load === param) {
            return Measurement.Load
        } else if (Measurement.Solarpanel == param) {
            return Measurement.Solarpanel
        }
        return undefined;
    }

    componentDidMount() {
        const { field, measurement } = this.state
        getData(measurement, field).then(result => {
            console.log(result)
            this.setState({
                csvData: result.csv,
                state: result.hasData ? PageState.Ready : PageState.NoData,
            })
        })
    }

    render() {
        const buttonStyle = {
            height: 56
        }

        const menuStyle = {
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#292F31" //"#1C1C21"
        }

        const containerStyle = {
            display: "flex",
            flexDirection: "column" as "column",
            alignItems: 'stretch',
            height: '100%'
        }

        const contentStyle = {
            flex: 1
        }

        return (
            <div style={containerStyle}>
                <div style={menuStyle}>
                    <div>
                        <Button icon={faSolarPanel} selected />
                        <Button icon={faCarBattery} />
                        <Button icon={faPlug} />
                    </div>
                    <div>
                        <Button icon={faChartLine} label="Voltage" />
                        <Button icon={faChartLine} selected label="Current" />
                    </div>
                    <div>
                        <Button icon={faCalendarDay} selected label="Day" />
                        <Button icon={faCalendarWeek} label="Week" />
                    </div>
                </div>
                <div style={contentStyle}>
                    {this.renderContent()}
                </div>
            </div>
        )

    }

    renderContent() {
        const { state } = this.state
        if (state === PageState.Loading) {
            return (
                <div>Loading</div>
            )
        } else if (state === PageState.NoData) {
            return (
                <div>No Data</div>
            )
        }

        const dataFromFlux = fromFlux(this.state.csvData)

        const lineLayer: LineLayerConfig = {
            type: "line",
            x: "_time",
            y: "_value",
            lineWidth: 3,
            shadeBelow: true,
            shadeBelowOpacity: 0.1,
            interpolation: "monotoneX",
            colors: NINETEEN_EIGHTY_FOUR
        }

        const config: Config = {
            table: dataFromFlux.table,
            xScale: 'linear',
            yScale: 'linear',
            layers: [lineLayer],
        }

        const style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#292F31'
        };

        return (
            <div style={style}>
                <Plot config={config} />
            </div>
        )
    }
}

export default Details