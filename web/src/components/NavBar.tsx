import React from 'react'
import moment, { Moment } from 'moment'
import styles from './NavBar.module.css'
// import { getClimate } from '../lib/api'
import { Climate } from '../lib/types'
import { Header, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'


interface Props { }

interface State {
    date: Moment,
    climate: Climate
}

class NavBar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            climate: { temperature: "--" },
            date: moment()
        }
    }

    componentDidMount() {
        this.updateClimate();
        // update time every second
        setInterval(() => this.setState({ date: moment() }), 1000)
        // update climate every minutes
        setInterval(this.updateClimate, 60000)
    }

    updateClimate = () => {
        // getClimate().then((result: Climate) => {
        //     this.setState({ climate: result })
        // })
    }

    render() {
        var { date, climate } = this.state;
        return (
            <Header
                background="brand"
                pad={{ left: 'medium', right: 'small', vertical: 'small' }}
                elevation='medium'>
                <div >
                    <FontAwesomeIcon icon={faThermometerEmpty} />
                    <Text margin="small">{climate.temperature}</Text>
                </div>
                <div className={styles.date}>
                    <Text margin="small"></Text>
                    {date.format('H:mm DD.MM.YYYY')}
                </div>
            </Header >

        )
    }

}

export default NavBar