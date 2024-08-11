import React, { useEffect, useState } from 'react';  
import { fetchArticles } from '../hooks/ArticlesCon.jsx'; // Asegúrate de que la ruta sea correcta  

export const Articles = () => {  
  const [articles, setArticles] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [page, setPage] = useState(1);  
  
  useEffect(() => {  
    const loadArticles = async () => {  
      try {  
        const result = await fetchArticles(page);  
        setArticles(result.articles);  
        setLoading(false);  
      } catch (err) {  
        setError(err.message);  
        setLoading(false);  
      }  
    };  

    loadArticles();  
  }, [page]);  

  if (loading) {  
    return <div>Loading...</div>;  
  }  

  if (error) {  
    return <div>Error: {error}</div>;  
  }  

  return (  
    <div className="container mt-5">  
      <h1>Artículos</h1>  
      <div className="row">  
        {articles.map((article) => (  
          <div className="col-md-4 mb-4" key={article.id}>  
            <div className="card">  
              <img src={article.content?.image} className="card-img-top" alt={article.title} />  
              <div className="card-body">  
                <h5 className="card-title">{article.title}</h5>  
                <p className="card-text">{article.abstract}</p>  
                <p className="card-text"><small className="text-muted">Categoría: {article.categories.join(', ')}</small></p>  
                <p className="card-text"><small className="text-muted">Etiquetas: {article.tags.join(', ')}</small></p>  
                <p className="card-text"><small className="text-muted">Vistas: {article.view_count}</small></p>  
                <p className="card-text"><small className="text-muted">Creado el: {new Date(article.created_at).toLocaleDateString()}</small></p>  
                <a href="#" className="btn btn-primary">Leer más</a>  
              </div>  
            </div>  
          </div>  
        ))}  
      </div>  
      <div className="d-flex justify-content-between">  
        {page > 1 && (  
          <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>Página Anterior</button>  
        )}  
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Siguiente Página</button>  
      </div>  
    </div>  
  );  
};  
