import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBarItem from '.';
import theme from '../../../Theme/theme';
import HomeIcon from '../../../../public/assets/icons/home.svg';

const mockHandleClick = jest.fn();

describe('NavBarItem component unit test', () => {
  it('render for NavBarItem', () => {
    render(
      <NavBarItem
        iconSrc={HomeIcon}
        label={'Home'}
        isNavBarItemSelected={false}
        handleClick={mockHandleClick}
      />,
    );

    const NavBarItemElement = screen.getByTestId('navbar-item');
    expect(NavBarItemElement).toBeInTheDocument();
    expect(NavBarItemElement).toHaveTextContent('Home');
    fireEvent.click(NavBarItemElement);
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('render for Highlighted NavBarItem', () => {
    render(
      <NavBarItem
        iconSrc={HomeIcon}
        label={'Home'}
        isNavBarItemSelected={true}
        handleClick={mockHandleClick}
      />,
    );

    const NavBarItemElement = screen.getByTestId('navbar-item');
    expect(NavBarItemElement).toBeInTheDocument();
    expect(NavBarItemElement).toHaveTextContent('Home');
    expect(NavBarItemElement).toHaveStyle(
      `backgroundColor: ${theme.palette.primary300.light}`,
    );
    expect(screen.getByText('Home')).toHaveStyle(
      `color: ${theme.palette.primary500.main}`,
    );
    fireEvent.click(NavBarItemElement);
    expect(mockHandleClick).toBeCalledTimes(1);
  });
});
