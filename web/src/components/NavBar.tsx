import React from 'react'
import moment, { Moment } from 'moment'
import styles from './NavBar.module.css'
import { Climate } from '../lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface State {
    date: Moment,
    climate: Climate
}

class NavBar extends React.Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            climate: { temperature: "--" },
            date: moment()
        }
    }

    componentDidMount() {
        // update time every second
        setInterval(() => this.setState({ date: moment() }), 1000)
    }

    render() {
        var { date, climate } = this.state;
        const goHome = () => this.props.history.push('/')


        return (
            <nav className={styles.navbar}>
                <div className={styles.menu}>
                    <FontAwesomeIcon onClick={goHome} icon={faTachometerAlt} size="2x" />
                </div>
                <div className={styles.date}>
                    {date.format('DD.MM.YYYY | H:mm')}
                </div>
            </nav>
        )
    }

}

const NavBarWithRouter = withRouter(NavBar)
export default NavBarWithRouter