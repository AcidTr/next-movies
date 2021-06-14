import { render, screen } from '@testing-library/react';

import Movie from './[id]';


jest.mock('../../hooks/useFavorites', () => ({
    useFavorite: () => {
        return { favoriteMovies: ['337404'], setFavorites: jest.fn() }
    }
}))

describe('Movie details page', () => {
    it('should renders correctly', () => {
        const movie = {
            id: '337404',
            genres: [
                {
                    id: 35,
                    name: "Comédia"
                }
                ,

                {
                    id: 80,
                    name: "Crime"
                }],
            title: 'Cruella',
            posterPath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ljPHd7WiPVKmuXi1hgQUpZQslbC.jpg",
            releaseDate: "2021",
            backdropPath: "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
            overview: "Na Londres dos anos 70 em meio à revolução do punk rock, Estella, uma garota inteligente e criativa determinada a fazer um nome para si através de seus designs. Ela faz amizade com uma dupla de jovens ladrões e, juntos, constroem uma vida para si nas ruas de Londres. Um dia, o talento de Estella para a moda chama a atenção da Baronesa Von Hellman, uma lenda fashion que é devastadoramente chique e assustadora. Mas o relacionamento delas desencadeia um curso de eventos e revelações que farão com que Estella abrace seu lado rebelde e se torne a Cruella má, elegante e voltada para a vingança.",
            runtime: 134,
            tagline: "Olá, mundo cruel.",
            cast: [{
                character: "Estella / Cruella",
                name: "Emma Stone"
            }, {
                character: "The Baroness",
                name: "Emma Thompson"
            }],
            director: "Craig Gillespie",
        }

        render(
            <Movie movie={movie} />
        )
        expect(screen.getByText('Cruella')).toBeInTheDocument();
        expect(screen.getByText('134 min')).toBeInTheDocument();
        expect(screen.getByText('• 2021')).toBeInTheDocument();

    })

    it('should render filled heart in favorite button ', () => {
        const movie = {
            id: '337404',
            genres: [
                {
                    id: 35,
                    name: "Comédia"
                }
                ,

                {
                    id: 80,
                    name: "Crime"
                }],
            title: 'Cruella',
            posterPath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ljPHd7WiPVKmuXi1hgQUpZQslbC.jpg",
            releaseDate: "2021",
            backdropPath: "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
            overview: "Na Londres dos anos 70 em meio à revolução do punk rock, Estella, uma garota inteligente e criativa determinada a fazer um nome para si através de seus designs. Ela faz amizade com uma dupla de jovens ladrões e, juntos, constroem uma vida para si nas ruas de Londres. Um dia, o talento de Estella para a moda chama a atenção da Baronesa Von Hellman, uma lenda fashion que é devastadoramente chique e assustadora. Mas o relacionamento delas desencadeia um curso de eventos e revelações que farão com que Estella abrace seu lado rebelde e se torne a Cruella má, elegante e voltada para a vingança.",
            runtime: 134,
            tagline: "Olá, mundo cruel.",
            cast: [{
                character: "Estella / Cruella",
                name: "Emma Stone"
            }, {
                character: "The Baroness",
                name: "Emma Thompson"
            }],
            director: "Craig Gillespie",
        }

        render(
            <Movie movie={movie} />
        )

        expect(screen.getByTestId('filled-heart-id')).toBeVisible();
    })

    it('should render outline heart in favorite button ', () => {

        const movie = {
            id: '337405',
            genres: [
                {
                    id: 35,
                    name: "Comédia"
                }
                ,

                {
                    id: 80,
                    name: "Crime"
                }],
            title: 'Cruella',
            posterPath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ljPHd7WiPVKmuXi1hgQUpZQslbC.jpg",
            releaseDate: "2021",
            backdropPath: "https://www.themoviedb.org/t/p/w1280_and_h720_multi_faces/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
            overview: "Na Londres dos anos 70 em meio à revolução do punk rock, Estella, uma garota inteligente e criativa determinada a fazer um nome para si através de seus designs. Ela faz amizade com uma dupla de jovens ladrões e, juntos, constroem uma vida para si nas ruas de Londres. Um dia, o talento de Estella para a moda chama a atenção da Baronesa Von Hellman, uma lenda fashion que é devastadoramente chique e assustadora. Mas o relacionamento delas desencadeia um curso de eventos e revelações que farão com que Estella abrace seu lado rebelde e se torne a Cruella má, elegante e voltada para a vingança.",
            runtime: 134,
            tagline: "Olá, mundo cruel.",
            cast: [{
                character: "Estella / Cruella",
                name: "Emma Stone"
            }, {
                character: "The Baroness",
                name: "Emma Thompson"
            }],
            director: "Craig Gillespie",
        }

        render(
            <Movie movie={movie} />
        )

        expect(screen.getByTestId('outline-heart-id')).toBeVisible();
    })

})
