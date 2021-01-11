import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import AuthRoute from './utils/AuthRoute';
import { AuthProvider } from './utils/context/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          likes: {
            merge(_, incoming) {
              return incoming;
            },
          },
          comments: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Query: {
        fields: {
          getPosts: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path="/" component={Home} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <Route path="/posts/:postId" component={PostDetails} />
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
