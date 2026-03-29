import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    // Verifique se o IP está igual ao que aparece no seu terminal do Laravel
    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => setProjetos(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar com Emoji (Não quebra nunca!) */}
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-5">
        <div className="container">
          <span className="navbar-brand d-flex align-items-center fw-bold">
            🚀 DevPulse <span className="badge bg-primary ms-2" style={{fontSize: '0.6rem'}}>v1.0</span>
          </span>
          <span className="text-secondary small">React + Laravel + MySQL</span>
        </div>
      </nav>

      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Meus Projetos</h2>
          <p className="text-muted">Repositórios buscados dinamicamente via API</p>
        </div>
        
        <div className="row g-4">
          {projetos.map(p => (
            <div className="col-md-4 col-sm-6" key={p.id}>
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold text-dark mb-0">{p.nome}</h5>
                    <span style={{fontSize: '1.2rem'}}>📂</span>
                  </div>
                  
                  <p className="card-text text-muted flex-grow-1" style={{fontSize: '0.9rem'}}>
                    {p.descricao || "Projeto vindo do banco de dados MySQL via API."}
                  </p>
                  
                  <div className="mt-3 pt-3 border-top">
                    <a href={p.url_github} 
                       className="btn btn-primary w-100" 
                       target="_blank" 
                       rel="noreferrer">
                      Ver no GitHub 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center py-5 mt-5 text-muted border-top bg-white">
        <p>© 2026 Guilherme Fernandes | ADS UNP</p>
      </footer>
    </div>
  )
}

export default App