import * as React from 'react';
import DatePicker from 'react-datepicker';
import DESTINATIONS from '../../json/destintions'
import FLIGHTS from '../../json/flights';
import { Flights, IFlight } from '../flights/Flights';
import { MultiSelect } from '../multiselect/MultiSelect';
import './App.css';

interface IState {
  selectedDate: Date,
  flights: IFlight[],
  selectedCityNames: string[],
};

class App extends React.Component<{}, IState> {
  public static getStartOfDayDate(date: number) {
    return new Date(date).setHours(0, 0, 0, 0);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      flights: [],
      selectedCityNames: [],
      selectedDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
  }

  public componentDidMount() {
    this.filterFlights();
  }

  public render() {
    return (
      <div className="container">
        <DatePicker
          placeholderText="Select Date"
          selected={this.state.selectedDate}
          onChange={this.handleChange}
          dateFormat="dd/MM/yyyy"
        />
        <MultiSelect
          placeholder="Select Multiple Cities"
          options={DESTINATIONS.map(destintion => destintion.cityName)}
          selectedOptions={this.state.selectedCityNames}
          onChange={this.handleMultiSelectChange}
        />
        <h4 className="text-center">Top trips for you</h4>
        <Flights flights={this.state.flights} />
      </div>
    );
  }

  private filterFlights() {
    const { selectedCityNames, selectedDate } = this.state;
    if (selectedDate) {
      const flights = FLIGHTS.filter(flight => {
        return App.getStartOfDayDate(selectedDate.getTime()) === App.getStartOfDayDate(flight.flightDate)
          && (!selectedCityNames.length || selectedCityNames.includes(flight.destination.cityName))
      })
      flights.sort((first, next) => {
        return first.amount - next.amount;
      })
      this.setState({
        flights
      })
    }
  }

  private handleChange(selectedDate: Date) {
    this.setState({
      selectedDate
    }, this.filterFlights);
  }

  private handleMultiSelectChange(selectedCityNames: string[]) {
    this.setState({ selectedCityNames })
  }
}

export default App;
