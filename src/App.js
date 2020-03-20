import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'
import { Container, Menu, Grid, Icon } from 'semantic-ui-react'

import MyProvider from './context/MyProvider';

import Product from './pages/Product';
import Products from './pages/Products';

import 'semantic-ui-css/semantic.min.css'

function App(props) {
	return (
		<MyProvider>
				<Router>
					<Grid columns={1}>
						<Grid.Column>
						<Menu pointing secondary color='blue' inverted>
								<Menu.Item name='home'>
									<Link to='/'>
										<Icon name='home'/>
										Home
									</Link>
								</Menu.Item>
							</Menu>
						</Grid.Column>
					</Grid>
					<Container>
						<Switch>
							<Route path="/products/:id">
								<Product />
							</Route>
							<Route path="/">
								<Products />
							</Route>
						</Switch>
					</Container>
				</Router>
		</MyProvider>
	);
}

export default App;
