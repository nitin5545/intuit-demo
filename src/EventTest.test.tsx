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

test('Event component renders event details with proper classes (selectable)', () => {
  const { getByText, getByTestId } = render(<Event eventData={mockEventData} onClick={jest.fn()} />);

  // Check event Container class
  const eventContainer = getByTestId('event-Container');
  expect(eventContainer).toHaveClass('enabled-event');
  expect(eventContainer).toHaveClass('event-Container');

  // Check event details and data-testid
  expect(getByTestId('event-category')).toHaveTextContent('M');
  expect(getByTestId('event-name')).toHaveTextContent('Team Discussion');
  expect(getByTestId('category-name')).toHaveTextContent('(Meeting)');
  expect(getByTestId('timing')).toHaveTextContent('10:00 AM - 11:00 AM');
});

test('Event component renders button with "Select" text and proper classes (selectable)', () => {
  const { getByText, getByTestId } = render(<Event eventData={mockEventData} onClick={jest.fn()} />);

  const button = getByTestId('select-button');
  expect(button).toHaveTextContent('Select');
  expect(button).toHaveClass('selectable-button');
  expect(button).toHaveClass('button');
  expect(button).not.toBeDisabled();
});

test('Event component renders "Remove" button for selected events', () => {
  const selectedEventData = { ...mockEventData, isSelected: true };
  const { getByText, getByTestId } = render(<Event eventData={selectedEventData} onClick={jest.fn()} />);

  const button = getByTestId('select-button');
  expect(button).toHaveTextContent('Remove');
  expect(button).toHaveClass('selected-button');
  expect(button).toHaveClass('button');
});

test('Event component disables button for non-selectable events', () => {
  const nonSelectableEventData = { ...mockEventData, isSelectable: false };
  const { getByTestId } = render(<Event eventData={nonSelectableEventData} onClick={jest.fn()} />);

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
