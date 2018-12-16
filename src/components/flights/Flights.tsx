import * as React from 'react';
import './Flights.css';

const [CHEAPEST_AMOUNT, HIGHEST_AMOUNT] = [200, 1000];

export interface IDestination {
  cityName: string,
  contryName: string,
};

export interface IFlight {
  amount: number,
  destination: IDestination,
  duration: number,
  flightCode: string,
  flightDate: number,
  flightName: string,
  id: number,
};

export interface IProps {
  flights: IFlight[],
}

export const getTimeFlightTimeFormat = (startDate: number, totalTime: number) => {
  if (!startDate) {
    return '';
  }
  const startDateFormate: Date = new Date(startDate);
  return `${startDateFormate.getDate()} ${startDateFormate.getMonth()} ${startDateFormate.getFullYear()}`
};

export const AmountFlag: React.StatelessComponent<{ amount: number }> = ({ amount }) => {
  if (amount <= CHEAPEST_AMOUNT) {
    return <span className="amountTitle cheapest">Cheapest</span>
  }
  if (amount >= HIGHEST_AMOUNT) {
    return <span className="amountTitle highest">Highest</span>
  }
  return <span className="amountTitle normal">Normal</span>

}

export const Flights: React.StatelessComponent<IProps> = ({ flights }) => {
  return (
    <ul className="flights">
      {flights.map(flight => <li
        key={flight.id}
        className="flight row"
      >
        <div className="col-xs-4">
          <span className="cityName semiBold">{flight.destination.cityName}</span>
          <span className="contryName">{flight.destination.contryName}</span>
        </div>
        <div className="col-xs-4">
          <span className="time">{getTimeFlightTimeFormat(flight.flightDate, flight.duration)}</span>
          <span className="flightName">{flight.flightName}({flight.flightCode})</span>
        </div>
        <div className="col-xs-4">
          <span className="amount semiBold">${flight.amount}</span>
          <AmountFlag amount={flight.amount} />
        </div>
      </li>)}
    </ul>
  )
}
