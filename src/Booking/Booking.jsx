import React, { useState, useEffect } from 'react';
import './Booking.css';

const Booking = () => {
  const [movie, setMovie] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movies] = useState([
    { name: 'Avenger Endgame', price: 200 },
    { name: 'Toy Story 4', price: 150 },
    { name: 'Joker', price: 250 },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [movieBookings, setMovieBookings] = useState(new Map());

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.name === movie);
    const newTotalPrice = selectedSeats.length * selectedMovie?.price;
    setTotalPrice(newTotalPrice || 0);
  }, [selectedSeats, movie, movies]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}-${col}`;
    const isBooked = movieBookings.get(movie)?.includes(seatId);

    if (!isBooked) {
      const isSelected = selectedSeats.includes(seatId);

      if (isSelected) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    if (selectedSeats.length > 0 && movie) {
      const selectedMovie = movies.find((m) => m.name === movie);
      const currentBookings = movieBookings.get(movie) || [];
      setMovieBookings((prevMovieBookings) => {
        const newMovieBookings = new Map(prevMovieBookings);
        newMovieBookings.set(movie, [...currentBookings, ...selectedSeats]);
        return newMovieBookings;
      });

      setSelectedSeats([]);
    }else {
      alert('Please select a movie before booking.');
    }

  };

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  };

  const smallSquares = [];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const key = `square-${row}-${col}`;
      const isSelected = selectedSeats.includes(`${row}-${col}`);
      const isBooked = movieBookings.get(movie)?.includes(`${row}-${col}`);

      const seatClassName = isBooked
        ? 'booked-seat'
        : isSelected
        ? 'selected-seat'
        : 'seat';

      smallSquares.push(
        <div
          key={key}
          className={`square ${seatClassName}`}
          onClick={() => handleSeatClick(row, col)}
        ></div>
      );
    }
  }

  return (
    <div className='container'>
      <form>
        <div className='child1'>
        <label htmlFor='SELECT A MOVIE' className='text'>
          SELECT A MOVIE:
        </label>
        <select
          className='slc'
          id='select'
          value={movie}
          onChange={handleMovieChange}
        >
           {movie === '' && (
            <option value='' disabled>
              Please select a movie
            </option>
          )}
          {movies.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name} ({m.price})
            </option>
          ))}
          
        </select>
        </div>
        <div className='model2'>
          <div className='box'>
            <div className='square'></div>
            <span className='text1'>N/A</span>
          </div>
          <div className='box'>
            <div className='square1'></div>
            <span className='text1'>Selected</span>
          </div>
          <div className='box'>
            <div className='square2'></div>
            <span className='text1'>Occupied</span>
          </div>
        </div>
        <div className='small-container'>{smallSquares}</div>
        <div className='para'>
          <p>
            You have selected {selectedSeats.length} seats for the price of {totalPrice}
          </p>
        </div>
        <button type='button'  className="btn1" onClick={handleBookClick}>
          Book
        </button>
      </form>
    </div>
  );
};

export default Booking;
