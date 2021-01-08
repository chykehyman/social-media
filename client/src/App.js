import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './utils/AuthRoute';
import { AuthProvider } from './utils/context/auth';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
