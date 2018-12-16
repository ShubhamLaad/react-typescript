import * as React from 'react';
import DatePicker from 'react-datepicker';
import FLIGHTS from '../../json/flights';
import { Flights, IFlight } from '../flights/Flights';
import './App.css';

interface IState {
  selectedDate: Date,
  flights: IFlight[],
  selectedDestinationCodes: any,
};

class App extends React.Component<{}, IState> {
  public static getStartOfDayDate(date: number) {
    return new Date(date).setHours(0, 0, 0, 0);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      flights: [],
      selectedDate: new Date(),
      selectedDestinationCodes: ['1', '2'],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    this.filterFlights();
  }

  public render() {
    return (
      <div className="container">
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleChange}
          dateFormat="dd/MM/yyyy"
        />
        <Flights flights={this.state.flights} />
      </div>
    );
  }

  private filterFlights() {
    const flights = FLIGHTS.filter(flight => {
      return App.getStartOfDayDate(this.state.selectedDate.getTime()) === App.getStartOfDayDate(flight.flightDate)
        && this.state.selectedDestinationCodes.includes(flight.destination.code)
    })
    flights.sort((first, next) => {
      return first.amount - next.amount;
    })
    this.setState({
      flights
    })
  }

  private handleChange(selectedDate: Date) {
    this.setState({
      selectedDate
    }, this.filterFlights);
  }
}

export default App;
