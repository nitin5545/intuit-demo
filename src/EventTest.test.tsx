import { render, fireEvent } from '@testing-library/react';
import Event from './components/Event';
import {EventData} from './interface/types';

const mockEventData: EventData = {
  event_category: 'Meeting',
  event_name: 'Team Discussion',
  start_time: '2024-04-02T10:00:00',
  end_time: '2024-04-02T11:00:00',
  isSelectable: true,
  isSelected: false,
  id: 1,
};

test('renders a selectable event ', () => {
  const {getByTestId } = render(<Event eventData={mockEventData} onClick={jest.fn()} />);

  // Check event Container class
  const eventContainer = getByTestId('event-container');
  expect(eventContainer).toHaveClass('enabled-event');
  expect(eventContainer).toHaveClass('event-container');

  // Check event details and data-testid
  expect(getByTestId('event-category')).toHaveTextContent('M');
  expect(getByTestId('event-name')).toHaveTextContent('Team Discussion');
  expect(getByTestId('category-name')).toHaveTextContent('Meeting');
  expect(getByTestId('timing')).toHaveTextContent('10:00 AM - 11:00 AM');
  
  const selectButton = getByTestId("select-button")
  expect(selectButton).toHaveClass("selectable-button")
  expect(selectButton).toBeEnabled()
});

test('renders Selected event', () => {
  const selectedEventData = { ...mockEventData, isSelected: true };
  const { getByTestId } = render(<Event eventData={selectedEventData} onClick={jest.fn()} />);
  const eventContainer = getByTestId('event-container');
  expect(eventContainer).toHaveClass('enabled-event');
  expect(eventContainer).toHaveClass('event-container');

  // Check event details and data-testid
  expect(getByTestId('event-category')).toHaveTextContent('M');
  expect(getByTestId('event-name')).toHaveTextContent('Team Discussion');
  expect(getByTestId('category-name')).toHaveTextContent('Meeting');
  expect(getByTestId('timing')).toHaveTextContent('10:00 AM - 11:00 AM');
  
  const selectButton = getByTestId("select-button")
  expect(selectButton).toHaveClass("selected-button")
  expect(selectButton).toHaveTextContent("Remove")
  expect(selectButton).toBeEnabled()
});

test('render a non selectable event', () => {
  const nonSelectableEventData = { ...mockEventData, isSelectable: false };
  const { getByTestId } = render(<Event eventData={nonSelectableEventData} onClick={jest.fn()} />);
  const eventContainer = getByTestId('event-container');
  expect(eventContainer).toHaveClass('disabled-event');
  expect(eventContainer).toHaveClass('event-container');

  // Check event details and data-testid
  expect(getByTestId('event-category')).toHaveTextContent('M');
  expect(getByTestId('event-name')).toHaveTextContent('Team Discussion');
  expect(getByTestId('category-name')).toHaveTextContent('Meeting');
  expect(getByTestId('timing')).toHaveTextContent('10:00 AM - 11:00 AM');

  const button = getByTestId('select-button');
  expect(button).toBeDisabled();
});

test('Event component calls onClick function on button click', () => {
  const mockedClick = jest.fn()
  const { getByTestId } = render(<Event eventData={mockEventData} onClick={mockedClick} />);

  const button = getByTestId('select-button');
  fireEvent.click(button);

  expect(mockedClick).toHaveBeenCalledTimes(1);
  expect(mockedClick).toHaveBeenCalledWith(mockEventData.id);
});
