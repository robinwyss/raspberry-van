import { Config, fromFlux, LineLayerConfig, NINETEEN_EIGHTY_FOUR, Plot } from '@influxdata/giraffe'
import { Box } from 'grommet'
import React from 'react'
import { getData } from '../../lib/dataclient'
import { Field, Measurement } from '../../lib/influxclient'
import { PageState } from '../../lib/types'

interface Props {

}

interface State {
    state: PageState
    csvData: string,
    measurement: Measurement,
    field: Field
}

class Details extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            state: PageState.Loading,
            csvData: "",
            field: Field.Current,
            measurement: Measurement.Battery
        }
    }

    componentDidMount() {
        const { field, measurement } = this.state
        getData(measurement, field).then(result => {
            console.log(result)
            this.setState({
                csvData: result.csv,
                state: result.hasData ? PageState.Ready : PageState.NoData
            })
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
            </Box>
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
            backgroundColor: '#1C1C21'
        };

        return (
            <div style={style}>
                <Plot config={config} />
            </div>
        )
    }
}

export default Details