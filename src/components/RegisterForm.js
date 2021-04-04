import React from 'react'

const RegisterForm = ({handleSubmit, name, setName, email, setEmail, password, setPassword}) => {
    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Tu Nombre</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Ingresar Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Correo Electronico</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Ingresar Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
            </div>

            <button disabled={!name || !email || !password} type="submit" className="btn btn-primary">Registrar</button>
        </form>
    )
}

export default RegisterForm
