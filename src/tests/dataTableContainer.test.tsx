import React from 'react';
import { render, screen, fireEvent,waitFor,act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DataTableContainer from '../containers/dataTableContainer';
import { rows } from '../data/data';
// import { act } from 'react';



const mockHandleChange = jest.fn();

  it('renders the table with initial data',  () =>  {

      render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
        // Check if the table renders 5 rows in initial render (excluding header)
        expect(screen.getAllByRole('row')).toHaveLength(6); // 6 data rows + 1 header row
    
      });

  it('filters data based on search term',  () => {
    render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
    const searchInput = screen.getByLabelText(/search/i);
    userEvent.type(searchInput, 'Nurse');
    expect(screen.getByText('Frank')).toBeInTheDocument();
    expect(screen.getByText('Paul')).toBeInTheDocument();
    expect(screen.getByText('Xander')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4); // 1 data row + 1 header row
    

  });

it('test pagination', () => {

  render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
  //we should have 5 row in table in first page at initial render
  
  expect(screen.getAllByRole('row')).toHaveLength(6); // 6 data rows + 1 header row

  for (let i = 0; i < 5; i++) {
      expect(screen.getByText(rows[i].name)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    for (let i = 5; i < 10; i++) {
      expect(screen.getByText(rows[i].name)).toBeInTheDocument();
    }

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    fireEvent.mouseDown(selectElement);

    fireEvent.click(screen.getByRole('option', { name: '10' }));

    for (let i = 10; i < 20; i++) {
      expect(screen.getByText(rows[i].name)).toBeInTheDocument();
    }

});

it('test page size', () => {
  render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    fireEvent.mouseDown(selectElement);

    fireEvent.click(screen.getByRole('option', { name: '10' }));

    for (let i = 0; i < 10; i++) {
      expect(screen.getByText(rows[i].name)).toBeInTheDocument();
    }

});

  it('sorts by name when the name header is clicked', () => {
    render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Alice');
    expect(rows[2]).toHaveTextContent('Bob');
    expect(rows[3]).toHaveTextContent('Charlie');
    expect(rows[4]).toHaveTextContent('David');
    expect(rows[5]).toHaveTextContent('Eve');
  });

  it('sorts by age when the age header is clicked', () => {
    render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob');
    expect(rows[2]).toHaveTextContent('Eve');
    expect(rows[3]).toHaveTextContent('Alice');
    expect(rows[4]).toHaveTextContent('Charlie');
    expect(rows[5]).toHaveTextContent('David');
  });

  it('sorts by occupation when the occupation header is clicked', () => {
    render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
    const ageHeader = screen.getByText('Occupation');
    fireEvent.click(ageHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Eve');
    expect(rows[2]).toHaveTextContent('Bob');
    expect(rows[3]).toHaveTextContent('David');
    expect(rows[4]).toHaveTextContent('Alice');
    expect(rows[5]).toHaveTextContent('Charlie');
  });

it('renders icon dropdown menu with checkboxes for toggle column', () => {

  render(<DataTableContainer isDarkMode={false} handleChange={mockHandleChange} ></DataTableContainer>);
  const iconButton = screen.getByRole('button', { name: /toggle column/i });
  expect(iconButton).toBeInTheDocument();

});


