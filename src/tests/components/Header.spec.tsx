import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';


describe('Header component', () => {
    it('should renders correctly', () => {
        render(
            <Header />
        )
        expect(screen.getByText('What\'s in')).toBeInTheDocument();
        expect(screen.getByTestId('header-play-icon')).toBeInTheDocument();
    })

})
