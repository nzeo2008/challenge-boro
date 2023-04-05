import React from 'react';
import Footer from './Footer';
import Header from './Header';
import CardView from '../components/CardView/CardView';
import TreeView from '../components/TreeView/TreeView';
import { DataContext } from '../App';
import { useContext } from 'react';

function Layout() {
	const { changeToTreeView } = useContext(DataContext);
	return (
		<>
			<Header />
			{changeToTreeView ? <TreeView /> : <CardView />}
			<Footer />
		</>
	);
}

export default Layout;
