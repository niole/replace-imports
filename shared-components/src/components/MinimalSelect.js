import React, {PureComponent} from 'react';
import { omit } from 'lodash';
import {
    oneOfType,
    number,
    bool,
    string,
    func,
    arrayOf,
} from 'prop-types';
import $ from 'jquery';
import MinimalDropdown from './MinimalDropdown';

class MinimalSelect extends PureComponent {
    state = {
        selectedValue: this.props.defaultValue,
        open: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedValue: nextProps.defaultValue });
    }

    onSelect = (event) => {
        event.preventDefault();
        const {
            shouldSumbitOnSelect,
        } = this.props;
        const target = event.target.value ? event.target : event.currentTarget;
        const value = target.value;

        this.props.onChange(event);
        this.setState({
            selectedValue: value,
            open: false,
        }, () => {
            if (shouldSumbitOnSelect) {
                $(target).closest("form").submit();
            }
        });
    }

    onToggle = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const {
          selectedValue,
          open,
        } = this.state;
        const {
          label,
          labelFormatter,
          children,
          name,
          id,
          ...rest
        } = this.props;

        return (
            <MinimalDropdown
                onToggle={this.onToggle}
                label={label || labelFormatter(selectedValue)}
                id={`${id}-dropdown`}
                open={open}
                {...omit(rest, ['shouldSumbitOnSelect'])}
            >
                <input
                    type="hidden"
                    id={id}
                    name={name}
                    value={selectedValue}
                />
                {children.map(child => {
                    return child(this);
                })}
            </MinimalDropdown>
        );
    }
}

MinimalSelect.propTypes = {
    labelFormatter: func,
    shouldSumbitOnSelect: bool,
    noToggleBorder: bool,
    label: string,
    onChange: func,
    defaultValue: oneOfType([number, string]),
    children: arrayOf(func),
};

MinimalSelect.defaultProps = {
    label: "",
    labelFormatter: x => x,
    shouldSumbitOnSelect: false,
    noToggleBorder: false,
    children: [],
    onChange: () => {},
    defaultValue: "",
};

export default MinimalSelect;
