import React from 'react';
import Footer from './Footer';
import Header from './Header';
import AsideMenu from './AsideMenu';
import CardView from '../components/CardView/CardView';
import TreeView from '../components/TreeView/TreeView';
import { DataContext } from '../App';
import { useContext } from 'react';

function Layout() {
	const { changeToTreeView } = useContext(DataContext);
	return (
		<>
			<Header />
			<AsideMenu />
			{changeToTreeView ? <TreeView /> : <CardView />}
			<Footer />
		</>
	);
}

export default Layout;
