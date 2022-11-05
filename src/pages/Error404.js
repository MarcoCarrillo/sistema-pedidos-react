import React from 'react';
import './Error404.css';

export function Error404() {
  return (
    <body className='e404'>
    <section className="notFound error404">
        <div className="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div className="text404">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <a href="https://sistema-pedidos-tiburoneros.netlify.app/" class="yes">YES</a>
        <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
        </div>
    </section>
</body>
  )
}
