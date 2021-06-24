import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props) {
    const [highlighted, setHighlighted] = useState(-1)

    let mov = props.movie

    const highlightRate = high => evt => {
        setHighlighted(high)
    }
    const rateClicked = rate => evt => {
        const RATE_URL = `http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`
        const FETCH_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c0b0b6b206e6978566cacde8a845eae33416548a'
            },
            body: JSON.stringify({ stars: rate + 1 })
        }
        fetch(RATE_URL, FETCH_OPTIONS)
            .then(() => getDetails())
            .catch(error => console.log(error))
    }

    const getDetails = () => {
        const RATE_URL = `http://127.0.0.1:8000/api/movies/${mov.id}/`
        const FETCH_OPTIONS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c0b0b6b206e6978566cacde8a845eae33416548a'
            },
        }
        fetch(RATE_URL, FETCH_OPTIONS)
            .then(resp => resp.json())
            .then(resp => props.updateMovie(resp))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {mov
                ? (
                    <div>
                        <h1>{mov.title}</h1>
                        <p>{mov.description}</p>
                        <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 0 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 1 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 2 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 3 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 4 ? 'orange' : ''} />
                        ({mov.no_of_ratings})
                        <div className="rate-container">
                            <h2>Rate it</h2>
                            {
                                [...Array(5)].map((e, i) => {
                                    return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1 ? 'purple' : ''}
                                        onMouseEnter={highlightRate(i)}
                                        onMouseLeave={highlightRate(-1)}
                                        onClick={rateClicked(i)}
                                    />
                                })
                            }
                        </div>
                    </div>
                ) : null
            }
        </React.Fragment>
    )
}

export default MovieDetails
