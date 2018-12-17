import * as React from 'react';
import './MultiSelect.css';

export interface IState {
  inputValue: string,
  options: string[],
  showList: boolean,
}

export interface IProps {
  options: string[],
  selectedOptions: string[],
  onChange: (selectedOptions: string[]) => void,
  placeholder?: string,
}

export class MultiSelect extends React.Component<IProps, IState> {
  private multiSearchRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      options: this.props.options,
      showList: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.multiSearchRef = React.createRef();
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  public render() {
    return (
      <div className="multiSelectWrap">
        <ul className="selectedList">
          {this.props.selectedOptions.map(option => <li key={option}>
            {option}
            <i onClick={this.removeItem.bind(this, option)} >X</i>
          </li>)}
        </ul>
        <div className="inputWrap" ref={this.multiSearchRef}>
          <input
            type="text"
            placeholder={this.props.placeholder}
            className="form-control"
            value={this.state.inputValue}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          {this.state.showList && <ul className="mutiSelectList">
            {this.state.options.map(option => <li
              key={option}
              onClick={this.addItem.bind(this, option)}
              onKeyDown={this.handleFocus}
            >{option}</li>)}
          </ul>}
        </div>
      </div>
    )
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value
    this.setState({
      inputValue,
      options: this.props.options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())),
    });

  }

  private addItem(newValue: string) {
    const selectedOptions = [...this.props.selectedOptions];
    if (newValue && !selectedOptions.includes(newValue)) {
      selectedOptions.push(newValue);
      this.props.onChange(selectedOptions);
    }
  }

  private removeItem(deletedValue: string) {
    const selectedOptions = this.props.selectedOptions.filter(option => option !== deletedValue);
    this.props.onChange(selectedOptions);
  }

  private handleFocus() {
    this.setState({ showList: true });
  }

  private handleOutsideClick(e: any) {
    if (this.multiSearchRef.current.contains(e.target)) {
      return;
    }
    this.setState({ showList: false })
  }

}
