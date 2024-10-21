import { Link } from 'react-router-dom'


export default function Homepage(){
    return(
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Code</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto"  >

            <li class="nav-item"><Link to="/register" class="nav-link" >Register</Link></li>
            <li><Link to="/login" class="nav-link" >Login</Link></li>
          
        </ul>
    
        </div>
    </nav>
    )
}