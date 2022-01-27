import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Moderator = () => {
  return <div>
    <section>
      <div className="grid">
        <Link to="exercises" role="button" className="outline">Ćwiczenia</Link>
        <Link to="categories" role="button" className="outline">Kategorie</Link>
        <Link to="muscles" role="button" className="outline">Mięśnie</Link>
        <Link to="equipment" role="button" className="outline">Sprzęt</Link>
      </div>
    </section>
    <section>
      <Outlet />
    </section>
  </div>;
};

export default Moderator;
